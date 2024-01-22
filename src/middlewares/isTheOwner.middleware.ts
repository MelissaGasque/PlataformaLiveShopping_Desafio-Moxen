import { NextFunction, Request, Response } from "express"
import { AppError } from "../errors/app.errors"
import { Repository } from "typeorm"
import { AppDataSource } from "../data-source"
import { Live } from "../entities/live.entity"


export const isOwner = async(req: Request, res: Response, next: NextFunction) => {
  const LiveRepo: Repository<Live> = AppDataSource.getRepository(Live)
  const { id } = req.params
  const live = await LiveRepo.findOne({ where: { id }, relations: ['user'] })

  if (live) {
    const userId = live.user.id
    const { sub } = res.locals.decoded
    if ( userId !== sub ) {
      throw new AppError("Permissão insufieciente", 403)
    }
    return next()
  } 
}