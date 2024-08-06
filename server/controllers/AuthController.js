import { validationResult } from 'express-validator'
import AuthService from '../services/AuthService.js'
import HttpErrorHandler from '../exceptions/HttpErrorHandler.js'

class AuthController {
    async signUp(req, res, next) {
        try {
            const errors = validationResult(req)
            if (! errors.isEmpty()) {
                next(HttpErrorHandler.badRequest(422, 'Validation error', errors))
            }

            const { name, email, password, password_confirmation } = req.body
            const tokens = await AuthService.signUp({ name, email, password, password_confirmation })

            res.cookie('refreshToken', tokens.refreshToken, { maxAge: 60 * 60 * 1000, httpOnly: true })
            return res.json(tokens)
        } catch (e) {
            next(e)
        }
    }

    async verify(req, res, next) {
        try {
            const verificationLink = req.params.link
            await AuthService.verify(verificationLink)
            return res.redirect(process.env.CLIENT_URL)
        } catch (e) {
            next(e)
        }
    }
}

export default new AuthController()