import { type NextFunction, type Request, type Response } from 'express'
import { createNewUser, loginUser  } from '../services/user.service'

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

    const data = await createNewUser(
      firstname,
      surname,
      othernames,
      email,
      password,
      phonenumber
    )
    res.status(data.code).json(data)
  } catch (error) {
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
    next(error)
  }
}
