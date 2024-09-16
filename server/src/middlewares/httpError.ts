import { NextFunction, Request, Response } from 'express'
import HttpErrorException from '../exceptions/httpErrorException.js'

export default (err: Array<any>, req: Request, res: Response, next: NextFunction) => {
    try {
        if (err instanceof HttpErrorException) {
            return res.status(err.status).json({
                message: err.message,
                errors: err.errors
            })
        }

        return res.status(500).json({
            message: 'Unprocessable error'
        })
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            message: 'Unprocessable error'
        })
    }
}