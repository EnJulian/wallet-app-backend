"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateLoginInput = exports.validateUserSignUpInput = void 0;
const response_1 = require("../repository/response");
const validator_1 = __importDefault(require("validator"));
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
const validateUserSignUpInput = (req, res, next) => {
    try {
        const { email, firstname, surname, othernames, password, phonenumber } = req.body;
        if (typeof email !== 'string' || !validator_1.default.isEmail(email)) {
            return (0, response_1.responseProvider)(res, 'error', 'provide a valid email', 400);
        }
        if (typeof firstname !== 'string' || (firstname === '')) {
            return (0, response_1.responseProvider)(res, 'error', 'provide a valid firstname', 400);
        }
        if (typeof surname !== 'string' || (surname === '')) {
            return (0, response_1.responseProvider)(res, 'error', 'provide a valid surname', 400);
        }
        if (typeof othernames !== 'string') {
            return (0, response_1.responseProvider)(res, 'error', 'provide valid othernames', 400);
        }
        if (typeof password !== 'string' || password.length < 8) {
            return (0, response_1.responseProvider)(res, 'error', 'invalid password: the password is less than 8 characters', 400);
        }
        if (typeof phonenumber !== 'string' || !validator_1.default.isMobilePhone(phonenumber)) {
            return (0, response_1.responseProvider)(res, 'error', 'provide a valid phone number', 400);
        }
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.validateUserSignUpInput = validateUserSignUpInput;
const validateLoginInput = (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!validator_1.default.isEmail(email)) {
            return (0, response_1.responseProvider)(res, 'error', 'invalid email and password', 400);
        }
        if (typeof password !== 'string' || password.length < 8) {
            return (0, response_1.responseProvider)(res, 'error', 'invalid email and password', 400);
        }
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.validateLoginInput = validateLoginInput;
