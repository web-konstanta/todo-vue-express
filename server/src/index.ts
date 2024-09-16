import oauthRouter from './routes/googleAuthRouter.js'
import authRouter from './routes/authRouter.js'
import httpError from './middlewares/httpError.js'
import cookieParser from 'cookie-parser'
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

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
app.use('/api/auth', authRouter)
app.use(httpError)

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))