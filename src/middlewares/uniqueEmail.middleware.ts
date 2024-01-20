import { NextFunction, Request, Response } from "express"
import { AppDataSource } from "../data-source"
import { User } from "../entities/users.entity"
import { AppError } from "../errors/app.errors"


export const emailExists = async(req: Request, res:Response, next: NextFunction): Promise<void> => {
    const { email } = req.body
    if(email){
        const emailAlreadyExist = await AppDataSource.getRepository(User).findOneBy({ email })
    
        if(emailAlreadyExist ){
            throw new AppError("Esse email já existe", 409)
        }
        
       
    }
 
    return next()
} 