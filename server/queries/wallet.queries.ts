import User from '../models/User'
import { type WalletType } from '../interfaces'

// get current account balance
export const getWalletBalance = async (accountNumber: string) => {
  const walletBalance = await User.findOne({ accountNumber })
  console.log(`wallet balance = ${walletBalance}`)
  const dollars = walletBalance!.DollarWallet
  const naira = walletBalance!.NairaWallet
  return { dollars, naira }

}

export const updateWalletBalance = async (
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

