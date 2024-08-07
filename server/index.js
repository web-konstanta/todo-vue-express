import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import router from './routes/router.js'
import HttpErrorMiddleware from './src/http/middlewares/HttpErrorMiddleware.js'
import dotenv from 'dotenv'

dotenv.config()

const PORT = process.env.PORT || 5000
const DB_URL = process.env.DB_URL

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use('/api', router)
app.use(HttpErrorMiddleware)

const startApp = async () => {
    try {
        await mongoose.connect(DB_URL)
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

await startApp()