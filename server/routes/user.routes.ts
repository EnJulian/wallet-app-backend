import express from 'express'
import { createWalletUser,
    loginWalletUser,
    getUserProfile 
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
import { sendCustomizedEmail } from "../services/emailsender.service";


const router = express.Router()

router.post('/signup', validateUserSignUpInput, createWalletUser)

router.post('/login', validateLoginInput, loginWalletUser)
router.post('/forgot-password', forgotPassword)
router.post('/reset-password', resetPassword)
router.post("/send-email", sendCustomizedEmail);
router.post('/create-pin', authenticate, createPin)

router.get('/filter', getTransactions)
router.get('/search',searchUsers)

router.get('/account-balance', checkToken, walletBalance)
router.patch('/deposit-funds', checkToken, validateFundWalletFundInputs,fundWallet)
router.patch('/transfer-funds', checkToken, validateTransferFundsInputs, transferWalletFunds)

router.get('/account-summary',checkToken, accountSummary)
router.get('/transactions-history',checkToken, transactionHistory)
router.get('/user-profile',checkToken, getUserProfile)


router.get('/health', (req, res) => res.status(200).json())

export default router
