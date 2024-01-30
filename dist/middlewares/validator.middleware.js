"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateTransferFundsInputs = exports.validateFundWalletFundInputs = exports.validateLoginInput = exports.validateUserSignUpInput = void 0;
const utils_1 = require("../utils");
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
            return utils_1.Utils.responseProvider(res, 'error', 'provide a valid email', 400);
        }
        if (typeof firstname !== 'string' || (firstname === '')) {
            return utils_1.Utils.responseProvider(res, 'error', 'provide a valid firstname', 400);
        }
        if (typeof surname !== 'string' || (surname === '')) {
            return utils_1.Utils.responseProvider(res, 'error', 'provide a valid surname', 400);
        }
        if (typeof othernames !== 'string') {
            return utils_1.Utils.responseProvider(res, 'error', 'provide valid othernames', 400);
        }
        if (!validator_1.default.isEmail(email)) {
            return utils_1.Utils.responseProvider(res, 'error', 'invalid email and password', 400);
        }
        if (typeof password !== 'string' || password.length < 8) {
            return utils_1.Utils.responseProvider(res, 'error', 'invalid password: the password is less than 8 characters', 400);
        }
        if (typeof phonenumber !== 'string' || !validator_1.default.isMobilePhone(phonenumber)) {
            return utils_1.Utils.responseProvider(res, 'error', 'provide a valid phone number', 400);
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
            return utils_1.Utils.responseProvider(res, 'error', 'invalid email and password', 400);
        }
        if (typeof password !== 'string' || password.length < 8) {
            return utils_1.Utils.responseProvider(res, 'error', 'invalid email and password', 400);
        }
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.validateLoginInput = validateLoginInput;
const validateFundWalletFundInputs = (req, res, next) => {
    try {
        const { accountNumber, amount } = req.body;
        if (!validator_1.default.isNumeric(accountNumber) || accountNumber.length < 11) {
            return utils_1.Utils.responseProvider(res, 'error', 'invalid account number', 400);
        }
        if (typeof (amount) !== 'number' || amount < 1) {
            return utils_1.Utils.responseProvider(res, 'error', 'invalid amount', 400);
        }
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.validateFundWalletFundInputs = validateFundWalletFundInputs;
const validateTransferFundsInputs = (req, res, next) => {
    try {
        const { senderAccountNumber, 
        // wallet,
        amount, receiverAccountNumber, } = req.body;
        if (!validator_1.default.isNumeric(senderAccountNumber) || senderAccountNumber.length !== 11) {
            return utils_1.Utils.responseProvider(res, 'error', 'invalid account number', 400);
        }
        if (!validator_1.default.isNumeric(receiverAccountNumber) || receiverAccountNumber.length !== 11) {
            return utils_1.Utils.responseProvider(res, 'error', 'invalid account number', 400);
        }
        if (typeof (amount) !== 'number' || amount < 1) {
            return utils_1.Utils.responseProvider(res, 'error', 'invalid amount', 400);
        }
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.validateTransferFundsInputs = validateTransferFundsInputs;
