import User from '../models/User.js'
import {UserDto} from '../dto/UserDto.js'
import bcrypt from 'bcryptjs'
import TokenService from './TokenService.js'
import * as uuid from 'uuid'
import MailService from './MailService.js'
import HttpErrorHandler from '../http/exceptions/HttpErrorHandler.js'
import dotenv from 'dotenv'

dotenv.config()

class AuthService {
    async signUp(data) {
        const candidate = await User.findOne({email: data.email})
        if (candidate) {
            throw HttpErrorHandler.badRequest(400, `User with email ${data.email} already exists`)
        }

        if (data.password !== data.password_confirmation) {
            throw HttpErrorHandler.badRequest(400, `Passwords do not match`)
        }

        const hashedPassword = bcrypt.hashSync(data.password, 7)
        const verificationLink = uuid.v4()

        const user = await User.create({
            name: data.name,
            email: data.email,
            password: hashedPassword,
            verificationLink: verificationLink
        })

        if (! user) {
            throw HttpErrorHandler.badRequest(400, `Registration failed`)
        }

        const userDto = new UserDto(user)
        const tokens = TokenService.generateTokens({ ...userDto })
        await TokenService.saveRefreshToken(userDto.id, tokens.refreshToken)
        await MailService.sendVerificationLink(data.email, `${process.env.API_URL}/api/verify/${verificationLink}`)

        return tokens
    }

    async signIn(data) {
        const user = await User.findOne({email: data.email})
        if (! user) {
            throw HttpErrorHandler.badRequest(400, 'Email is invalid')
        }

        if (! user.isVerified) {
            throw HttpErrorHandler.badRequest(400, 'Account not verified')
        }

        const isValidPassword = bcrypt.compareSync(data.password, user.password)
        if (! isValidPassword) {
            throw HttpErrorHandler.badRequest(400, `Password is invalid`)
        }

        const userDto = new UserDto(user)
        const tokens = TokenService.generateTokens({ ...userDto })
        await TokenService.saveRefreshToken(userDto.id, tokens.refreshToken)

        return tokens
    }

    async signOut(refreshToken) {
        const userData = TokenService.validateRefreshToken(refreshToken)
        if (! userData) {
            throw HttpErrorHandler.unauthorized()
        }

        const user = await User.findById(userData.id)
        if (! user) {
            throw HttpErrorHandler.unauthorized()
        }

        await TokenService.removeRefreshToken(refreshToken)
    }

    async verify(verificationLink) {
        const user = await User.findOne({verificationLink})
        if (user.isVerified) {
            throw HttpErrorHandler.badRequest(400, `Account is already verified`)
        }

        user.isVerified = true
        await user.save()
    }
}

export default new AuthService()