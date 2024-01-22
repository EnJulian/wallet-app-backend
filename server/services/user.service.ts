import User from '../models/User'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {
  provideResponse,
  ErrorResponseProvider
} from '../repository/response'
import { accountNumbers } from '../repository/generateAccountNumbers'
import { type UserDataType } from '../repository/userDataType'
import config from '../config/env/index'

/**
 * register new wallet user
 * @date 1/15/2024 - 9:50:35 AM
 *
 * @async
 * @param {Request} req
 * @returns
 */

export const createNewUser = async (
  firstname: string,
  surname: string,
  othernames: string,
  email: string,
  password: string,
  phonenumber: string
) => {
  // check if the email exists in the db
  const duplicate = await User.findOne({ email }).exec()
  // if duplicate is not empty
  // throw error
  if (duplicate !== null) {
    throw new ErrorResponseProvider(
      409,
      'failed',
      'user already exists!'
    )
  }

  // encrypt the password
  const hashedPwd = await bcrypt.hash(password, 10)

  // get accountNumber
  const accountNumber: string = accountNumbers()
  
  // create and store the new wallet user
  const newWalletUser: UserDataType = {
    firstname,
    surname,
    othernames,
    email,
    password: hashedPwd,
    phonenumber,
    accountNumber
  }


  const createUserResult = await User.create(newWalletUser)

  return {
    code: 201,
    status: 'success',
    message: 'wallet user created',
    data: createUserResult 

  }
}

export const loginUser = async (email: string, password: string ) => {

  // Check if that user is registered
  const registeredUser = await User.findOne({ email }).exec()

  // if the user is not registered throw an error
  if (registeredUser === null) {
    throw new ErrorResponseProvider(
      400,
      'failed',
      'invalid email or password'
    )
  }

  // Compare user passwords
  const { password: dbPassword, _id, accountNumber } = registeredUser

  const userPassword = bcrypt.compareSync(password, dbPassword)
  if (!userPassword) {
    return {
      code: 401,
      status: 'failed',
      message: 'invalid email or password'
    }
  }

  const options = {
    expiresIn: '1d'
  }

  // create token for authentication
  const token = jwt.sign(
    {
      _id,
      email
    },
    config.JWT_SECRET_KEY,
    options
  )

  return provideResponse(
    200,
    'success',
    'login success',
    {
      _id,
      email,
      token,
      accountNumber
    }
  )
}
