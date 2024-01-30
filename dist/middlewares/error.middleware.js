"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.genericErrorHandler = exports.appErrorHandler = exports.notFound = void 0;
/**
 * Error response middleware for 404 not found.
 * @date 1/15/2024 - 4:05:15 PM
 *
 * @export
 * @param {Request} req
 * @param {Response} res
 */
const notFound = (req, res) => {
    res.status(404).json({
        code: 404,
        message: 'route not found'
    });
};
exports.notFound = notFound;
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
const appErrorHandler = (err, req, res, next) => {
    if (err.code !== null && typeof err.code === 'number') {
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
            message: err.message
        });
    }
    else {
        next(err);
    }
};
exports.appErrorHandler = appErrorHandler;
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
const genericErrorHandler = (err, req, res, next) => {
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
        data: '',
        message: err.message
    });
};
exports.genericErrorHandler = genericErrorHandler;
