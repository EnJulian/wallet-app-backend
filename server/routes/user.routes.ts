import express from 'express'
import { createWalletUser, loginWalletUser 
} from '../controllers/user.controller'
import {forgotPassword , resetPassword} from '../controllers/auth.controller'
import { validateUserSignUpInput ,validateLoginInput } from '../middlewares/validator.middleware'

const router = express.Router()

 router.post('/signup', validateUserSignUpInput, createWalletUser)

router.post('/login', validateLoginInput, loginWalletUser)
router.post('/forgot-password', forgotPassword)
router.post('/reset-password', resetPassword)

export default router
