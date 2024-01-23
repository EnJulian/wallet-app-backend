import mongoose, { Schema } from 'mongoose'

const transactionStatus: string[] = ['Successful', 'Failed']
const walletType: string[] = ['NairaWallet', 'DollarWallet']

const depositSchema = new Schema({
  userAccountNumber: {
    type: String,
    require: true
  },
  status: {
    type: String,
    enum: transactionStatus
  },
  transactionType:{
    type:String,
    default: 'Wallet Deposit'
  },
  wallet: {
    type: String,
    enum: walletType
  },
  amount: Number,
  createdAt: {
    type: Date,
    immutable: true,
    default: () => Date.now()
  }

})

export default mongoose.model('Deposit', depositSchema)
