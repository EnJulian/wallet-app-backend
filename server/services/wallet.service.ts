import { Utils } from '../utils'
import { WalletType } from '../interfaces'
import bcrypt from 'bcrypt'
import User from '../models/User'
import Transactions from '../models/Transactions'



export const fetchWalletBalance = async (userId: string) => {

  let currentWalletBalance;
  try {
    currentWalletBalance = await Utils.getWalletBalance(userId);

  } catch (error) {
    return Utils.provideResponse(500, 'error', 'failed to fetch wallet balance', {});
  }

  if (!currentWalletBalance) {
    return Utils.provideResponse(404, 'error', 'wallet balance not found', {});
  }

  return Utils.provideResponse(200, 'success', 'current account balance', currentWalletBalance);

}

export const depositFunds = async ( userId: string, amount: number, wallet: string, transactionType: string ) => {

  const walletCurrentBalance = await Utils.getWalletBalance(userId)

  if (wallet === 'dollar') {
    const { dollars } = walletCurrentBalance
    const newAmount: number = dollars + amount
    const updateBalance = await Utils.updateWalletBalance(userId, WalletType.dollar, newAmount)

    if (updateBalance){
      const depositFundTransaction = {
        userId,
        status: 'Successful',
        wallet: WalletType.dollar,
        transactionType: transactionType,
        amount: amount,
      }
      
      await Transactions.create(depositFundTransaction)
  
    }else{
      const depositFundTransaction = {
        userId,
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
    const updateBalance = await Utils.updateWalletBalance(userId, WalletType.naira, newAmount)

    if (updateBalance){
    const depositFundTransaction = {
      userId,
      status: 'Successful',
      wallet: WalletType.naira,
      transactionType: transactionType,
      amount: amount,
    }
    
    await Transactions.create(depositFundTransaction)

    }else{
      const depositFundTransaction = {
        userId,
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



export const verifyPin = (pin: string, transactionPin: string) => {

  const validatePin = bcrypt.compareSync(pin, transactionPin)

  if (!validatePin) {
      throw {
          code: 400,
          status: 'error',
          message: 'invalid pin.',
          data: null
      }
  }
}



/**
 * transfer funds into another wallet
 * @date 1/15/2024 - 9:50:35 AM
 *
 * @async
 * @returns JSON object as response data
 * @param amount
 * @param userId
 * @param receiverAccountNumber
 * @param transactionType
 * @param wallet
 */

export const transferFunds = async (
  amount: number,
  userId: string,
  receiverAccountNumber: string, 
  transactionType: string,
  wallet: string,
  pin: string
) => {
  const _id = userId

  const fetchPin = await User.findOne({ _id })
  
  // TODO verify pin, 
  if(!fetchPin?.pin){
    return Utils.provideResponse(400, 'error', 'invalid pin', {})
  }

  verifyPin(pin, fetchPin?.pin)


  const receiverExists = await User.findOne({ accountNumber: receiverAccountNumber })
  if (!receiverExists) {
    return Utils.provideResponse(400, 'error', 'invalid account', {})
  }

  const [senderCurrentBalance, receiverCurrentBalance] = await Promise.all([
    Utils.getWalletBalance(userId),
    Utils.getWalletBalanceByAccountNumber(receiverAccountNumber)
  ])

  if (wallet === 'dollar') {
    const { dollars } = senderCurrentBalance
    if (amount > dollars) {
      return Utils.provideResponse(400, 'error', 'insufficient funds', {})
    }

    const newReceiverAmount: number = amount + receiverCurrentBalance.dollars
    const newSenderAmount: number = dollars - amount

    const updateReceiverBalance = await Utils.updateWalletBalanceByAccountNumber(receiverAccountNumber, WalletType.dollar, newReceiverAmount)
    const updateSenderBalance = await Utils.updateWalletBalance(userId, WalletType.dollar, newSenderAmount)

    const transferFundTransaction = {
      userId,
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

    const updateReceiverBalance = await Utils.updateWalletBalanceByAccountNumber(receiverAccountNumber, WalletType.naira, newReceiverAmount)
    const updateSenderBalance = await Utils.updateWalletBalance(userId, WalletType.naira, newSenderAmount)

    const transferFundTransaction = {
      userId,
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



export const fetchAccountSummary = async (userId: string) => {

  const accountSummary = await Utils.getAccountSummary(userId)

  return Utils.provideResponse(200, 'success', 'account summary', {... { ...accountSummary[0] } })
}


export const fetchTransactionHistory = async (userId: string, page: number, limit: number) => {

  const transactionHistory = await Utils.getTransactionHistory(userId, page, limit)

  return Utils.provideResponse(200, 'success', 'transaction history',  {... {... transactionHistory[0] } } )
}



