import { Router } from "express"
import { createProductController, deleteProductController, readProductController, readProdutsOnLiveController, updateProductController } from "../controllers/product.controller"
import { verifyToken } from "../middlewares/verifyToken.middleware"
import { isOwner } from "../middlewares/isTheOwner.middleware"


export const productRouter = Router()

productRouter.post("/:liveId",  verifyToken, createProductController)
productRouter.get("/:liveId/live", readProductController)
productRouter.get("/:liveId", readProdutsOnLiveController)
productRouter.patch("/:id", verifyToken, isOwner,updateProductController)
productRouter.delete("/:id",verifyToken, deleteProductController)