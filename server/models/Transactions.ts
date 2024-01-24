import mongoose, { Schema } from 'mongoose'

const transactionStatus: string[] = ['successful', 'failed']
const walletType: string[] = ['Naira', 'Dollar']

const fundSchema = new Schema({
  userAccountNumber: {
    type: String,
    require: true
  },
  Status: {
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
  },
 

})

const transferSchema = new Schema({
  userAccountNumber: {
    type: String,
    require: true
  },
  Status: {
    type: String,
    enum: transactionStatus
  },
  wallet: {
    type: String,
    enum: walletType
  },
  transactionAmount: Number,

  createdAt: {
    type: Date,
    immutable: true,
    default: Date.now
  },
  sender: {
    type:String
  }

})

export default mongoose.model('transfers', transferSchema)
export const funds = mongoose.model('Fund', fundSchema)
