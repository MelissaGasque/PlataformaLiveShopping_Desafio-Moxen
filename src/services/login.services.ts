import { sign } from "jsonwebtoken"
import { compare } from "bcryptjs"
import { AppDataSource } from "../data-source"
import { User } from "../entities/users.entity"
import { AppError } from "../errors/app.errors"
import { loginInterface, loginReturn } from "../interfaces/login.interface"

export const loginService = async (payload: loginInterface): Promise<loginReturn> => {
    const loginRepo = AppDataSource.getRepository(User)

    const user: User | null = await loginRepo.findOne({ where: {email: payload.email}})
    if(!user){
        throw new AppError("Credenciais inválidas", 401)
    }
    const matchPassword: boolean = await compare(payload.password.toString(), user.password);
    
    if (!matchPassword) {
        throw new AppError("Credenciais inválidas", 401);
    }

    const token: string = sign(
        { email: user.email, nome: user.name }, 
        process.env.SECRET_KEY!,
        {
            expiresIn: process.env.EXPIRES_IN!,
            subject: user.id.toString(),
        }
    );

    return { token }      
} 
