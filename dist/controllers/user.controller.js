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
const createWalletUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstname, surname, othernames, email, password, phonenumber } = req.body;
        const data = yield (0, user_service_1.createNewUser)(firstname, surname, othernames, email, password, phonenumber);
        res.status(data.code).json(data);
    }
    catch (error) {
        next(error);
    }
});
exports.createWalletUser = createWalletUser;
const loginWalletUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const data = yield (0, user_service_1.loginUser)(email, password);
        res.status(data.code).json(data);
    }
    catch (error) {
        next(error);
    }
});
exports.loginWalletUser = loginWalletUser;
