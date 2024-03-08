import { type Request, type Response, type NextFunction } from 'express'
import { Utils } from '../utils'
import validator from 'validator'


const PASSWORD_VALIDATOR = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z\d]).*$/,)
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
      email, firstname, surname, password, phonenumber
    } = req.body

    if (typeof email !== 'string' || !validator.isEmail(email)) {
      return Utils.responseProvider(res, 'error','provide a valid email', 400, {})
    }

    if (typeof firstname !== 'string' || (firstname === '')) {
      return Utils.responseProvider(res, 'error', 'provide a valid firstname', 400, {})
    }
    if (typeof surname !== 'string' || (surname === '')) {
      return Utils.responseProvider(res, 'error','provide a valid surname', 400, {})
    }
    // if (typeof othernames !== 'string') {
    //   return Utils.responseProvider(res,'error', 'provide valid othernames', 400)
    // }

    if (!validator.isEmail(email)) {
      return Utils.responseProvider(res, 'error', 'invalid email and password', 400, {})
    }

    if (typeof password !== 'string' || password.length < 8) {
      return Utils.responseProvider(res,'error', 'invalid password: the password is less than 8 characters', 400, {})
    }
    
    if (!PASSWORD_VALIDATOR.test(password)) {
      return Utils.responseProvider(res,'error', 'invalid password: password must have at least a number, letter and a special character,  ', 400, {})
    }

    if (typeof phonenumber !== 'string' || !validator.isMobilePhone(phonenumber)) {
      return Utils.responseProvider(res,'error', 'provide a valid phone number', 400, {})
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
      return Utils.responseProvider(res, 'error', 'invalid email or password', 400, {})
    }

    if (typeof password !== 'string' || password.length < 8) {
      return Utils.responseProvider(res, 'error','invalid email or password', 400, {})
    }

    if (!PASSWORD_VALIDATOR.test(password)) {
      return Utils.responseProvider(res,'error', 'invalid password,  ', 400, {})
    }

    next()
  } catch (error) {
    next(error)
  }
}



export const validateFundWalletFundInputs = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { amount } = req.body

    if (typeof(amount) !== 'number' || amount < 1) {
      return Utils.responseProvider(res, 'error','invalid amount', 400, {})
    }

    next()
  } catch (error) {
    next(error)
  }
}


export const validateTransferFundsInputs = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { 
      pin,
      amount,
      receiverAccountNumber,
      } = req.body

    if (!pin || !validator.isNumeric(pin) || pin.length !== 4) {
      return Utils.responseProvider(res, 'error', 'invalid pin', 400, {})
    }

    if (!receiverAccountNumber || !validator.isNumeric(receiverAccountNumber) || receiverAccountNumber.length !== 11) {
      return Utils.responseProvider(res, 'error', 'invalid account number', 400, {})
    }

    if (!amount || typeof(amount) !== 'number' || amount < 1) {
      return Utils.responseProvider(res, 'error','invalid amount', 400, {})
    }

    next()
  } catch (error) {
    next(error)
  }
}




