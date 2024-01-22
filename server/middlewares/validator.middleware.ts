import { type Request, type Response, type NextFunction } from 'express'
import { responseProvider } from '../repository/response'
import validator from 'validator'

/**
 * validate user sign up inputs
 * @date 1/15/2024 - 9:50:35 AM
 *
 * @async
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {unknown}
 */

export const validateUserSignUpInput = (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      email, firstname, surname, othernames, password, phonenumber
    } = req.body

    if (typeof email !== 'string' || !validator.isEmail(email)) {
      return responseProvider(res, 'error','provide a valid email', 400)
    }

    if (typeof firstname !== 'string' || (firstname === '')) {
      return responseProvider(res, 'error', 'provide a valid firstname', 400)
    }

    if (typeof surname !== 'string' || (surname === '')) {
      return responseProvider(res, 'error','provide a valid surname', 400)
    }

    if (typeof othernames !== 'string') {
      return responseProvider(res,'error', 'provide valid othernames', 400)
    }

    if (typeof password !== 'string' || password.length < 8) {
      return responseProvider(res,'error', 'invalid password: the password is less than 8 characters', 400)
    }

    if (typeof phonenumber !== 'string' || !validator.isMobilePhone(phonenumber)) {
      return responseProvider(res,'error', 'provide a valid phone number', 400)
    }

    next()
  } catch (error) {
    next(error)
  }
}


export const validateLoginInput = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body

    if (!validator.isEmail(email)) {
      return responseProvider(res, 'error', 'invalid email and password', 400)
    }

    if (typeof password !== 'string' || password.length < 8) {
      return responseProvider(res, 'error','invalid email and password', 400)
    }

    next()
  } catch (error) {
    next(error)
  }
}
