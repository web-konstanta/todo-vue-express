import Router from 'express'
import accountController from '../controllers/accountController.js'
import authMiddleware from '../middlewares/authMiddleware.js'

const router = Router()

router.get('/data', authMiddleware, accountController.userData)

export default router