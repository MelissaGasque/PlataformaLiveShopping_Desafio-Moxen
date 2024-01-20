import { Request, Response } from "express"
import { createProductService, deleteProductService, readProductService, updateProductService } from "../services/product.serveces"

export const createProductController = async(req: Request, res: Response): Promise<Response> => {
    const createLive = await createProductService(req.body)
    return res.status(201).json(createLive)
}
export const readProductController = async(req: Request, res: Response): Promise<Response> => {
    const lives = await readProductService()
    return res.status(200).json(lives)
}
export const updateProductController  = async (req: Request, res: Response): Promise<Response> => {
    const liveId: string = req.params.id
    const updateUser = req.body
    const update = await updateProductService(updateUser, liveId)
    return res.status(200).json(update)
}
export const deleteProductController = async (req: Request, res: Response): Promise<Response> => {
    const liveId: string = req.params.id
    await deleteProductService(liveId)
    return res.status(204).json()
}