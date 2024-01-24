import express, { type Request, type Response } from 'express'
import user from '../../routes/user.routes'
 import transfer from '../../routes/transactions'
const api = express.Router()

api.get('/', (req: Request, res: Response) => res.status(200).json({
  status: 'success',
  message: 'Welcome to Wallet API'
}))

// TODO create wallet user api
api.use('/wallet', user)
api.use('/wallet', transfer)
export default api
