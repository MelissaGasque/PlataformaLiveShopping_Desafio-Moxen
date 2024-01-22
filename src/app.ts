import "reflect-metadata"
import "express-async-errors"
import "dotenv/config"
import express, { Application } from 'express'
import { liveRouter, loginRouter, userRouter, productRouter } from "./routes/index.routes"
import { handleErrors } from "./errors/handleErrors"
import cors from "cors"


const app: Application = express()
app.use(cors())

app.use(express.json())

app.use("/user", userRouter)
app.use("/login", loginRouter)
app.use("/live", liveRouter)
app.use("/product", productRouter)

app.use(handleErrors)
export default app