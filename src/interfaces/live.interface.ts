import { z } from "zod"
import { createLiveSchema, liveSchema } from "../schema/live.schema"
import { Live } from "../entities/live.entity"
import { DeepPartial } from "typeorm"

type LiveInterface = z.infer<typeof liveSchema>
type LiveCreateInterface = z.infer<typeof createLiveSchema>
type LiveUpdateInterface = DeepPartial<Live>

export { LiveCreateInterface, LiveInterface, LiveUpdateInterface }