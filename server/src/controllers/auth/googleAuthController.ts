import googleAuthService from '../../services/googleAuthService.js'
import { Request, Response } from 'express'
import dotenv from 'dotenv'
dotenv.config()

class GoogleAuthController {
    public async callback(req: Request, res: Response): Promise<any> {
        const { code } = req.query

        if (typeof code === 'string') {
            const userData = await googleAuthService.getUserData(code)
            console.log(userData)
            return res.redirect(`${process.env.CLIENT_URL}/todo`)
        }
    }

    public async request(req: Request, res: Response): Promise<Response> {
        return res.json({ url: await googleAuthService.getAuthorizeUrl() })
    }
}

export default new GoogleAuthController()