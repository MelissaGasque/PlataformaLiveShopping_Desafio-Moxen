import { Router } from "express"
import { createUserController, deleteUserController, updateUserController } from "../controllers/user.controller"
import { checkUserId, verifyToken } from "../middlewares/index.middleware"

export const userRouter = Router()

userRouter.post("", createUserController)
userRouter.patch("/:id", checkUserId, updateUserController)
userRouter.delete("/:id",  verifyToken, deleteUserController)