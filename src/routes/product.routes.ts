import { Router } from "express"
import { createProductController, deleteProductController, readProductController } from "../controllers/product.controller"


export const productRouter = Router()

productRouter.post("/:liveId", createProductController)
productRouter.get("", readProductController)
// productRouter.patch("/:id", updateProductController)
productRouter.delete("/:id", deleteProductController)