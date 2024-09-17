import nodemailer, {Transporter} from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()

class MailService {
    private transporter: Transporter

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: process.env.SMTP_SERVICE,
            port: process.env.SMTP_PORT,
            secure: true,
            logger: true,
            debug: true,
            secureConnection: true,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            },
            tls: {
                rejectUnauthorized: false
            }
        })
    }

    public async sendActivationMail(to: string, link: string): Promise<void> {
        await this.transporter.sendMail({
            from: 'isprogrammer123@gmail.com',
            to,
            subject: 'Account activation',
            text: '',
            html: `
                <h1>Activate your account via link</h1>
                <a href="${link}">${link}</a>
            `
        })
    }
}

export default new MailService()