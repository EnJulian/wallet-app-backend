"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transactionHistory = exports.accountSummary = exports.transferWalletFunds = exports.fundWallet = exports.walletBalance = void 0;
const wallet_service_1 = require("../services/wallet.service");
const wallet_service_2 = require("../services/wallet.service");
const utils_1 = require("../utils");
const walletBalance = async (req, res, next) => {
    try {
        const { accountNumber } = req.body;
        const result = await (0, wallet_service_1.fetchWalletBalance)(accountNumber);
        const { status, message, code, data } = result;
        utils_1.Utils.responseProvider(res, status, message, code);
    }
    catch (error) {
        next(error);
    }
};
exports.walletBalance = walletBalance;
/**
 * deposit money into account
 * @date 1/18/2024 - 23:17:55 pM
 *
 * @async
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns JSON object as response data
 */
const fundWallet = async (req, res, next) => {
    try {
        const { accountNumber, amount, wallet } = req.body;
        let transactionType;
        const result = await (0, wallet_service_1.depositFunds)(accountNumber, amount, wallet, transactionType = 'Wallet Deposit');
        return res.status(result.code).json(result);
    }
    catch (error) {
        next(error);
    }
};
exports.fundWallet = fundWallet;
/**
 * transfer money into another account
 * @date 1/21/2024 - 14:21:10 pM
 *
 * @async
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns JSON object as response data
 */
const transferWalletFunds = async (req, res, next) => {
    try {
        const { senderAccountNumber, receiverAccountNumber, amount, wallet } = req.body;
        let transactionType;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const result = await (0, wallet_service_1.transferFunds)(amount, senderAccountNumber, receiverAccountNumber, transactionType = 'Wallet Transfer', wallet);
        return res.status(result.code).json(result);
    }
    catch (error) {
        next(error);
    }
};
exports.transferWalletFunds = transferWalletFunds;
const accountSummary = async (req, res, next) => {
    try {
        const { accountNumber } = req.body;
        const result = await (0, wallet_service_1.fetchAccountSummary)(accountNumber);
        return res.status(result.code).json(result);
    }
    catch (error) {
        next(error);
    }
};
exports.accountSummary = accountSummary;
const transactionHistory = async (req, res, next) => {
    try {
        const { accountNumber } = req.body;
        const page = Number(req.query.page) || 0;
        const limit = Number(req.query.limit) || 5;
        const result = await (0, wallet_service_2.fetchTransactionHistory)(accountNumber, page, limit);
        return res.status(result.code).json(result);
    }
    catch (error) {
        next(error);
    }
};
exports.transactionHistory = transactionHistory;
