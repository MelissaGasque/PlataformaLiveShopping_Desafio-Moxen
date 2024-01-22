import { Request, Response } from "express"
import { createProductService, deleteProductService, readProductService } from "../services/product.serveces"
// import { Live } from "../entities/live.entity"

export const createProductController = async(req: Request, res: Response): Promise<Response> => {
    const liveId = req.params.liveId
    console.log(liveId)
    console.log(req.params)
    const createLive = await createProductService(req.body, liveId)
    return res.status(201).json(createLive)
}
export const readProductController = async(req: Request, res: Response): Promise<Response> => {
    const lives = await readProductService()
    return res.status(200).json(lives)
}
// export const updateProductController  = async (req: Request, res: Response): Promise<Response> => {
//     const productId: string = req.params.id
//     const updateUser = req.body
//     const update = await updateProductService(updateUser, productId)
//     return res.status(200).json(update)
// }
export const deleteProductController = async (req: Request, res: Response): Promise<Response> => {
    const liveId: string = req.params.id
    await deleteProductService(liveId)
    return res.status(204).json()
}