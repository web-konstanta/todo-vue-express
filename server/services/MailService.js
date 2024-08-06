import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()

class MailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            service: process.env.SMTP_SERVICE,
            port: process.env.SMTP_PORT,
            secure: false,
            logger: true,
            debug: true,
            secureConnection: true,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD,
            },
            tls: {
                rejectUnauthorized: false
            }
        })
    }

    async sendVerificationLink(to, link) {
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: 'Account verification',
            text: '',
            html:
                `
                    <h1>Verify your account by this link</h1>
                    <a href="${link}">${link}</a>
                `
        })
    }
}

export default new MailService()