import { Router } from "express"
import { createProductController, deleteProductController, readProductController, updateProductController } from "../controllers/product.controller"


export const productRouter = Router()

productRouter.post("", createProductController)
productRouter.get("", readProductController)
productRouter.patch("/:id", updateProductController)
productRouter.delete("/:id", deleteProductController)