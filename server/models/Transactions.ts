
import mongoose, { Schema } from "mongoose";

const transactionStatus: string[] = ["Successful", "Failed"];
const walletType: string[] = ["NairaWallet", "DollarWallet"];
const transactionType: string[] = ["Wallet Transfer", "Wallet Deposit"];

const transactionSchema = new Schema({
  userAccountNumber: {
    type: String,
    require: true,
  },
  status: {
    type: String,
    enum: transactionStatus,
  },
  transactionType: {
    type: String,
    enum: transactionType,
  },
  wallet: {
    type: String,
    enum: walletType,
  },
  amount: Number,
  balance: Number,
  createdAt: {
    type: Date,
    immutable: true,
    default: () => Date.now(),
  },
});



export default mongoose.model("Transactions", transactionSchema);
