import {
  type Request,
  type Response,
  type NextFunction,
  type ErrorRequestHandler,
} from "express";

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
    message: "route not found",
  });
};

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
  if (err.code !== null && typeof err.code === "number") {
    // TODO remove console.log replace with logging
    console.log(`
      status - ${err.code}
      message - ${err.message} 
      url - ${req.originalUrl} 
      method - ${req.method} 
      IP - ${req.ip}
    `);

    res.status(err.code).json({
      code: err.code,
      message: err.message,
    });
  } else {
    next(err);
  }
};

// Generic error response middleware
// for internal server errors.
/**
 * Description placeholder
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
  res: Response
) => {
  // TODO remove console.log replace with logging
  console.log(`
    status - 500 
    message - ${err.stack} 
    url - ${req.originalUrl} 
    method - ${req.method} 
    IP - ${req.ip}
  `);

  res.status(500).json({
    code: 500,
    data: "",
    message: err.message,
  });
};
