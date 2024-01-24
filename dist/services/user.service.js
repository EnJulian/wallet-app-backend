"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.createNewUser = void 0;
const User_1 = __importDefault(require("../models/User"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const response_1 = require("../repository/response");
const generateAccountNumbers_1 = require("../repository/generateAccountNumbers");
const index_1 = __importDefault(require("../config/env/index"));
/**
 * register new wallet user
 * @date 1/15/2024 - 9:50:35 AM
 *
 * @async
 * @param {Request} req
 * @returns
 */
const createNewUser = (firstname, surname, othernames, email, password, phonenumber) => __awaiter(void 0, void 0, void 0, function* () {
    // check if the email exists in the db
    const duplicate = yield User_1.default.findOne({ email }).exec();
    // if duplicate is not empty
    // throw error
    if (duplicate !== null) {
        throw new response_1.ErrorResponseProvider(409, 'failed', 'user already exists!');
    }
    // encrypt the password
    const hashedPwd = yield bcrypt_1.default.hash(password, 10);
    // get accountNumber
    const accountNumber = (0, generateAccountNumbers_1.accountNumbers)();
    // create and store the new wallet user
    const newWalletUser = {
        firstname,
        surname,
        othernames,
        email,
        password: hashedPwd,
        phonenumber,
        accountNumber
    };
    const createUserResult = yield User_1.default.create(newWalletUser);
    return {
        code: 201,
        status: 'success',
        message: 'wallet user created',
        data: { email: createUserResult }
    };
});
exports.createNewUser = createNewUser;
const loginUser = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    // Check if that user is registered
    const registeredUser = yield User_1.default.findOne({ email }).exec();
    // if the user is not registered throw an error
    if (registeredUser === null) {
        throw new response_1.ErrorResponseProvider(400, 'failed', 'invalid email or password');
    }
    // Compare user passwords
    const { password: dbPassword, _id, accountNumber } = registeredUser;
    const userPassword = bcrypt_1.default.compareSync(password, dbPassword);
    if (!userPassword) {
        return {
            code: 401,
            status: 'failed',
            message: 'invalid email or password'
        };
    }
    const options = {
        expiresIn: '1d'
    };
    // create token for authentication
    const token = jsonwebtoken_1.default.sign({
        _id,
        email
    }, index_1.default.JWT_SECRET_KEY, options);
    return (0, response_1.provideResponse)(200, 'success', 'login success', {
        _id,
        email,
        token,
        accountNumber
    });
});
exports.loginUser = loginUser;
