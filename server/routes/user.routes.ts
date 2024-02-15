import express from 'express'
import { createWalletUser, loginWalletUser 
} from '../controllers/user.controller'
import {forgotPassword , resetPassword} from '../controllers/auth.controller'
import { validateUserSignUpInput ,validateLoginInput } from '../middlewares/validator.middleware'
import { authenticate } from '../middlewares/pin.middleware'
import { checkToken } from '../middlewares/authentication.middleware'
import { validateFundWalletFundInputs, validateTransferFundsInputs } from '../middlewares/validator.middleware'
import { getTransactions } from '../controllers/filter.controller'
import {searchUsers} from '../controllers/filter.controller'

import { 
    walletBalance, 
    fundWallet, 
    transferWalletFunds,
    accountSummary, 
    transactionHistory 
} from '../controllers/wallet.controller'
import { createPin } from '../services/user.service'
import { sendCustomizedEmail } from "../services/emailsender";


const router = express.Router()

router.post('/signup', validateUserSignUpInput, createWalletUser)

router.post('/login', validateLoginInput, loginWalletUser)
router.post('/forgot-password', forgotPassword)
router.post('/reset-password', resetPassword)
router.post('/send-email', sendCustomizedEmail)


router.get('/balance', checkToken, walletBalance)
router.get('/filter', getTransactions)
router.get('/search',searchUsers)
router.patch('/fund', checkToken, validateFundWalletFundInputs,fundWallet)
router.patch('/transfer', checkToken, validateTransferFundsInputs, transferWalletFunds)

router.get('/home',checkToken, accountSummary)
router.get('/transactions',checkToken, transactionHistory)
router.post('/createPin', authenticate, createPin)
export default router
