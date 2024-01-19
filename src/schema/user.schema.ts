import { z } from "zod"

export const userSchema = z.object({
    id: z.string().uuid(),
    name: z.string().min(1),
    email: z.string().email().min(1),
    password: z.string().max(120).min(4),
})

export const createUserSchema = userSchema.omit({ id: true })
export const returnUserSchema = userSchema.omit({ password: true })
export const updateUserSchema = createUserSchema.partial()