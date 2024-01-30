"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorResponseProvider = exports.Utils = void 0;
const Transactions_1 = __importDefault(require("../models/Transactions"));
const User_1 = __importDefault(require("../models/User"));
// Class for storing generic functions to be used in the entire code
class Utils {
    // Generic Functions
    static getRandomNumber(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min);
    }
    static accountNumbers() {
        const accountNumberLength = 11;
        const randomNumberArray = Array.from({ length: accountNumberLength }, () => _a.getRandomNumber(0, 9));
        return randomNumberArray.join('');
    }
}
exports.Utils = Utils;
_a = Utils;
// Wallet Functions
Utils.getWalletBalance = async (accountNumber) => {
    const walletBalance = await User_1.default.findOne({ accountNumber });
    const dollars = walletBalance.DollarWallet;
    const naira = walletBalance.NairaWallet;
    return { dollars, naira };
};
Utils.updateWalletBalance = async (accountNumber, accountType, amount) => {
    const filter = { accountNumber };
    // use dynamic key
    // const updateValue: Record<WalletType, string> = {}
    if (accountType === 'DollarWallet') {
        const updatedUserWallet = await User_1.default.findOneAndUpdate(filter, { DollarWallet: amount }, { new: true });
        return { "dollar": updatedUserWallet.DollarWallet };
    }
    if (accountType === 'NairaWallet') {
        const updatedUserWallet = await User_1.default.findOneAndUpdate(filter, { NairaWallet: amount }, { new: true });
        return { "naira": updatedUserWallet.NairaWallet };
    }
};
// Fetch queries
Utils.getAccountSummary = async (accountNumber) => {
    const transactionHistory = await User_1.default.aggregate([
        { $match: {
                accountNumber: accountNumber
            }
        },
        {
            $lookup: {
                from: "transactions",
                localField: "accountNumber",
                foreignField: "userAccountNumber",
                as: "summary",
            }
        },
        {
            $sort: {
                "summary.createdAt": -1
            }
        },
        {
            $project: {
                "firstname": 1,
                "surname": 1,
                "DollarWallet": 1,
                "NairaWallet": 1,
                recentTransactions: { $slice: ["$summary", 6] }
            }
        }
    ]);
    return transactionHistory;
};
Utils.getTransactionHistory = async (accountNumber, page, limit) => {
    const transactionHistory = await Transactions_1.default.aggregate([
        {
            $match: {
                userAccountNumber: accountNumber
            }
        },
        {
            $project: {
                "status": 1,
                "amount": 1,
                "wallet": 1,
                "transactionType": 1,
                "createdAt": 1,
            }
        },
        {
            $facet: {
                metadata: [
                    { $count: "totalTransactions" },
                    {
                        $addFields: {
                            pageNumber: page,
                            // remainingPages: { $ceil: {$divide:["$totalTransactions", limit]} }
                        }
                    },
                ],
                data: [{ $skip: (page - 1) * limit }, { $limit: limit }]
            }
        },
    ]);
    return transactionHistory;
};
// Response objects
Utils.responseProvider = (res, status, message, code) => {
    return res.status(code).json({ status, code, message });
};
Utils.provideResponse = (code, status, message, 
// eslint-disable-next-line @typescript-eslint/ban-types
data) => {
    return {
        code,
        status,
        message,
        data
    };
};
class ErrorResponseProvider extends Error {
    constructor(code, status, message) {
        super(message);
        this.code = code;
        this.status = status;
    }
}
exports.ErrorResponseProvider = ErrorResponseProvider;
