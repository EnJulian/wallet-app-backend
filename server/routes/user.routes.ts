import express from 'express'
import { createWalletUser, loginWalletUser 
} from '../controllers/user.controller'
import { validateUserSignUpInput ,validateLoginInput } from '../middlewares/validator.middleware'
import { checkToken } from '../middlewares/authentication.middleware'
import { validateFundWalletFundInputs, validateTransferFundsInputs } from '../middlewares/validator.middleware'

import { 
    walletBalance, 
    fundWallet, 
    transferWalletFunds,
    accountSummary, 
    transactionHistory 
} from '../controllers/wallet.controller'


const router = express.Router()

router.post('/signup', validateUserSignUpInput, createWalletUser)

router.post('/login', validateLoginInput, loginWalletUser)

router.get('/balance', checkToken, walletBalance)
router.patch('/fund', checkToken, validateFundWalletFundInputs,fundWallet)
router.patch('/transfer', checkToken, validateTransferFundsInputs, transferWalletFunds)

router.get('/home',checkToken, accountSummary)
router.get('/transactions',checkToken, transactionHistory)

export default router
