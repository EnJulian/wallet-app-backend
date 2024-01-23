import { type NextFunction, type Request, type Response } from 'express'
import { fetchWalletBalance, depositFunds, transferFunds } from '../services/wallet.service'



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
    const result = await depositFunds(accountNumber, amount, wallet)
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
      wallet, 
      amount } = req.body
    const result = await transferFunds( senderAccountNumber, receiverAccountNumber, wallet, amount)
    return res.status(result.code).json(result)
  } catch (error) {
    next(error)
  }
}
