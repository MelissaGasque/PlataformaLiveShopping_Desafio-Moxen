import { Request, Response } from "express"
import { createLiveService, deleteLiveService, readLiveService, updateLiveService} from "../services/live.services"
import { User } from "../entities/users.entity"

export const createLiveController = async(req: Request, res: Response): Promise<Response> => {
    const user: User = res.locals.decoded.sub
    const createLive = await createLiveService(req.body, user)
    return res.status(201).json(createLive)
}
export const readLiveController = async(req: Request, res: Response): Promise<Response> => {
    const lives = await readLiveService()
    return res.status(200).json(lives)
}
export const updateLiveController  = async (req: Request, res: Response): Promise<Response> => {
    const liveId: string = req.params.id
    const updateUser = req.body
    const update = await updateLiveService(updateUser, liveId)
    return res.status(200).json(update)
}
export const deleteLiveController = async (req: Request, res: Response): Promise<Response> => {
    const liveId: string = req.params.id
    await deleteLiveService(liveId)
    return res.status(204).json()
}