import { z } from "zod"
import { liveIdSchema, liveSchema } from "./live.schema"

export const productSchema = z.object({
    id: z.string().uuid(),
    nome: z.string().min(1),
    imagemURL: z.string().min(1),
    quantidade: z.string().min(1),
    live: liveSchema
})

export const createProductSchema = productSchema.omit({ id: true })
// export const readProductSchema = productSchema.array()
export const updateProductSchema = createProductSchema.partial()
// export const productSchemaLive = z.object({
//     id: z.string().uuid(),
//     nome: z.string().min(1),
//     imagemURL: z.string().min(1),
//     quantidade: z.string(),
//     live: liveIdSchema
// })