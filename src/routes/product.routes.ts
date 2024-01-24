import { Router } from "express"
import { createProductController, deleteProductController, readProductController, readProdutsOnLiveController } from "../controllers/product.controller"


export const productRouter = Router()

productRouter.post("/:liveId", createProductController)
productRouter.get("/:liveId/list", readProductController)
productRouter.get("/:liveId", readProdutsOnLiveController)
// productRouter.patch("/:id", updateProductController)
productRouter.delete("/:id", deleteProductController)