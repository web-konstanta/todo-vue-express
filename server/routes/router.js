import AuthController from '../src/http/controllers/AuthController.js'
import { body } from 'express-validator'
import Router from 'express'

const router = new Router()

router.post('/sign-up',
    body('name').isLength({ min:2, max: 30 }),
    body('email').isEmail(),
    body('password').isLength({ min: 6, max: 30 }),
    body('password_confirmation').isLength({ min: 6, max: 30 }),
    AuthController.signUp
)
router.post('/sign-in',
    body('email').isEmail(),
    body('password').isLength({ min: 6, max: 30 }),
    AuthController.signIn.bind(AuthController)
)
router.get('/verify/:link', AuthController.verify)

export default router