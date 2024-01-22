import { DeepPartial, Repository } from "typeorm"
import { LiveCreateInterface, LiveInterface, LiveUpdateInterface } from "../interfaces/live.interface"
import { Live } from "../entities/live.entity"
import { AppDataSource } from "../data-source"
import { liveSchema } from "../schema/live.schema"
import { AppError } from "../errors/app.errors"
import { User } from "../entities/users.entity"

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
// //Apenas quem criou pode alterar
// export const updateLiveService = async (payload: DeepPartial<LiveUpdateInterface>, liveId: string): Promise<LiveUpdateInterface> => {
//     const liveRepo: Repository<Live> = AppDataSource.getRepository(Live)
//     const live = await liveRepo.findOneBy({ id: liveId })
//     const updateLive = await liveRepo.save({  ...live, ...payload })

//     return liveSchema.parse(updateLive)
// }

export const deleteLiveService = async (liveId: string): Promise<void> => {
    const liveRepo: Repository<Live> = AppDataSource.getRepository(Live)
    const deleteLive = await liveRepo.findOneBy({ id: liveId })

    if (!deleteLive) {
        throw new AppError("Live não encontrada", 404)
    }

    await liveRepo.remove(deleteLive)
}