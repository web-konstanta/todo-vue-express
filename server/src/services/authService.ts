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
            throw HttpErrorException.badRequest('User with this email already exists', 400)
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

        await mailService.sendActivationMail(user.email, `${process.env.API_URL}/api/auth/activate/${activationLink}`)

        const payload = new UserDto({
            id: user.id,
            name: user.name,
            email: user.email
        })

        const tokens = tokenService.generateTokens({ ...payload })
        await tokenService.saveRefreshToken(tokens.refreshToken, user.id)

        return tokens
    }

    public async signIn(email: string, password: string): Promise<any> {
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })

        if (!user) {
            throw HttpErrorException.badRequest('Email is invalid', 400)
        }

        if (!user.verifiedAt) {
            throw HttpErrorException.badRequest('Account not activated', 400)
        }

        const isValidPassword = await bcrypt.compare(password, user.password!)

        if (!isValidPassword) {
            throw HttpErrorException.badRequest('Password is invalid', 400)
        }

        const payload = new UserDto({
            id: user.id,
            name: user.name,
            email: user.email
        })

        const tokens = tokenService.generateTokens({ ...payload })
        await tokenService.saveRefreshToken(tokens.refreshToken, user.id)

        return tokens
    }

    public async activate(activationLink: string): Promise<void> {
        const user = await prisma.user.findFirst({
            where: {
                activationLink
            }
        })

        if (!user) {
            throw new HttpErrorException('Activation link is invalid', 400)
        }

        if (user.verifiedAt) {
            throw new HttpErrorException('Account have already been verified', 400)
        }

        await prisma.user.update({
            where: {
                id: user.id
            },
            data: {
                verifiedAt: new Date()
            }
        })
    }
}

export default new AuthService()