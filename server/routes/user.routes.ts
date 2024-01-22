import express from 'express'
import { createWalletUser, loginWalletUser 
} from '../controllers/user.controller'
import { validateUserSignUpInput ,validateLoginInput } from '../middlewares/validator.middleware'

const router = express.Router()

 router.post('/signup', validateUserSignUpInput, createWalletUser)

router.post('/login', validateLoginInput, loginWalletUser)

export default router
