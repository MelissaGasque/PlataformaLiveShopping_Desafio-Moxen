import "reflect-metadata"
import "express-async-errors"
import "dotenv/config"
import express, { Application } from 'express'
import { loginRouter, userRouter } from "./routes/index.routes"
import { handleErrors } from "./errors/handleErrors"



const app: Application = express()
app.use(express.json())
app.use("/user", userRouter)
app.use("/login", loginRouter)

app.use(handleErrors)
export default app