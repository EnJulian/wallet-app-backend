import mongoose, { Schema } from 'mongoose'

const transactionStatus: string[] = ['Successful', 'Failed']
const walletType: string[] = ['NairaWallet', 'DollarWallet']

const transferSchema = new Schema({
  senderAccountNumber: {
    type: String,
    require: true
  },
  receiverAccountNumber: {
    type: String,
    require: true
  },
  status: {
    type: String,
    enum: transactionStatus
  },
  transactionType:{
    type:String,
    default: 'Wallet Transfer'
  },
  wallet: {
    type: String,
    enum: walletType
  },
  amount: Number,
  receiverAccountnumber: Number,
  createdAt: {
    type: Date,
    immutable: true,
    default: () => Date.now()
  },

})

export default mongoose.model('Transfer', transferSchema)

