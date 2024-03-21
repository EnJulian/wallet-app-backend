/* eslint-disable @typescript-eslint/no-explicit-any */
// controllers/transactionController.ts
import { Request, Response } from "express";
import User from "../models/User";
import Transactions from "../models/Transactions";
import Logger from "../config/logger";

export const getTransactions = async (req: Request, res: Response) => {
  try {
    // Fetch userId from request
    const userId = (req as any).userId;

    Logger.info(`[GET_TRANSACTIONS] by ${userId}`)

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        status: "error",
      });
    }

    // Initialize filter with user ID
    const filter: any = { userId: userId };

    // Apply filtering conditions
    if (req.query.transactionType) {
      filter["transactionType"] = req.query.transactionType;
    }

    if (req.query.startDate) {
      const startDate = new Date(req.query.startDate as string);
      startDate.setHours(0, 0, 0, 0); // Set time to start of the day (midnight)
      filter.createdAt = {
        $gte: startDate,
      };

    }

    if (req.query.endDate) {
      const endDate = new Date(req.query.endDate as string);
      endDate.setHours(23, 59, 59, 999); // Set time to end of the day (just before midnight)

      filter.createdAt = {
        ...filter.createdAt,
        $lte: endDate,
      };
    }

    if (req.query.transactionStatus) {
      filter["status"] = req.query.transactionStatus;
    }

    // Fetch transactions based on the filter
    const transactions = await Transactions.find(filter).select(
      "status transactionType  createdAt"
    );
    Logger.info(`[GET_TRANSACTION_HISTORY_SUCCESS]`)
    return res.status(200).json({
      message: "Transactions fetched successfully",
      status: "success",
      data: transactions,
    });

  } catch (error) {
    Logger.error(`[FETCH_TRANSACTIONS_FAILED]`, (error as Error).message)
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const searchUsers = async (req: Request, res: Response) => {
  try {
    const searchQuery: any = {};
    Logger.info(`[SEARCH_USERS] query ${searchQuery}`)
    if (req.query.firstname) {
      // Case-insensitive search by name
      searchQuery["firstname"] = {
        $regex: new RegExp(req.query.firstname as string, "i"),
      };
    }

    const searchResults = await User.find(searchQuery);
    // res.json(searchResults);
    Logger.info(`[SEARCH_USERS_SUCCESS] query ${searchQuery}`)
    return res.status(200).json({
      message: "Details status searched successfully",
      status: "success",
      data: searchResults,
    });
  } catch (error) {
    Logger.error(`[SEARCH_USERS_FAILED]`, (error as Error).message)
    res.status(500).json({
      error: "Internal Server Error",
      details: (error as Error).message,
    });
  }
};
