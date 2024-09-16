import googleAuthService from '../../services/googleAuthService.js'
import { Request, Response } from 'express'
import dotenv from 'dotenv'
dotenv.config()

class GoogleAuthController {
    public async callback(req: Request, res: Response): Promise<any> {
        const { code } = req.query

        if (typeof code === 'string') {
            const tokens = await googleAuthService.auth(code)

            res.cookie('accessToken', tokens.accessToken, { maxAge: 60 * 60 * 1000 })
            res.cookie('refreshToken', tokens.refreshToken, { maxAge: 60 * 60 * 1000, httpOnly: true })
            
            return res.status(302).redirect(`${process.env.CLIENT_URL}/todo`)
        } else {
            return res.status(302).redirect(`${process.env.CLIENT_URL}`)
        }
    }

    public async request(req: Request, res: Response): Promise<Response> {
        return res.json({ url: await googleAuthService.getAuthorizeUrl() })
    }
}

export default new GoogleAuthController()