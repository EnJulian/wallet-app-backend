import { Utils } from '../utils'
import { WalletType } from '../interfaces'
import User from '../models/User'
import Transactions from '../models/Transactions'

export const fetchWalletBalance = async (accountNumber: string) => {

  // TODO check if logged in/ token

  let currentWalletBalance;
  try {
    currentWalletBalance = await Utils.getWalletBalance(accountNumber);
  } catch (error) {
    return Utils.provideResponse(500, 'error', 'failed to fetch wallet balance', {});
  }

  if (!currentWalletBalance) {
    return Utils.provideResponse(404, 'error', 'wallet balance not found', currentWalletBalance);
  }

  return Utils.provideResponse(200, 'success', 'current account balance', currentWalletBalance);

}

export const depositFunds = async ( accountNumber: string, amount: number, wallet: string, transactionType: string ) => {

  const walletCurrentBalance = await Utils.getWalletBalance(accountNumber)

  if (wallet === 'dollar') {
    const { dollars } = walletCurrentBalance
    const newAmount: number = dollars + amount
    const updateBalance = await Utils.updateWalletBalance(accountNumber, WalletType.dollar, newAmount)

    if (updateBalance){
      const depositFundTransaction = {
        userAccountNumber: accountNumber,
        status: 'Successful',
        wallet: WalletType.dollar,
        transactionType: transactionType,
        amount: amount,
      }
      
      await Transactions.create(depositFundTransaction)
  
    }else{
      const depositFundTransaction = {
        userAccountNumber: accountNumber,
        status: 'Failed',
        wallet: WalletType.dollar,
        transactionType: transactionType,
        amount: amount,
      }
      
      await Transactions.create(depositFundTransaction)

    }
    

    return Utils.provideResponse(201, 'success', 'you account has been credited with', amount)
  }
  
  if (wallet === 'naira'){
    const { naira } = walletCurrentBalance
    const newAmount: number = naira + amount
    const updateBalance = await Utils.updateWalletBalance(accountNumber, WalletType.naira, newAmount)

    if (updateBalance){
    const depositFundTransaction = {
      userAccountNumber: accountNumber,
      status: 'Successful',
      wallet: WalletType.naira,
      transactionType: transactionType,
      amount: amount,
    }
    
    await Transactions.create(depositFundTransaction)

    }else{
      const depositFundTransaction = {
        userAccountNumber: accountNumber,
        status: 'Failed',
        wallet: WalletType.naira,
        transactionType: transactionType,
        amount: amount,
      }
      
      await Transactions.create(depositFundTransaction)

    }

    return Utils.provideResponse(201, 'success', 'you account has been credited with', amount)
  
  }
  
  return Utils.provideResponse(400, 'error', 'invalid account', {})
}
//TODO work on transfer transaction
/**
 * transfer funds into another wallet
 * @date 1/15/2024 - 9:50:35 AM
 *
 * @async
 * @returns JSON object as response data
 * @param amount
 * @param senderAccountNumber
 * @param receiverAccountNumber
 * @param transactionType
 * @param wallet
 */

export const transferFunds = async (
  amount: number,
  senderAccountNumber: string,
  receiverAccountNumber: string, 
  transactionType: string,
  wallet: string
) => {

  // TODO check if the receiver exists in db before transaction
  const receiverExists = await User.findOne({ accountNumber: receiverAccountNumber })
  if (!receiverExists) {
    return Utils.provideResponse(400, 'error', 'invalid account', {})
  }

  const [senderCurrentBalance, receiverCurrentBalance] = await Promise.all([
    Utils.getWalletBalance(senderAccountNumber),
    Utils.getWalletBalance(receiverAccountNumber)
  ])

  if (wallet === 'dollar') {
    const { dollars } = senderCurrentBalance
    if (amount > dollars) {
      return Utils.provideResponse(400, 'error', 'insufficient funds', {})
    }

    const newReceiverAmount: number = amount + receiverCurrentBalance.dollars
    const newSenderAmount: number = dollars - amount

    const updateReceiverBalance = await Utils.updateWalletBalance(receiverAccountNumber, WalletType.dollar, newReceiverAmount)
    const updateSenderBalance = await Utils.updateWalletBalance(senderAccountNumber, WalletType.dollar, newSenderAmount)

    const transferFundTransaction = {
      userAccountNumber: senderAccountNumber,
      status: updateReceiverBalance && updateSenderBalance ? 'Successful' : 'Failed',
      wallet: WalletType.dollar,
      transactionType: transactionType,
      amount: amount,
    }

    await Transactions.create(transferFundTransaction)

    const transferHistory = {
      "amount_sent": amount,
      "current_balance": updateSenderBalance?.dollar
    }

    return Utils.provideResponse(201, 'success', 'funds transferred', transferHistory)
  }

  if (wallet === 'naira') {
    const { naira } = senderCurrentBalance
    if (amount > naira) {
      return Utils.provideResponse(400, 'error', 'insufficient funds', {})
    }

    const newReceiverAmount: number = amount + receiverCurrentBalance.naira
    const newSenderAmount: number = naira - amount

    const updateReceiverBalance = await Utils.updateWalletBalance(receiverAccountNumber, WalletType.naira, newReceiverAmount)
    const updateSenderBalance = await Utils.updateWalletBalance(senderAccountNumber, WalletType.naira, newSenderAmount)

    const transferFundTransaction = {
      userAccountNumber: senderAccountNumber,
      status: updateReceiverBalance && updateSenderBalance ? 'Successful' : 'Failed',
      wallet: WalletType.naira,
      transactionType: transactionType,
      amount: amount,
    }

    await Transactions.create(transferFundTransaction)

    const transferHistory = {
      "amount_sent": amount,
      "current_balance": updateSenderBalance?.naira
    }

    return Utils.provideResponse(201, 'success', 'funds transferred', transferHistory)
  }
}



export const fetchAccountSummary = async (accountNumber: string) => {

  // TODO check if logged in/ token
  const transactionHistory = await Utils.getAccountSummary(accountNumber)

  return Utils.provideResponse(200, 'success', 'account summary', transactionHistory)
}




export const fetchTransactionHistory = async (accountNumber: string, page: number, limit: number) => {

  // TODO check if logged in/ token
  const transactionHistory = await Utils.getTransactionHistory(accountNumber, page, limit)

  return Utils.provideResponse(200, 'success', 'transaction history', transactionHistory)
}



