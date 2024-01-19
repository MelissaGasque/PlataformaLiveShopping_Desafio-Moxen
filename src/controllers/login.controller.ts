import { Request, Response } from "express"
import { loginService } from "../services/login.services"
import { loginReturn } from "../interfaces/login.interface"

export const loginController = async ( req:Request, res: Response ): Promise<Response> => {
    const token: loginReturn = await loginService(req.body)

    return res.status(201).json(token)
}