import { Request, Response, NextFunction } from 'express'
import HttpErrorException from '../exceptions/httpErrorException.js'
import tokenService from '../services/tokenService.js'

export default (req: Request, res: Response, next: NextFunction) => {
    try {
        let accessToken = req.headers.authorization
        let { refreshToken } = req.cookies

        if (!refreshToken) {
            return next(HttpErrorException.badRequest('Refresh token is invalid', 500))
        }

        if (!tokenService.validateRefreshToken(refreshToken)) {
            return next(HttpErrorException.badRequest('Refresh token expired', 403))
        }

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