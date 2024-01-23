// import {getWalletBalance, updateWalletBalance} from '../repository/wallet.queries'
// import {provideResponse} from '../utils/response'
import {FundDataType, TransactionStatus, TransferDataType, WalletType} from '../interfaces'
import { provideResponse } from '../utils'
import Transactions from '../models/Transactions'
import User from '../models/User'


const getWalletBalance = async (accountNumber: string) => {
  const walletBalance = await User.findOne({ accountNumber })

  const dollars = walletBalance!.DollarWallet
  const naira = walletBalance!.NairaWallet
  return {  dollars, naira }

}


const updateWalletBalance = async (
    accountNumber: string,
    accountType: WalletType,
    amount: number) => {

  const filter = { accountNumber }


  if (accountType === 'DollarWallet') {
    const updatedUserWallet = await User.findOneAndUpdate(filter, { DollarWallet: amount }, { new: true })
    return { "dollar": updatedUserWallet!.DollarWallet }
  }

  if (accountType === 'NairaWallet') {
    const updatedUserWallet = await User.findOneAndUpdate(filter, { NairaWallet: amount }, { new: true })
    return { "naira": updatedUserWallet!.NairaWallet }
  }
}








export const fetchWalletBalance = async (accountNumber: string) => {

  // TODO check if logged in/ token

  const currentWalletBalance = await getWalletBalance(accountNumber)

  return provideResponse(200, 'success', 'current account balance', currentWalletBalance)
}



export const depositFunds = async ( accountNumber: string, amount: number, wallet: string ) => {

  const walletCurrentBalance = await getWalletBalance(accountNumber)
  if (wallet === 'dollar') {
    const { dollars } = walletCurrentBalance
    const newAmount: number = dollars + amount
    const updateBalance = await updateWalletBalance(accountNumber, WalletType.dollar, newAmount)

    if (updateBalance) {
      const depositFundTransaction: FundDataType = {
        userAccountNumber: accountNumber,
        transactionType: 'Wallet Deposit',
        transactionStatus: TransactionStatus.success,
        amount: newAmount
      };
      console.log("This is the wallet type in db", WalletType.dollar)

      await Transactions.create(depositFundTransaction)

    }else{
      const depositFundTransaction: FundDataType = {
        userAccountNumber: accountNumber,
        transactionType: 'Wallet Deposit',
        transactionStatus: TransactionStatus.fail,
        amount: newAmount,
      }

      await Transactions.create(depositFundTransaction)

    }


    return provideResponse(201, 'success', 'Your account has been credited', updateBalance!)
  }

  if (wallet === 'naira'){
    const { naira } = walletCurrentBalance
    const newAmount: number = naira + amount
    const updateBalance = await updateWalletBalance(accountNumber, WalletType.naira, newAmount)

    if (updateBalance){
      const depositFundTransaction: FundDataType = {
        userAccountNumber: accountNumber,
        transactionType: 'Wallet Deposit',
        transactionStatus: TransactionStatus.success,
        amount: newAmount,
      }

      await Transactions.create(depositFundTransaction)

    }else{
      const depositFundTransaction = {
        userAccountNumber: accountNumber,
        transactionType: 'Wallet Deposit',
        transactionStatus: TransactionStatus.fail,
        amount: newAmount,
      }

      await Transactions.create(depositFundTransaction)

    }

    return provideResponse(201, 'success', 'Your account has been credited', updateBalance!)

  }

  return provideResponse(400, 'error', 'invalid account', {})
}


export const transferFunds = async (
    senderAccountNumber: string,
    receiverAccountNumber: string,
    wallet: string,
    amount: number) => {



  const receiverExists = await User.findOne({ accountNumber: receiverAccountNumber })
  console.log(receiverExists)
  if(receiverExists){
    const senderCurrentBalance = await getWalletBalance(senderAccountNumber)
    const receiverCurrentBalance = await getWalletBalance(receiverAccountNumber)

    if (wallet === 'dollar') {

      const { dollars } = senderCurrentBalance
      if (amount < dollars) {

        const newReceiverAmount: number = amount + receiverCurrentBalance.dollars

        const newSenderAmount: number = dollars - amount


        const updateReceiverBalance = await updateWalletBalance(receiverAccountNumber, WalletType.dollar, newReceiverAmount)

        const updateSenderBalance = await updateWalletBalance(senderAccountNumber, WalletType.dollar, newSenderAmount)

        if (updateReceiverBalance && updateSenderBalance){

          const transferFundTransaction: TransferDataType = {
            senderAccountNumber: senderAccountNumber,
            receiverAccountNumber: receiverAccountNumber,
            transactionType: 'Wallet Transfer',
            transactionStatus: TransactionStatus.success,
            amount: amount,
          }

          await Transactions.create(transferFundTransaction)

        }else{
          const transferFundTransaction = {
            senderAccountNumber: senderAccountNumber,
            receiverAccountNumber: receiverAccountNumber,
            transactionType: 'Wallet Transfer',
            transactionStatus: TransactionStatus.fail,
            walletType: WalletType.dollar,
            amount: amount,
          }

          await Transactions.create(transferFundTransaction)

        }
        return provideResponse(201, 'success', 'Funds transferred', updateSenderBalance!)
      }
      return provideResponse(400, 'error', 'insufficient funds', {})

    }

    if (wallet === 'naira') {

      const { naira } = senderCurrentBalance
      if (amount < naira){

        const newReceiverAmount: number = amount + receiverCurrentBalance.naira

        const newSenderAmount: number = naira - amount


        const updateReceiverBalance = await updateWalletBalance(receiverAccountNumber, WalletType.naira, newReceiverAmount)

        const updateSenderBalance = await updateWalletBalance(senderAccountNumber, WalletType.naira, newSenderAmount)

        if (updateReceiverBalance && updateSenderBalance){
          const transferFundTransaction = {
            senderAccountNumber: senderAccountNumber,
            receiverAccountNumber: receiverAccountNumber,
            transactionType: 'Wallet Transfer',
            transactionStatus: TransactionStatus.success,
            walletType: WalletType.dollar,
            amount: amount,
          }

          await Transactions.create(transferFundTransaction)

        }else{
          const transferFundTransaction = {
            senderAccountNumber: senderAccountNumber,
            receiverAccountNumber: receiverAccountNumber,
            transactionType: 'Wallet Transfer',
            transactionStatus: TransactionStatus.fail,
            walletType: WalletType.dollar,
            amount: amount,
          }

          await Transactions.create(transferFundTransaction)

        }
        return provideResponse(201, 'success', 'Funds transferred', updateSenderBalance!)
      }
      return provideResponse(400, 'error', 'insufficient funds', {})

    }
  }
  return provideResponse(400, 'error', 'invalid account', {})
}
