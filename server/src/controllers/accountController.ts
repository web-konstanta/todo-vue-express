import { NextFunction, Request, Response } from 'express'
import prisma from '../db/prisma.js'

class AccountController {
    public async userData(req: Request, res: Response, next: NextFunction) {
        try {
            // @ts-ignore
            const userPayload = req.user

            const user = await prisma.user.findUnique({
                where: {
                    email: userPayload.email
                },
                select: {
                    name: true,
                    email: true,
                    avatar: true
                }
            })

            return res.json({
                data: user,
                message: 'User data fetched'
            })
        } catch (e) {
            next(e)
        }
    }
}

export default new AccountController()