import { type NextFunction, type Request, type Response } from 'express'
import { 
  fetchWalletBalance, 
  depositFunds, 
  transferFunds, 
  fetchAccountSummary 
} from '../services/wallet.service'
import { fetchTransactionHistory } from '../services/wallet.service'


export const walletBalance = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { accountNumber } = req.body
    const result = await fetchWalletBalance(accountNumber)
    return res.status(result.code).json(result)
  } catch (error) {
    next(error)
  }
}


/**
 * deposite money into account
 * @date 1/18/2024 - 23:17:55 pM
 *
 * @async
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns JSON object as response data
 */

export const fundWallet = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { accountNumber, amount, wallet } = req.body

    let transactionType;

    const result = await depositFunds(
      accountNumber, 
      amount, 
      wallet, 
      transactionType = 'Wallet Deposit'
      )
    return res.status(result.code).json(result)
  } catch (error) {
    next(error)
  }
}


/**
 * transfer money into another account 
 * @date 1/21/2024 - 14:21:10 pM
 *
 * @async
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns JSON object as response data
 */

export const transferWalletFunds = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { 
      senderAccountNumber,
      receiverAccountNumber, 
      amount, 
      wallet } = req.body
  
      let transactionType;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const result = await transferFunds(
      amount, 
      senderAccountNumber, 
      receiverAccountNumber, 
      transactionType = 'Wallet Transfer', 
      wallet
      )
    return res.status(result!.code).json(result)
  } catch (error) {
    next(error)
  }
}


export const accountSummary = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {

    const { accountNumber } = req.body

    const result = await fetchAccountSummary(accountNumber)
    return res.status(result.code).json(result)
  } catch (error) {
    next(error)
  }
}



export const transactionHistory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {

    const { accountNumber } = req.body

    const page = Number(req.query.page) || 0
    const limit  = Number(req.query.limit) || 5

    

    const result = await fetchTransactionHistory(accountNumber, page, limit)
    return res.status(result.code).json(result)
  } catch (error) {
    next(error)
  }
}
