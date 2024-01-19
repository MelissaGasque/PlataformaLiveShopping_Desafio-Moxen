import { Repository } from "typeorm"
import { AppDataSource } from "../data-source"
import { User } from "../entities/users.entity"
import { UserCreateInterface, UserReturnInterface, UserUpdateInterface } from "../interfaces/user.interface"
import { returnUserSchema } from "../schema/user.schema"
import { AppError } from "../errors/app.errors"


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
    const userRepo:  Repository<User> = AppDataSource.getRepository(User)
    const deleteUser = await userRepo.findOneBy({ id: userId })

    if (!deleteUser) {
        throw new AppError("Usuário não encontrado", 404)
    }

    await userRepo.remove(deleteUser)

}