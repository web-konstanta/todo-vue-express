import googleAuthService from '../../services/googleAuthService.js'
import tokenService from '../../services/tokenService.js'
import UserDto from '../../db/dto/userDto.js'
import { Request, Response } from 'express'
import dotenv from 'dotenv'
import prisma from '../../db/prisma.js'
dotenv.config()

class GoogleAuthController {
    public async callback(req: Request, res: Response): Promise<any> {
        const { code } = req.query

        if (typeof code === 'string') {
            const userData = await googleAuthService.getUserData(code)
            
            const candidate = await prisma.user.findUnique({
                where: {
                    email: userData.email
                }
            })

            if (! candidate) {
                const payload = new UserDto(userData)
                
                const tokens = tokenService.generateTokens({ ...payload })

                res.cookie('accessToken', tokens.accessToken, { maxAge: 60 * 60 * 1000 })
                res.cookie('refreshToken', tokens.refreshToken, { maxAge: 60 * 60 * 1000, httpOnly: true })
            } else {
                // code...
            }
            
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