"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchTransactionHistory = exports.fetchAccountSummary = exports.transferFunds = exports.depositFunds = exports.fetchWalletBalance = void 0;
const utils_1 = require("../utils");
const interfaces_1 = require("../interfaces");
const User_1 = __importDefault(require("../models/User"));
const Transactions_1 = __importDefault(require("../models/Transactions"));
const fetchWalletBalance = async (accountNumber) => {
    // TODO check if logged in/ token
    let currentWalletBalance;
    try {
        currentWalletBalance = await utils_1.Utils.getWalletBalance(accountNumber);
    }
    catch (error) {
        return utils_1.Utils.provideResponse(500, 'error', 'failed to fetch wallet balance', {});
    }
    if (!currentWalletBalance) {
        return utils_1.Utils.provideResponse(404, 'error', 'wallet balance not found', currentWalletBalance);
    }
    return utils_1.Utils.provideResponse(200, 'success', 'current account balance', currentWalletBalance);
};
exports.fetchWalletBalance = fetchWalletBalance;
const depositFunds = async (accountNumber, amount, wallet, transactionType) => {
    const walletCurrentBalance = await utils_1.Utils.getWalletBalance(accountNumber);
    if (wallet === 'dollar') {
        const { dollars } = walletCurrentBalance;
        const newAmount = dollars + amount;
        const updateBalance = await utils_1.Utils.updateWalletBalance(accountNumber, interfaces_1.WalletType.dollar, newAmount);
        if (updateBalance) {
            const depositFundTransaction = {
                userAccountNumber: accountNumber,
                status: 'Successful',
                wallet: interfaces_1.WalletType.dollar,
                transactionType: transactionType,
                amount: amount,
            };
            await Transactions_1.default.create(depositFundTransaction);
        }
        else {
            const depositFundTransaction = {
                userAccountNumber: accountNumber,
                status: 'Failed',
                wallet: interfaces_1.WalletType.dollar,
                transactionType: transactionType,
                amount: amount,
            };
            await Transactions_1.default.create(depositFundTransaction);
        }
        return utils_1.Utils.provideResponse(201, 'success', 'you account has been credited with', amount);
    }
    if (wallet === 'naira') {
        const { naira } = walletCurrentBalance;
        const newAmount = naira + amount;
        const updateBalance = await utils_1.Utils.updateWalletBalance(accountNumber, interfaces_1.WalletType.naira, newAmount);
        if (updateBalance) {
            const depositFundTransaction = {
                userAccountNumber: accountNumber,
                status: 'Successful',
                wallet: interfaces_1.WalletType.naira,
                transactionType: transactionType,
                amount: amount,
            };
            await Transactions_1.default.create(depositFundTransaction);
        }
        else {
            const depositFundTransaction = {
                userAccountNumber: accountNumber,
                status: 'Failed',
                wallet: interfaces_1.WalletType.naira,
                transactionType: transactionType,
                amount: amount,
            };
            await Transactions_1.default.create(depositFundTransaction);
        }
        return utils_1.Utils.provideResponse(201, 'success', 'you account has been credited with', amount);
    }
    return utils_1.Utils.provideResponse(400, 'error', 'invalid account', {});
};
exports.depositFunds = depositFunds;
//TODO work on transfer transaction
/**
 * transfer funds into another wallet
 * @date 1/15/2024 - 9:50:35 AM
 *
 * @async
 * @returns JSON object as response data
 * @param amount
 * @param senderAccountNumber
 * @param receiverAccountNumber
 * @param transactionType
 * @param wallet
 */
const transferFunds = async (amount, senderAccountNumber, receiverAccountNumber, transactionType, wallet) => {
    // TODO check if the receiver exists in db before transaction
    const receiverExists = await User_1.default.findOne({ accountNumber: receiverAccountNumber });
    if (!receiverExists) {
        return utils_1.Utils.provideResponse(400, 'error', 'invalid account', {});
    }
    const [senderCurrentBalance, receiverCurrentBalance] = await Promise.all([
        utils_1.Utils.getWalletBalance(senderAccountNumber),
        utils_1.Utils.getWalletBalance(receiverAccountNumber)
    ]);
    if (wallet === 'dollar') {
        const { dollars } = senderCurrentBalance;
        if (amount > dollars) {
            return utils_1.Utils.provideResponse(400, 'error', 'insufficient funds', {});
        }
        const newReceiverAmount = amount + receiverCurrentBalance.dollars;
        const newSenderAmount = dollars - amount;
        const updateReceiverBalance = await utils_1.Utils.updateWalletBalance(receiverAccountNumber, interfaces_1.WalletType.dollar, newReceiverAmount);
        const updateSenderBalance = await utils_1.Utils.updateWalletBalance(senderAccountNumber, interfaces_1.WalletType.dollar, newSenderAmount);
        const transferFundTransaction = {
            userAccountNumber: senderAccountNumber,
            status: updateReceiverBalance && updateSenderBalance ? 'Successful' : 'Failed',
            wallet: interfaces_1.WalletType.dollar,
            transactionType: transactionType,
            amount: amount,
        };
        await Transactions_1.default.create(transferFundTransaction);
        const transferHistory = {
            "amount_sent": amount,
            "current_balance": updateSenderBalance === null || updateSenderBalance === void 0 ? void 0 : updateSenderBalance.dollar
        };
        return utils_1.Utils.provideResponse(201, 'success', 'funds transferred', transferHistory);
    }
    if (wallet === 'naira') {
        const { naira } = senderCurrentBalance;
        if (amount > naira) {
            return utils_1.Utils.provideResponse(400, 'error', 'insufficient funds', {});
        }
        const newReceiverAmount = amount + receiverCurrentBalance.naira;
        const newSenderAmount = naira - amount;
        const updateReceiverBalance = await utils_1.Utils.updateWalletBalance(receiverAccountNumber, interfaces_1.WalletType.naira, newReceiverAmount);
        const updateSenderBalance = await utils_1.Utils.updateWalletBalance(senderAccountNumber, interfaces_1.WalletType.naira, newSenderAmount);
        const transferFundTransaction = {
            userAccountNumber: senderAccountNumber,
            status: updateReceiverBalance && updateSenderBalance ? 'Successful' : 'Failed',
            wallet: interfaces_1.WalletType.naira,
            transactionType: transactionType,
            amount: amount,
        };
        await Transactions_1.default.create(transferFundTransaction);
        const transferHistory = {
            "amount_sent": amount,
            "current_balance": updateSenderBalance === null || updateSenderBalance === void 0 ? void 0 : updateSenderBalance.naira
        };
        return utils_1.Utils.provideResponse(201, 'success', 'funds transferred', transferHistory);
    }
};
exports.transferFunds = transferFunds;
const fetchAccountSummary = async (accountNumber) => {
    // TODO check if logged in/ token
    const transactionHistory = await utils_1.Utils.getAccountSummary(accountNumber);
    return utils_1.Utils.provideResponse(200, 'success', 'account summary', transactionHistory);
};
exports.fetchAccountSummary = fetchAccountSummary;
const fetchTransactionHistory = async (accountNumber, page, limit) => {
    // TODO check if logged in/ token
    const transactionHistory = await utils_1.Utils.getTransactionHistory(accountNumber, page, limit);
    return utils_1.Utils.provideResponse(200, 'success', 'transaction history', transactionHistory);
};
exports.fetchTransactionHistory = fetchTransactionHistory;
