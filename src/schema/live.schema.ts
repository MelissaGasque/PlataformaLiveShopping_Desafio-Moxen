import { z } from "zod"
import { productSchema } from "./product.schema"

export const liveSchema = z.object({
    id: z.string().uuid(),
    titulo: z.string(),
    descricao: z.string(),
    imagemURL: z.string(),
    inicioLive: z.string(),  
    fimLive: z.string(),
    // products: productSchema
})

export const createLiveSchema = liveSchema.omit({ id: true })
// export const readLiveSchema = liveSchema.array()
export const updateLiveSchema = createLiveSchema.partial()