import { validationResult } from 'express-validator'
import AuthService from '../services/AuthService.js'

class AuthController {
    async signUp(req, res, next) {
        try {
            const errors = validationResult(req)
            if (! errors.isEmpty()) {
                return res.status(422).json({
                    message: 'Validation error',
                    errors: errors.array()
                })
            }

            const { name, email, password, password_confirmation } = req.body
            const tokens = await AuthService.signUp({ name, email, password, password_confirmation })

            res.cookie('refreshToken', tokens.refreshToken, { maxAge: 60 * 60 * 1000, httpOnly: true })
            return res.json(tokens)
        } catch (e) {
            return res.status(500).json(e)
        }
    }
}

export default new AuthController()