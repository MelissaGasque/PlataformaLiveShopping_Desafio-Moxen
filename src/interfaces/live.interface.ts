import { z } from "zod"
import { createLiveSchema, liveSchema, updateLiveSchema } from "../schema/live.schema"

type LiveInterface = z.infer<typeof liveSchema>
type LiveCreateInterface = z.infer<typeof createLiveSchema>
type LiveUpdateInterface = z.infer<typeof updateLiveSchema>


export { LiveCreateInterface, LiveInterface, LiveUpdateInterface }