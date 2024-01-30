"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginWalletUser = exports.createWalletUser = void 0;
const user_service_1 = require("../services/user.service");
/**
 * register new wallet customer
 * @date 1/15/2024 - 9:50:35 AM
 *
 * @async
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns JSON object as response data
 */
const createWalletUser = async (req, res, next) => {
    try {
        const { firstname, surname, othernames, email, password, phonenumber } = req.body;
        const data = await (0, user_service_1.registerNewUser)(firstname, surname, othernames, email, password, phonenumber);
        res.status(data.code).json(data);
    }
    catch (error) {
        next(error);
    }
};
exports.createWalletUser = createWalletUser;
const loginWalletUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const data = await (0, user_service_1.loginUser)(email, password);
        res.status(data.code).json(data);
    }
    catch (error) {
        next(error);
    }
};
exports.loginWalletUser = loginWalletUser;
