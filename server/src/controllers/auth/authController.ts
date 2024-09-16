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
            const tokens = await authService.signUp(data)

            return res.json(tokens)
        } catch (e) {
            next(e)
        }
    }
}

export default new AuthController()