import { Request, Response, NextFunction } from 'express'
import HttpErrorException from '../exceptions/httpErrorException.js'
import tokenService from '../services/tokenService.js'

export default (req: Request, res: Response, next: NextFunction) => {
    try {
        let accessToken = req.headers.authorization

        if (!accessToken) {
            return next(HttpErrorException.unauthorized())
        }

        accessToken = accessToken!.split(' ')[1]

        const userData = tokenService.validateAccessToken(accessToken)

        if (!userData) {
            return next(HttpErrorException.unauthorized())
        }

        // @ts-ignore
        req.user = userData

        next()
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            message: 'Unprocessable error'
        })
    }
}