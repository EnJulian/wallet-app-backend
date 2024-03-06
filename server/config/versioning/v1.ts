import express, { type Request, type Response } from 'express'
import user from '../../routes/user.routes'

const api = express.Router()

api.get('/', (req: Request, res: Response) => res.status(200).json({
  status: 'success',
  message: 'Welcome to Wallet API'
}))

api.use('/wallet/v1', user)

export default api
