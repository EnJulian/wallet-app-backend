import express from 'express'
import { createWalletUser, loginWalletUser 
} from '../controllers/user.controller'
import { validateUserSignUpInput ,validateLoginInput } from '../middlewares/validator.middleware'
import { checkToken } from '../middlewares/authentication.middleware'
import { validateFundWalletFundInputs, validateTransferFundsInputs } from '../middlewares/validator.middleware'
import { walletBalance, fundWallet, transferWalletFunds } from '../controllers/wallet.controller'


const router = express.Router()

 router.post('/signup', validateUserSignUpInput, createWalletUser)

router.post('/login', validateLoginInput, loginWalletUser)

router.get('/balance', walletBalance)
router.patch('/fund', checkToken, validateFundWalletFundInputs,fundWallet)
router.patch('/transfer', checkToken, validateTransferFundsInputs, transferWalletFunds)
export default router
