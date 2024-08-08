import { validationResult } from 'express-validator'
import AuthService from '../../services/AuthService.js'
import HttpErrorHandler from '../exceptions/HttpErrorHandler.js'

class AuthController {
    constructor() {
        this.refreshCookieTimeout = 60 * 60 * 1000
        this.signUp = this.signUp.bind(this)
        this.signIn = this.signIn.bind(this)
        this.refresh = this.refresh.bind(this)
    }

    async signUp(req, res, next) {
        try {
            const errors = validationResult(req)
            if (! errors.isEmpty()) {
                next(HttpErrorHandler.badRequest(422, 'Validation error', errors))
            }

            const { name, email, password, password_confirmation } = req.body
            const tokens = await AuthService.signUp({ name, email, password, password_confirmation })

            res.cookie('refreshToken', tokens.refreshToken, { maxAge: this.refreshCookieTimeout, httpOnly: true })
            return res.json({
                tokens: tokens,
                message: 'You signed up successfully'
            })
        } catch (e) {
            console.log(e)
            next(e)
        }
    }

    async signIn(req, res, next) {
        try {
            const errors = validationResult(req)
            if (! errors.isEmpty()) {
                next(HttpErrorHandler.badRequest(422, 'Validation error', errors))
            }

            const { email, password } = req.body
            const tokens = await AuthService.signIn({ email, password })

            res.cookie('refreshToken', tokens.refreshToken, { maxAge: this.refreshCookieTimeout, httpOnly: true })
            return res.json({
                tokens: tokens,
                message: 'You signed in successfully'
            })
        } catch (e) {
            next(e)
        }
    }

    async signOut(req, res, next) {
        try {
            const { refreshToken } = req.cookies
            await AuthService.signOut(refreshToken)
            res.clearCookie('refreshToken')
            return res.json({message: 'You signed out successfully'})
        } catch (e) {
            next(e)
        }
    }

    async refresh(req, res, next) {
        try {
            const { refreshToken } = req.cookies
            const tokens = await AuthService.refresh(refreshToken)
            res.cookie('refreshToken', tokens.refreshToken, { maxAge: this.refreshCookieTimeout, httpOnly: true })
            return res.json({
                tokens: tokens,
                message: 'Tokens refreshed successfully'
            })
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