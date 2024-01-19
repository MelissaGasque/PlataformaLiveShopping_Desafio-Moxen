import { Router } from "express"
import { createUserController, deleteUserController, updateUserController } from "../controllers/user.controller"

export const userRouter = Router()

userRouter.post("", createUserController)
userRouter.patch("/:id", updateUserController)
userRouter.delete("/:id", deleteUserController)