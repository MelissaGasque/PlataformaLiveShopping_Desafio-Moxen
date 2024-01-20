import { Repository } from "typeorm"
import { LiveCreateInterface, LiveInterface, LiveUpdateInterface } from "../interfaces/live.interface"
import { Live } from "../entities/live.entity"
import { AppDataSource } from "../data-source"
import { liveSchema } from "../schema/live.schema"
import { AppError } from "../errors/app.errors"

export const createLiveService = async(payload: LiveCreateInterface): Promise<LiveInterface> => {
    const liveRepo: Repository<Live> = AppDataSource.getRepository(Live)
    const live: LiveInterface = liveRepo.create(payload)
    await liveRepo.save(live)
    return live
}
export const readLiveService = async (): Promise<LiveInterface[]> => {
    const liveRepo: Repository<LiveInterface> = AppDataSource.getRepository(Live)
    return liveRepo.find()
}
//Apenas quem criou pode alterar
export const updateLiveService = async (payload: LiveUpdateInterface, liveId: string): Promise<LiveInterface> => {
    const liveRepo: Repository<Live> = AppDataSource.getRepository(Live)
    const live = await liveRepo.findOneBy({ id: liveId })
    const updateLive = await liveRepo.save({ ...live, ...payload })

    return liveSchema.parse(updateLive)
}
//Apenas quem criou pode deletar
export const deleteLiveService = async (liveId: string): Promise<void> => {
    const liveRepo: Repository<Live> = AppDataSource.getRepository(Live)
    const deleteLive = await liveRepo.findOneBy({ id: liveId })

    if (!deleteLive) {
        throw new AppError("Live não encontrada", 404)
    }

    await liveRepo.remove(deleteLive)
}