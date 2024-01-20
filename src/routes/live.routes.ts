import { Router } from "express"
import { createLiveController, deleteLiveController, readLiveController, updateLiveController } from "../controllers/live.controllers"


export const liveRouter = Router()

liveRouter.post("", createLiveController)
liveRouter.get("", readLiveController)
liveRouter.patch("/:id", updateLiveController)
liveRouter.delete("/:id", deleteLiveController)