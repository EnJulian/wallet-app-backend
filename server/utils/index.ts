// utils.ts
import { WalletType, TransactionStatus } from '../interfaces'
import Transactions from '../models/Transactions'
import { type Response } from 'express'
import User from "../models/User";


// Class for storing generic functions to be used in the entire code
export class Utils {
    
    // Generic Functions
    static getRandomNumber(min: number, max: number): number {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min);
    }

    static accountNumbers(): string {
        const accountNumberLength = 11;
        const randomNumberArray = Array.from({ length: accountNumberLength }, () => Utils.getRandomNumber(0, 9));
        return randomNumberArray.join('');
    }

    // Wallet Functions
    static  getWalletBalance = async (accountNumber: string) => {
        const walletBalance = await User.findOne({ accountNumber })
        const dollars = walletBalance!.DollarWallet
        const naira = walletBalance!.NairaWallet
        return { dollars, naira }

    }

    static updateWalletBalance = async (
        accountNumber: string,
        accountType: WalletType,
        amount: number) => {

        const filter = { accountNumber }

        // use dynamic key
        // const updateValue: Record<WalletType, string> = {}

        if (accountType === 'DollarWallet') {
            const updatedUserWallet = await User.findOneAndUpdate(filter, { DollarWallet: amount }, { new: true })
            return { "dollar": updatedUserWallet!.DollarWallet }
        }

        if (accountType === 'NairaWallet') {
            const updatedUserWallet = await User.findOneAndUpdate(filter, { NairaWallet: amount }, { new: true })
            return { "naira": updatedUserWallet!.NairaWallet }
        }
    }
    
    // Fetch queries
    static getAccountSummary = async (accountNumber: string) => {

        const transactionHistory = await User.aggregate([

            {$match: {
                    accountNumber: accountNumber
                }
            },
            {
                $lookup:
                    {
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
                    recentTransactions: { $slice: ["$summary", 6]}
                }
            }
        ])


        return transactionHistory
    }

    static getTransactionHistory = async (accountNumber: string, page: number, limit: number) => {

        const transactionHistory = await Transactions.aggregate([
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
                        { $count: "totalTransactions"},
                        {
                            $addFields:{
                                pageNumber: page,
                                // remainingPages: { $ceil: {$divide:["$totalTransactions", limit]} }
                            }
                        },
                    ],
                    data: [{ $skip: (page - 1) * limit }, { $limit: limit}]
                }
            },
        ])

        return transactionHistory
    }
    
    // Response objects
    static responseProvider = (
        res: Response,
        status: string,
        message: string,
        code: number
    ) => {
        return res.status(code).json({ status, code, message })
    }
        

    static provideResponse = (
        code: number,
        status: string,
        message: string,
        // eslint-disable-next-line @typescript-eslint/ban-types
        data: Object
    ) => {
        return {
            code,
            status,
            message,
            data
        }
    }
    
}

export class ErrorResponseProvider extends Error {
    code: number
    status: string
    constructor (code: number, status: string, message: string) {
        super(message)
        this.code = code
        this.status = status
    }
}

