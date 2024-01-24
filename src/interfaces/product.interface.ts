import { z } from "zod"
import { createProductSchema, productSchema, readProductSchema, updateProductWithoutLiveSchema} from "../schema/product.schema"


type ProductInterface = z.infer<typeof productSchema>
type ProductReadInterface = z.infer<typeof readProductSchema>
type ProductCreateInterface = z.infer<typeof createProductSchema>
type ProductUpdateInterface = z.infer<typeof updateProductWithoutLiveSchema>
export { ProductInterface, ProductCreateInterface, ProductUpdateInterface,  ProductReadInterface}