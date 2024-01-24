import { updateLiveController } from './../controllers/live.controllers';
import { Router } from "express"
import { createLiveController, deleteLiveController, readLiveController } from "../controllers/live.controllers"
import { verifyToken, isOwner, bodyValidated } from "../middlewares/index.middleware"
import { simpleLiveSchema } from '../schema/live.schema'


export const liveRouter = Router()

liveRouter.post("", bodyValidated(simpleLiveSchema), verifyToken, createLiveController)
liveRouter.get("", verifyToken, readLiveController)
liveRouter.patch("/:id", verifyToken, isOwner, updateLiveController)
liveRouter.delete("/:id", verifyToken, isOwner, deleteLiveController)