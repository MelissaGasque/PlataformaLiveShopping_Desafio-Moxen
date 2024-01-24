import { z } from "zod"
import { DeepPartial } from "typeorm"
import { createProductSchema, productSchema, readProductSchema} from "../schema/product.schema"
import { Product } from "../entities/products.entity"

type ProductInterface = z.infer<typeof productSchema>
type ProductReadInterface = z.infer<typeof readProductSchema>
type ProductCreateInterface = z.infer<typeof createProductSchema>
type ProductUpdateInterface = DeepPartial<Product>

export { ProductInterface, ProductCreateInterface, ProductUpdateInterface,  ProductReadInterface}