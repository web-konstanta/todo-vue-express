import JwtPayload from '../types/jwtPayload.js'
import prisma from '../db/prisma.js'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

class TokenService {
    public validateAccessToken(accessToken: string) {
        try {
            return jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET!)
        } catch (e) {
            return null
        }
    }

    public validateRefreshToken(refreshToken: string) {
        try {
            return jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET!)
        } catch (e) {
            return null
        }
    }

    public generateTokens(payload: JwtPayload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET!, { expiresIn: '15m' })
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET!, { expiresIn: '30d' })

        return {
            accessToken,
            refreshToken
        }
    }

    public async saveRefreshToken(refreshToken: string, userId: number) {
        await prisma.refreshToken.upsert({
            where: {
                userId: userId
            },
            update: {
                token: refreshToken
            },
            create: {
                token: refreshToken,
                userId: userId
            }
        })
    }
}

export default new TokenService()