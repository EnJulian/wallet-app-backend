"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchUsers = exports.getTransactions = void 0;
const Transactions_1 = __importDefault(require("../models/Transactions"));
const User_1 = __importDefault(require("../models/User"));
const getTransactions = async (req, res) => {
    try {
        const filter = {};
        if (req.query.transactionType) {
            filter["transactionType"] = req.query.transactionType;
        }
        if (req.query.startDate && req.query.endDate) {
            filter["CreatedAt"] = {
                $gte: new Date(req.query.startDate),
                $lte: new Date(req.query.endDate),
            };
        }
        if (req.query.transactionStatus) {
            filter["transactionStatus"] = req.query.transactionStatus;
            return res.status(200).json({ message: 'Transactions fetched successfully', status: 'error' });
        }
        const transactions = await Transactions_1.default.find(filter);
        return res.status(200).json({ message: 'Transactions fetched successfully', status: 'success', data: transactions });
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.getTransactions = getTransactions;
const searchUsers = async (req, res) => {
    try {
        const searchQuery = {};
        if (req.query.firstname) {
            // Case-insensitive search by name
            searchQuery["firstname"] = { $regex: new RegExp(req.query.firstname, 'i') };
        }
        const searchResults = await User_1.default.find(searchQuery);
        // res.json(searchResults);
        return res.status(200).json({ message: 'Details status searched successfully', status: 'success', data: searchResults });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
};
exports.searchUsers = searchUsers;
