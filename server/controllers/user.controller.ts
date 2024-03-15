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
      'Error: an error occurred while creating user wallet user.controller::createWalletUser',
      error
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
    
    const data = await loginUser( email, password)

    res.status(data.code).json(
      data
    )
  } catch (error) {
    Logger.error(
      'Error: an error occurred while logging user in user.controller::loginWalletUser',
      error,
    );
    next(error)
  }
}
