import { type Request, type Response, type NextFunction } from 'express'
import { responseProvider } from '../repository/response'
import validator from 'validator'

// import { WalletType } from '../../helper/transactionsDataType'


/**
 * Description placeholder
 * @date 1/22/2024 - 6:37:28 PM
 *
 * @param {Response} res
 * @param {string} userInput
 * @param {string} msg
 * @returns {*}
 */
function stringInputValidator(res: Response, userInput: string, msg: string){
  if (!userInput) {
    return responseProvider(res, 'error',msg, 400)
  }
}


/**
 * Description placeholder
 * @date 1/22/2024 - 6:37:28 PM
 *
 * @param {Response} res
 * @param {number} amount
 * @returns {*}
 */
function validateAmount(res: Response, amount: number){
  if (amount < 1) {
    return responseProvider(res, 'error','invalid amount', 400)
  }
}



/**
 * Description placeholder
 * @date 1/22/2024 - 6:37:28 PM
 *
 * @param {Response} res
 * @param {string} accountNumber
 * @returns {*}
 */
function validateAccountNumbers(res: Response, accountNumber: string){
  if (!validator.isNumeric(accountNumber) || accountNumber.length !== 12) {
    return responseProvider(res, 'error', 'invalid account number', 400)
  }

}


/**
 * Description placeholder
 * @date 1/22/2024 - 6:37:28 PM
 *
 * @param {Response} res
 * @param {string} password
 * @returns {*}
 */
function validateInputPasswords(res: Response, password: string){
  if (password.length < 8) {
    return responseProvider(res,'error', 'invalid password: the password is less than 8 characters', 400)
  }
}


/**
 * Description placeholder
 * @date 1/22/2024 - 6:37:28 PM
 *
 * @param {Response} res
 * @param {string} phonenumber
 * @returns {*}
 */
function validatePhoneNumbers(res: Response, phonenumber: string){
  if (!validator.isMobilePhone(phonenumber)) {
    return responseProvider(res,'error', 'provide a valid phone number', 400)
  }

}

/**
 * Description placeholder
 * @date 1/22/2024 - 6:37:28 PM
 *
 * @param {Response} res
 * @param {string} email
 * @returns {*}
 */
function validateEmail(res: Response, email: string){
  if (!validator.isEmail(email)) {
    return responseProvider(res, 'error','provide a valid email', 400)
  }
}


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

    // if (typeof email !== 'string' || !validator.isEmail(email)) {
    //   return responseProvider(res, 'error','provide a valid email', 400)
    // }

    validateEmail(res, email)
    // if (typeof firstname !== 'string' || (firstname === '')) {
    //   return responseProvider(res, 'error', 'provide a valid firstname', 400)

    // }

    stringInputValidator(res, firstname, 'provide a valid firstname')

    // if (typeof surname !== 'string' || (surname === '')) {
    //   return responseProvider(res, 'error','provide a valid surname', 400)
    // }


    stringInputValidator(res, surname, 'provide a valid surname')



    // if (typeof othernames !== 'string') {
    //   return responseProvider(res,'error', 'provide valid othernames', 400)
    // }

    stringInputValidator(res, othernames, 'provide a valid othername(s)')


    // if (typeof password !== 'string' || password.length < 8) {
    //   return responseProvider(res,'error', 'invalid password: the password is less than 8 characters', 400)
    // }

    validateInputPasswords(res, password)

    // if (typeof phonenumber !== 'string' || !validator.isMobilePhone(phonenumber)) {
    //   return responseProvider(res,'error', 'provide a valid phone number', 400)
    // }

    validatePhoneNumbers(res, phonenumber)

    next()
  } catch (error) {
    next(error)
  }
}


export const validateLoginInput = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body

    // if (!validator.isEmail(email)) {
    //   return responseProvider(res, 'error', 'invalid email and password', 400)
    // }

    validateEmail(res, email)

    // if (typeof password !== 'string' || password.length < 8) {
    //   return responseProvider(res, 'error','invalid email and password', 400)
    // }

    validateInputPasswords(res, password)

    next()
  } catch (error) {
    next(error)
  }
}



export const validateFundWalletFundInputs = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { accountNumber, amount } = req.body

    // if (!validator.isNumeric(accountNumber) || accountNumber.length < 11) {
    //   return responseProvider(res, 'error', 'invalid account number', 400)
    // }

    validateAccountNumbers(res, accountNumber)

    // if (typeof(amount) !== 'number' || amount < 1) {
    //   return responseProvider(res, 'error','invalid amount', 400)
    // }

    validateAmount(res, amount)

    // if ( wallet !==  'dollar' || wallet !==  'naira') {
    //   return responseProvider(res, 'error','invalid wallet selected!', 400)
    // }

    next()
  } catch (error) {
    next(error)
  }
}


export const validateTransferFundsInputs = (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      senderAccountNumber,
      // wallet,
      amount,
      receiverAccountNumber,
    } = req.body

    // if (!validator.isNumeric(senderAccountNumber) || senderAccountNumber.length !== 11) {
    //   return responseProvider(res, 'error', 'invalid account number', 400)
    // }

    validateAccountNumbers(res, senderAccountNumber)

    // if (!validator.isNumeric(receiverAccountNumber) || receiverAccountNumber.length !== 11) {
    //   return responseProvider(res, 'error', 'invalid account number', 400)
    // }

    validateAccountNumbers(res, receiverAccountNumber)

    // if (typeof(amount) !== 'number' || amount === 0) {
    //   return responseProvider(res, 'error','invalid amount', 400)
    // }

    validateAmount(res, amount)

    // if ( wallet !==  'dollar' || wallet !==  'naira') {
    //   return responseProvider(res, 'error','invalid wallet selected!', 400)
    // }

    next()
  } catch (error) {
    next(error)
  }
}




