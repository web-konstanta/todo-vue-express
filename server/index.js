import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from "cookie-parser";
dotenv.config()

const PORT = process.env.PORT || 5000
const DB_URL = process.env.DB_URL

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors())

const startApp = async () => {
    try {
        await mongoose.connect(DB_URL)
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

await startApp()