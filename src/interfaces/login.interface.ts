import { z } from 'zod'
import { loginSchema } from './../schema/login.schema'

export type loginInterface = z.infer<typeof loginSchema>
export type loginReturn = { token: string } 