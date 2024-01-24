import express from 'express'

import { transferTransactions
} from '../services/transaction.service'

import { authenticate } from '../middlewares/auth.middleware'

const router = express.Router()


router.post('/transfer', authenticate, transferTransactions)

export default router