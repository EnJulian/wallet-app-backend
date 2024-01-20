import { type Response } from 'express'

// response provider for middlewares
/**
 * format error messages
 * @date 1/15/2024 - 12:26:30 PM
 *
 * @param {*} res
 * @param {*} code
 * @param {*} message
 * @returns {*}
 */

export const responseProvider = (
  res: Response,
  status: string,
  message: string,
  code: number
) => {
  return res.status(code).json({ status, code, message })
}

/**
 * services response provider
 * @date 1/15/2024 - 12:26:30 PM
 *
 * @param {*} status
 * @param {*} message
 * @param {*} data
 * @returns JSON Record<string, unknown> as response data
 */

export const provideResponse = (
  code: number,
  status: string,
  message: string,
  // eslint-disable-next-line @typescript-eslint/ban-types
  data: Object
) => {
  return {
    code,
    status,
    message,
    data
  }
}

export class ErrorResponseProvider extends Error {
  code: number
  status: string
  constructor (code: number, status: string, message: string) {
    super(message)
    this.code = code
    this.status = status
  }
}

