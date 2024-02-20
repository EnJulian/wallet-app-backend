// utils.ts
import { WalletType, Transaction } from '../interfaces'
import Transactions from '../models/Transactions'
import { type Response } from 'express'
import User from "../models/User";
import mongoose from 'mongoose';


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

    // fetch user account number 
    static fetchUserAccountDetails = async(_id: string) => {
        const userAccountNumber = await User.findOne({ _id })
        return userAccountNumber

    }

    // Wallet Functions
    static  getWalletBalance = async (_id: string) => {
        const walletBalance = await User.findOne({ _id })
        const dollars = walletBalance!.DollarWallet
        const naira = walletBalance!.NairaWallet
        return { dollars, naira }

    }

    static  getWalletBalanceByAccountNumber = async (accountNumber: string) => {
        const walletBalance = await User.findOne({ accountNumber })
        const dollars = walletBalance!.DollarWallet
        const naira = walletBalance!.NairaWallet
        return { dollars, naira }

    }

    static updateWalletBalance = async (
        _id: string,
        accountType: WalletType,
        amount: number) => {

        const filter = { _id }

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
    

    static updateWalletBalanceByAccountNumber = async (
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
    

    // convert _id to ObjectId
    static convertUserId = (userId: string) => {
        const matchId = new mongoose.Types.ObjectId(userId)
        return matchId
    }

    // Fetch queries
    static getAccountSummary = async (userId: string) => {

        const id = Utils.convertUserId(userId)

        const transactionHistory = await User.aggregate([

            {$match: {
                    "_id": id
                }
            },
            {
                $lookup:
                    {
                        from: "transactions",
                        localField: "_id",
                        foreignField: "userId",
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

        return { ... transactionHistory }
    }

    static getTransactionHistory = async (userId: string, page: number, limit: number) => {
        
        const id = Utils.convertUserId(userId)

        const transactionHistory = await Transactions.aggregate([
            {
                $match: {
                    userId: id
                }
            },

            {
                $project: {
                    "status": 1,
                    "amount": 1,
                    "wallet": 1,
                    "transactionType": 1,
                    "createdAt": 1,
                    "currency": 1,
                }
            },
            {
                $facet: {
                    metadata: [
                        { $count: "totalTransactions"},
                        {
                            $addFields:{
                                pageNumber: page,
                                remainingPages: { $ceil: {$divide:["$totalTransactions", limit]} }
                            }
                        },
                    ],
                    transactions: [{ $skip: (page - 1) * limit }, { $limit: limit}]
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
        code: number,
         // eslint-disable-next-line @typescript-eslint/ban-types
        data: Object
    ) => {
        return res.status(code).json({ status, code, message, data })
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

    // returns code, status and message 
    static formatResponseStatus  = (transaction: Transaction) => {

        const { code, status, message } = transaction

        return { code, status, message } 
    }

      // returns transaction history
    static formatTransactionHistory = (response: Transaction) => {
        const fetchData  =  response["data"]
        const transactions = fetchData["transactions" as keyof typeof fetchData]
        return { transactions }
    }


    // returns transaction history metadata
    static formatMetaData = (response: Transaction) => {

        const fetchData  =  response["data"]

        const getMetaData = {... fetchData["metadata" as keyof typeof fetchData] }
    
        const metadata = getMetaData["0" as keyof typeof getMetaData]
    
        return { metadata }
        
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

