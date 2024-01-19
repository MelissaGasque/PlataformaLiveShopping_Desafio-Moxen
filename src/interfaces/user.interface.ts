import { z } from "zod"
import { createUserSchema, returnUserSchema, userSchema } from "../schema/user.schema"
import { DeepPartial } from "typeorm"
import { User } from "../entities/users.entity"

type UserInterface = z.infer<typeof userSchema>
type UserCreateInterface = z.infer<typeof createUserSchema>
type UserReturnInterface = z.infer<typeof returnUserSchema>
type UserUpdateInterface = DeepPartial<User>

export { UserInterface, UserCreateInterface, UserReturnInterface, UserUpdateInterface}
