import tokenService from './tokenService.js'
import { OAuth2Client } from 'google-auth-library'
import prisma from '../db/prisma.js'
import UserDto from '../db/dto/userDto.js'
import dotenv from 'dotenv'
dotenv.config()

class GoogleAuthService {
    private readonly redirectUrl: string
    private oAuth2Client: OAuth2Client
    private readonly scope: string

    constructor() {
        this.redirectUrl = `${process.env.API_URL}/google/callback`
        this.scope = [
            'https://www.googleapis.com/auth/userinfo.email',
            'https://www.googleapis.com/auth/userinfo.profile'
        ].join(' ')
        this.oAuth2Client = new OAuth2Client(
            process.env.CLIENT_ID,
            process.env.CLIENT_SECRET,
            this.redirectUrl
        )
    }

    public async getAuthorizeUrl(): Promise<string> {
        return this.oAuth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: this.scope,
            prompt: 'consent'
        })
    }

    public async getUserData(code: string): Promise<any> {
        try {
            const result = await this.oAuth2Client.getToken(code)
            await this.oAuth2Client.setCredentials(result.tokens)

            const user = this.oAuth2Client.credentials

            const ticket = await this.oAuth2Client.verifyIdToken({
                idToken: user.id_token!,
                audience: process.env.CLIENT_ID
            })
            return ticket.getPayload()
        } catch (e) {
            console.log(e)
        }
    }

    public async auth(code: string) {
        const userData = await this.getUserData(code)

        const candidate = await prisma.user.findUnique({
            where: {
                email: userData.email
            }
        })

        const payload = new UserDto(userData)

        const tokens = tokenService.generateTokens({ ...payload })

        if (!candidate) {
            const user = await prisma.user.create({
                data: {
                    name: userData.name,
                    email: userData.email,
                    avatar: userData.picture,
                    verifiedAt: new Date(),
                    oAuth: true
                }
            })

            await tokenService.saveRefreshToken(tokens.refreshToken, user.id)
        } else {
            await tokenService.saveRefreshToken(tokens.refreshToken, candidate.id)
        }

        return tokens
    }
}

export default new GoogleAuthService()