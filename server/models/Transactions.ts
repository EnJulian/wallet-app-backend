
import mongoose, { Schema } from "mongoose";
import User from "./User";

const transactionStatus: string[] = ["Successful", "Failed"];
const walletType: string[] = ["NairaWallet", "DollarWallet"];
const transactionType: string[] = ["Wallet Transfer", "Wallet Deposit"];
const currencyType: string[] = ["NGN", "USD"];

const transactionSchema = new Schema({
  userId: {
    type: Schema.ObjectId, ref: User,
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
  currency: {
    type: String,
    enum: currencyType,
  },
  createdAt: {
    type: Date,
    immutable: true,
    default: () => Date.now(),
  },
});



export default mongoose.model("Transactions", transactionSchema);
