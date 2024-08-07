import Token from '../models/Token.js'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import HttpErrorHandler from '../http/exceptions/HttpErrorHandler.js'

dotenv.config()

class TokenService {
    validateAccessToken(refreshToken) {
        try {
            return jwt.verify(refreshToken, process.env.JWT_ACCESS_SECRET_KEY)
        } catch (e) {
            throw HttpErrorHandler.badRequest(500, e.message)
        }
    }

    validateRefreshToken(refreshToken) {
        try {
            return jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET_KEY)
        } catch (e) {
            throw HttpErrorHandler.badRequest(500, e.message)
        }
    }

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
            return await tokenData.save()
        }

        return await Token.create({userId, refreshToken})
    }

    async removeRefreshToken(refreshToken) {
        return await Token.deleteOne({refreshToken})
    }
}

export default new TokenService()