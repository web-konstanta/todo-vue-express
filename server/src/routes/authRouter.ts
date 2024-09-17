import Router from 'express'
import authController from '../controllers/auth/authController.js'
import { body } from 'express-validator'

const router = Router()

router.post('/sign-up',
    body('name').isLength({ min: 2, max: 20 }),
    body('email', 'Email field is invalid').isEmail(),
    body('password').isLength({ min: 6, max: 30 }),
authController.signUp)
router.post('/sign-in',
    body('email', 'Email field is invalid').isEmail(),
    body('password').isLength({ min: 6, max: 30 }),
    authController.signIn)
router.get('/activate/:link', authController.activate)

export default router