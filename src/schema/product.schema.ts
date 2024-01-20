import { z } from "zod"

export const productSchema = z.object({
    id: z.string().uuid(),
    nome: z.string().min(1),
    imagemURL: z.string().min(1),
    quantidade: z.number().min(1)
})

export const createProductSchema = productSchema.omit({ id: true })
// export const readProductSchema = productSchema.array()
export const updateProductSchema = createProductSchema.partial()