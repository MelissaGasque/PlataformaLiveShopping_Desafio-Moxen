import { DeepPartial, Repository } from "typeorm"
import { LiveCreateInterface, LiveInterface, LiveUpdateInterface } from "../interfaces/live.interface"
import { Live, User, Product } from "../entities/index"
import { AppDataSource } from "../data-source"
import { updateLiveSchema } from "../schema/live.schema"
import { AppError } from "../errors/app.errors"



export const createLiveService = async(payload: LiveCreateInterface, user: User): Promise<LiveInterface> => {
    const liveRepo: Repository<Live> = AppDataSource.getRepository(Live)
    const live: LiveInterface = liveRepo.create({...payload, user})
    await liveRepo.save(live)
    return live
}
export const readLiveService = async (): Promise<LiveInterface[]> => {
    const liveRepo: Repository<LiveInterface> = AppDataSource.getRepository(Live)
    return liveRepo.find()
}
// Apenas quem criou pode alterar
export const updateLiveService = async (payload: DeepPartial<LiveUpdateInterface[]>, liveId: string): Promise<LiveUpdateInterface> => {
    const liveRepo: Repository<Live> = AppDataSource.getRepository(Live)
    const live = await liveRepo.findOneBy({ id: liveId })
    const updateLive = await liveRepo.save({  ...live, ...payload })

    return updateLiveSchema.parse(updateLive)
}

export const deleteLiveService = async (liveId: string): Promise<void> => {
    const liveRepo: Repository<Live> = AppDataSource.getRepository(Live);
    const productRepo: Repository<Product> = AppDataSource.getRepository(Product);

    const deleteLive = await liveRepo
        .createQueryBuilder("live")
        .leftJoinAndSelect("live.products", "products")
        .where("live.id = :liveId", { liveId })
        .getOne();

    if (!deleteLive) {
        throw new AppError("Live não encontrada", 404);
    }

    if (deleteLive.products && deleteLive.products.length > 0) {
        await productRepo.remove(deleteLive.products);
    }

    await liveRepo.remove(deleteLive);
}