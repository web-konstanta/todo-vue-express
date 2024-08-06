import User from '../models/User.js'
import {UserDto} from '../dto/UserDto.js'
import bcrypt from 'bcryptjs'
import TokenService from '../services/TokenService.js'
import * as uuid from 'uuid'
import MailService from '../services/MailService.js'
import dotenv from 'dotenv'
dotenv.config()

class AuthService {
    async signUp(data) {
        const candidate = await User.findOne({email: data.email})
        if (candidate) {
            throw new Error(`User with email ${data.email} already exists`)
        }

        if (data.password !== data.password_confirmation) {
            throw new Error(`Passwords do not match`)
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
            throw new Error(`Registration failed`)
        }

        const userDto = new UserDto(user)
        const tokens = TokenService.generateTokens({ ...userDto })
        await TokenService.saveRefreshToken(userDto.id, tokens.refreshToken)
        await MailService.sendVerificationLink(data.email, `${process.env.API_URL}/api/verify/${verificationLink}`)

        return tokens
    }
}

export default new AuthService()