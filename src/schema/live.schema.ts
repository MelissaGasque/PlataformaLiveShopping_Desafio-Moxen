import { z } from "zod"

import { userIdSchema } from "./user.schema"

export const liveSchema = z.object({
    id: z.string().uuid(),
    titulo: z.string(),
    descricao: z.string(),
    imagemURL: z.string(),
    inicioLive: z.string(),  
    fimLive: z.string(),
    user: userIdSchema
})
export const liveIdSchema = liveSchema.pick({ id: true })
export const simpleLiveSchema = liveSchema.omit({ id: true, user: true}) 
export const createLiveSchema = liveSchema.omit({ id: true })
export const updateLiveSchema = simpleLiveSchema.partial()