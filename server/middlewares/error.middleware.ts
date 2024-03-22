/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  type Request,
  type Response,
  type NextFunction,
  type ErrorRequestHandler
} from 'express'
import Logger from '../config/logger'

/**
 * Error response middleware for 404 not found.
 * @date 1/15/2024 - 4:05:15 PM
 *
 * @export
 * @param {Request} req
 * @param {Response} res
 */
export const notFound = (req: Request, res: Response) => {
  res.status(404).json({
    code: 404,
    message: 'route not found'
  })
}

/**
 *Error response middleware for handling all
 app errors except generic errors.
 *
 * @date 1/15/2024 - 4:05:15 PM
 * @export
 * @param {any} err
 * @param {Request} req
 * @param {Response} res

 */

export const appErrorHandler: ErrorRequestHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err.code !== null && typeof err.code === 'number') {
    Logger.error(`[APP_ERROR]`, err)

    res.status(err.code).json({
      code: err.code,
      message: err.message
    })
  } else {
    next(err)
  }
}

// Generic error response middleware
// for internal server errors.
/**
 * @date 1/15/2024 - 4:05:15 PM
 * @export
 * @param {any} err
 * @param {Request} req
 * @param {Request} req
 * @param {Response} res

 **/

export const genericErrorHandler: ErrorRequestHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction) => {
  Logger.error(`[GENERIC_ERROR]`, err)

  return res.status(500).json({
    code: 500,
    data: '',
    message: err.message,
    stack :process.env.NODE_ENV === 'production' ? null : err.stack,
  })
}
