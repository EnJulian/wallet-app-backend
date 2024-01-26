import express from 'express'
import { createWalletUser, loginWalletUser 
} from '../controllers/user.controller'
import {forgotPassword , resetPassword} from '../controllers/auth.controller'
import { validateUserSignUpInput ,validateLoginInput } from '../middlewares/validator.middleware'
import { authenticate } from '../middlewares/pin.middleware'
import { checkToken } from '../middlewares/authentication.middleware'
import { validateFundWalletFundInputs, validateTransferFundsInputs } from '../middlewares/validator.middleware'
import { walletBalance, fundWallet, transferWalletFunds } from '../controllers/wallet.controller'
import { createPin } from '../services/user.service'


const router = express.Router()

 router.post('/signup', validateUserSignUpInput, createWalletUser)

router.post('/login', validateLoginInput, loginWalletUser)
router.post('/forgot-password', forgotPassword)
router.post('/reset-password', resetPassword)

router.get('/balance', walletBalance)
router.patch('/fund', checkToken, validateFundWalletFundInputs,fundWallet)
router.patch('/transfer', checkToken, validateTransferFundsInputs, transferWalletFunds)
router.post('/createPin', authenticate, createPin)
export default router
