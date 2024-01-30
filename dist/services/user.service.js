"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPin = exports.loginUser = exports.registerNewUser = void 0;
const User_1 = __importDefault(require("../models/User"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const utils_1 = require("../utils");
const index_1 = __importDefault(require("../config/env/index"));
/**
 * register new wallet user
 * @date 1/15/2024 - 9:50:35 AM
 *
 * @async
 * @returns
 * @param firstname
 * @param surname
 * @param othernames
 * @param email
 * @param password
 * @param phonenumber
 */
const registerNewUser = async (firstname, surname, othernames, email, password, phonenumber) => {
    // check if the email exists in the db
    const duplicate = await User_1.default.findOne({ email }).exec();
    // if duplicate is not empty
    // return response
    if (duplicate !== null) {
        throw new utils_1.ErrorResponseProvider(409, 'failed', 'user already exists!');
    }
    // encrypt the password with a new salt
    const salt = bcrypt_1.default.genSaltSync(10);
    const hashedPwd = await bcrypt_1.default.hash(password, salt);
    // get accountNumber
    const accountNumber = utils_1.Utils.accountNumbers();
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
    const createUserResult = await User_1.default.create(newWalletUser);
    return {
        code: 201,
        status: 'success',
        message: 'wallet user created'
    };
};
exports.registerNewUser = registerNewUser;
const loginUser = async (email, password) => {
    // Check if that user is registered
    const registeredUser = await User_1.default.findOne({ email }).exec();
    // if the user is not registered throw an error
    if (!registeredUser) {
        throw new utils_1.ErrorResponseProvider(400, 'failed', 'invalid email or password');
    }
    // Compare user passwords
    const { password: dbPassword, _id, accountNumber } = registeredUser;
    const userPassword = await bcrypt_1.default.compare(password, dbPassword);
    if (!userPassword) {
        return {
            code: 401,
            status: 'failed',
            message: 'invalid email or password'
        };
    }
    const options = {
        expiresIn: process.env.JWT_EXPIRATION_TIME
    };
    // create token for authentication
    const token = jsonwebtoken_1.default.sign({
        _id,
        email
    }, index_1.default.JWT_SECRET_KEY, options);
    return utils_1.Utils.provideResponse(200, 'success', 'login success', {
        _id,
        email,
        token,
        accountNumber
    });
};
exports.loginUser = loginUser;
const createPin = async (req, res) => {
    const { pin } = req.body;
    const pinRegex = /^\d{4}$/;
    if (!pinRegex.test(pin)) {
        return res.status(400).json({
            message: "PIN must be a string containing a 4-digit number",
            status: "error",
        });
    }
    const saltRounds = 10;
    const hashedPin = bcrypt_1.default.hashSync(pin, saltRounds);
    const userData = req.data;
    await User_1.default.updateOne({ _id: userData._id }, { pin: hashedPin });
    const result = await User_1.default.findOne({ _id: userData._id });
    return res.status(200).json(result);
};
exports.createPin = createPin;
