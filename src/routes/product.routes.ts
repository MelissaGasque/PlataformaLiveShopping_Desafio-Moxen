import { Router } from "express"
import { createProductController, deleteProductController, readProductController, readProdutsOnLiveController, updateProductController } from "../controllers/product.controller"


export const productRouter = Router()

productRouter.post("/:liveId", createProductController)
productRouter.get("/:liveId/live", readProductController)
productRouter.get("/:liveId", readProdutsOnLiveController)
productRouter.patch("/:id", updateProductController)
productRouter.delete("/:id", deleteProductController)