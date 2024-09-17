import tokenService from './tokenService.js'
import mailService from './mailService.js'
import UserData from '../types/userData.js'
import UserDto from '../db/dto/userDto.js'
import prisma from '../db/prisma.js'
import bcrypt from 'bcryptjs'
import HttpErrorException from '../exceptions/httpErrorException.js'
import * as uuid from 'uuid'

class AuthService {
    public async signUp(data: UserData): Promise<any> {
        const candidate = await prisma.user.findUnique({
            where: {
                email: data.email
            }
        })

        if (candidate) {
            throw new HttpErrorException('User with this email already exists', 400)
        }

        const hashedPassword = await bcrypt.hash(data.password!, 7)
        const activationLink = uuid.v4()

        const user = await prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: hashedPassword,
                activationLink
            }
        })

        await mailService.sendActivationMail(user.email, `${process.env.API_URL}/activate/${activationLink}`)

        const payload = new UserDto({
            id: user.id,
            name: user.name,
            email: data.email
        })

        const tokens = tokenService.generateTokens({ ...payload })
        await tokenService.saveRefreshToken(tokens.refreshToken, user.id)

        return tokens
    }
}

export default new AuthService()