// controllers/transactionController.ts
import { Request, Response } from "express";
import mongoose from "mongoose";
import Transaction from "../models/Transactions";
import User from "../models/User"



export const getTransactions = async (req: Request, res: Response) => {
  try {
    const filter: any = {};
     console.log(filter);

    if (req.query.transactionType) {
      filter["transactionType"] = req.query.transactionType;
    console.log(filter.transactionType);
    }

  if (req.query.startDate && req.query.endDate) {
     filter["CreatedAt"] = {
         $gte:new Date(req.query.startDate as string),
        $lte: new Date(req.query.endDate as string),
      };
      console.log(filter.date);
    }

  if (req.query.transactionStatus) {
     filter["transactionStatus"] = req.query.transactionStatus;
     console.log(filter.transactionStatus);
     return res.status(200).json({ message: 'Transaction status fetched successfully', status: 'error' });
 }

    const transactions = await Transaction.find(filter);
    return res.status(200).json({ message: 'Transaction status fetched successfully', status: 'success', data: transactions });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};


export const searchUsers = async (req: Request, res: Response) => {
  try {
    const searchQuery: any = {};

    if (req.query.firstname) {
      // Case-insensitive search by name
      searchQuery["firstname"] = { $regex: new RegExp(req.query.firstname as string, 'i') };
      
    }

    const searchResults = await User.find(searchQuery);
    // res.json(searchResults);
        return res.status(200).json({ message: 'Details status searched successfully', status: 'success', data: searchResults });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error', details:(error as Error).message });
  }
};