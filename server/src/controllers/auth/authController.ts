import { NextFunction, Request, Response } from 'express'
import { validationResult } from 'express-validator'
import authService from '../../services/authService.js'
import HttpErrorException from '../../exceptions/httpErrorException.js'

class AuthController {
    public async signUp(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return next(HttpErrorException.validationError(errors.array()))
            }

            const data = req.body
            const userData = await authService.signUp(data)

            res.cookie('refreshToken', userData.tokens.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true
            })
            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }

    public async signIn(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return next(HttpErrorException.validationError(errors.array()))
            }

            const data = req.body
            const userData = await authService.signIn(data.email, data.password)

            res.cookie('refreshToken', userData.tokens.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true
            })
            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }

    public async signOut(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const { refreshToken } = req.cookies

            await authService.signOut(refreshToken)

            res.clearCookie('refreshToken')
            return res.json({
                message: 'You signed out successfully'
            })
        } catch (e) {
            next(e)
        }
    }

    public async refresh(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const { refreshToken } = req.cookies

            const userData = await authService.refresh(refreshToken)

            res.cookie('refreshToken', userData.tokens.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true
            })
            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }

    public async activate(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const { link: activationLink } = req.params

            await authService.activate(activationLink)

            return res.redirect(`${process.env.CLIENT_URL}`, 302)
        } catch (e) {
            next(e)
        }
    }
}

export default new AuthController()