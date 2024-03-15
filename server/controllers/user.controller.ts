import { type NextFunction, type Request, type Response } from 'express'
import { loginUser, registerNewUser } from '../services/user.service'
import Logger from '../config/logger';

/**
 * register new wallet customer
 * @date 1/15/2024 - 9:50:35 AM
 *
 * @async
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns JSON object as response data
 */


export const createWalletUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      firstname,
      surname,
      othernames,
      email,
      password,
      phonenumber
    } = req.body
    Logger.info(`[CREATE_WALLET_USER] by ${email}`)
    const data = await registerNewUser(
      firstname,
      surname,
      othernames,
      email,
      password,
      phonenumber
    )
    res.status(data.code).json(data)
  } catch (error) {
    Logger.error(
      `[CREATE_WALLET_USER_FAILED]`,
      (error as Error).message
    );
    next(error)
  }
}

export const loginWalletUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body
    Logger.info(`[LOGIN_WALLET_USER] by ${email}`)
    const data = await loginUser( email, password)

    res.status(data.code).json(
      data
    )
  } catch (error) {
    Logger.error(
    `[LOGIN_WALLET_USER_FAILED]`,
    (error as Error).message,
    );
    next(error)
  }
}
