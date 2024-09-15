import express, { Request, Response } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()
import oauthRouter from './routes/googleAuthRouter.js'
import cookieParser from 'cookie-parser'

const PORT = process.env.PORT || 5000

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: process.env.CLIENT_URL,
    methods: '*',
    credentials: true
}))
app.use('/google', oauthRouter)

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))