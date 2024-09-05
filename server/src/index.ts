import express, { Request, Response } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()

const PORT = process.env.PORT || 5000

const app = express()

app.use(express.json())
app.use(cors())

app.get('/', (req: Request, res: Response) => {
    res.json({status: 'success'})
})

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
