import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import authService from '../../services/authService.js'

class AuthController {
    public async signUp(req: Request, res: Response): Promise<any> {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array() })
            }

            const data = req.body
            const tokens = await authService.signUp(data)

            return res.json(tokens)
        } catch (e) {
            console.log(e)
        }
    }
}

export default new AuthController()