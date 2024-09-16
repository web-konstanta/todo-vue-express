import Router from 'express'
import googleAuthController from '../controllers/auth/googleAuthController.js'

const router = Router()

router.get('/callback', googleAuthController.callback)
router.post('/request', googleAuthController.request)

export default router