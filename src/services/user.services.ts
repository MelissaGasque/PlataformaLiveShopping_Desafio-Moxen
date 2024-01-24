import { Repository } from "typeorm"
import { AppDataSource } from "../data-source"
import { User, Live, Product } from "../entities"
import { UserCreateInterface, UserReturnInterface, UserUpdateInterface } from "../interfaces/user.interface"
import { returnUserSchema } from "../schema/user.schema"


export const createUserService = async(payload: UserCreateInterface): Promise<UserReturnInterface> => {
    const userRepo: Repository<User> = AppDataSource.getRepository(User)
    const user: UserReturnInterface = userRepo.create(payload)
    await userRepo.save(user)
    return returnUserSchema.parse(user)
}
export const updateClientService = async (payload: UserUpdateInterface, userId: string): Promise<UserReturnInterface> => {
    const userRepo: Repository<User> = AppDataSource.getRepository(User)
    const user = await userRepo.findOneBy({ id: userId })
    const updateClient = await userRepo.save({ ...user, ...payload })

    return returnUserSchema.parse(updateClient)
}

export const deleteUserService = async (userId: string): Promise<void> => {
    const userRepo: Repository<User> = AppDataSource.getRepository(User);
    const liveRepo: Repository<Live> = AppDataSource.getRepository(Live);
    const productRepo: Repository<Product> = AppDataSource.getRepository(Product);

    const liveIdsToDelete = await liveRepo
        .createQueryBuilder("live")
        .select("live.id")
        .innerJoin("live.user", "user")  
        .where("user.id = :userId", { userId })
        .getRawMany();

    if (liveIdsToDelete.length > 0) {
        const liveIds = liveIdsToDelete.map((idObj) => idObj.live_id);

        const productsToDelete = await productRepo
            .createQueryBuilder("product")
            .where("product.liveId IN (:...liveIds)", { liveIds })
            .getMany();

        if (productsToDelete.length > 0) {
            await productRepo.remove(productsToDelete);
        }

        await liveRepo
            .createQueryBuilder()
            .delete()
            .whereInIds(liveIds)
            .execute();
    }

    await userRepo
        .createQueryBuilder()
        .delete()
        .where("id = :userId", { userId })
        .execute();
}