import Token from '../models/Token.js'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET_KEY, {expiresIn: '30m'})
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET_KEY, {expiresIn: '30d'})

        return {
            accessToken,
            refreshToken
        }
    }

    async saveRefreshToken(userId, refreshToken) {
        const tokenData = await Token.findOne({userId})

        if (tokenData) {
            tokenData.refreshToken = refreshToken
            await tokenData.save()
        }

        return await Token.create({userId, refreshToken})
    }
}

export default new TokenService()