import { Request, Response } from "express"
import { createUserService, deleteUserService, updateClientService } from "../services/user.services"
import { UserReturnInterface } from "../interfaces/user.interface"

export const createUserController = async (req: Request, res: Response): Promise<Response> => {
    const user: UserReturnInterface = await createUserService(req.body)
    return res.status(201).json(user)
}

export const updateUserController  = async (req: Request, res: Response): Promise<Response> => {
    const userId: string = req.params.id
    const updateUser = req.body
    const update = await updateClientService(updateUser, userId)
    return res.status(200).json(update)
}
export const deleteUserController = async (req: Request, res: Response): Promise<Response> => {
    const userId: string = req.params.id
    await deleteUserService(userId)
    return res.status(204).json()
}