"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorResponseProvider = exports.provideResponse = exports.responseProvider = void 0;
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
const responseProvider = (res, status, message, code) => {
    return res.status(code).json({ status, code, message });
};
exports.responseProvider = responseProvider;
/**
 * services response provider
 * @date 1/15/2024 - 12:26:30 PM
 *
 * @param {*} status
 * @param {*} message
 * @param {*} data
 * @returns JSON Record<string, unknown> as response data
 */
const provideResponse = (code, status, message, 
// eslint-disable-next-line @typescript-eslint/ban-types
data) => {
    return {
        code,
        status,
        message,
        data
    };
};
exports.provideResponse = provideResponse;
class ErrorResponseProvider extends Error {
    constructor(code, status, message) {
        super(message);
        this.code = code;
        this.status = status;
    }
}
exports.ErrorResponseProvider = ErrorResponseProvider;
