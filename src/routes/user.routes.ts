import { Router } from "express"
import { createUserController, deleteUserController, updateUserController } from "../controllers/user.controller"
import { bodyValidated, checkUserId, emailExists, verifyToken } from "../middlewares/index.middleware"
import { createUserSchema } from "../schema/user.schema"

export const userRouter = Router()

userRouter.post("", bodyValidated(createUserSchema), emailExists, createUserController)
userRouter.patch("/:id", checkUserId, updateUserController)
userRouter.delete("/:id",  verifyToken, deleteUserController)