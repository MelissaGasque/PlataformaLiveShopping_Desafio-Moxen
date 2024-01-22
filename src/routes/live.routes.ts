import { updateLiveController } from './../controllers/live.controllers';
import { Router } from "express"
import { createLiveController, deleteLiveController, readLiveController } from "../controllers/live.controllers"
import { verifyToken, isOwner } from "../middlewares/index.middleware"



export const liveRouter = Router()

liveRouter.post("", verifyToken, createLiveController)
liveRouter.get("", verifyToken, readLiveController)
liveRouter.patch("/:id", verifyToken, isOwner, updateLiveController)
liveRouter.delete("/:id", verifyToken, isOwner, deleteLiveController)