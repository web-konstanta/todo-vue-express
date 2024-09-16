import JwtPayload from '../types/jwtPayload.js'
import prisma from '../db/prisma.js'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

class TokenService {
    public generateTokens(payload: JwtPayload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET!, { expiresIn: '30m' })
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