import mongoose, { Schema } from 'mongoose'

const transactionStatus: string[] = ['successful', 'failed']
const walletType: string[] = ['Naira', 'Dollar']

const fundSchema = new Schema({
  userAccountNumber: {
    type: String,
    require: true
  },
  status: {
    type: String,
    enum: transactionStatus
  },
  wallet: {
    type: String,
    enum: walletType
  },
  amount: Number,
  createdAt: {
    type: Date,
    immutable: true
  }

})

const transferSchema = new Schema({
  userAccountNumber: {
    type: String,
    require: true
  },
  status: {
    type: String,
    enum: transactionStatus
  },
  wallet: {
    type: String,
    enum: walletType
  },
  amount: Number,
  accountnumber: Number,
  createdAt: {
    type: Date,
    immutable: true
  }

})

export const transfer = mongoose.model('Transfer', transferSchema)
export const funds = mongoose.model('Fund', fundSchema)
