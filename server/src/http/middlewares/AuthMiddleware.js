import HttpErrorHandler from '../exceptions/HttpErrorHandler.js'
import TokenService from '../../services/TokenService.js'

export default (req, res, next) => {
    try {
        const bearerToken = req.headers.authorization

        if (! bearerToken) {
            next(HttpErrorHandler.unauthorized())
        }

        const accessToken = bearerToken.split(' ')[1]
        const userData = TokenService.validateAccessToken(accessToken)

        if (! userData) {
            next(HttpErrorHandler.unauthorized())
        }

        req.user = userData
        next()
    } catch (e) {
        next(e)
    }
}