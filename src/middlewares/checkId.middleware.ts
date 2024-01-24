import { NextFunction, Request, Response } from "express"
import { AppDataSource } from "../data-source"
import { User } from "../entities/users.entity"
import { AppError } from "../errors/app.errors"


export const checkUserId = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
    const userId = await AppDataSource.getRepository(User).findOneBy({id: req.params.id})
    if(!userId){
        throw new AppError("Usuário não encontrado", 404)
    }

    return next()
}
