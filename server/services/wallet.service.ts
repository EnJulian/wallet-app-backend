import { getWalletBalance, updateWalletBalance } from '../queries/wallet.queries'
import { Utils } from '../utils'
import { WalletType } from '../interfaces'
import User from '../models/User'
import Transactions from '../models/Transactions'
import { getAccountSummary, getTransactionHistory } from '../queries/transactions.queries'

export const fetchWalletBalance = async (accountNumber: string) => {

  // TODO check if logged in/ token

  const currentWalletBalance = await getWalletBalance(accountNumber)

  return Utils.provideResponse(200, 'success', 'current account balance', currentWalletBalance)
}

/**
 * deposit funds to wallet
 * @date 1/15/2024 - 9:50:35 AM
 *
 * @async
 * @param 
 * @returns JSON object as response data
 */

export const depositFunds = async ( accountNumber: string, amount: number, wallet: string, transactionType: string ) => {

  const walletCurrentBalance = await getWalletBalance(accountNumber)

  if (wallet === 'dollar') {
    const { dollars } = walletCurrentBalance
    const newAmount: number = dollars + amount
    const updateBalance = await updateWalletBalance(accountNumber, WalletType.dollar, newAmount)

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
    const updateBalance = await updateWalletBalance(accountNumber, WalletType.naira, newAmount)

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
 * @param {Request} req
 * @returns JSON object as response data
 */

export const transferFunds = async (
  amount: number,
  senderAccountNumber: string,
  receiverAccountNumber: string, 
  transactionType: string,
  wallet: string) => {

  // TODO check if the receiver exists in db before transaction
  const receiverExits = await User.findOne({ accountNumber: receiverAccountNumber })
  if(!receiverExits){
    return Utils.provideResponse(400, 'error', 'invalid account', {})
  }
      const senderCurrentBalance = await getWalletBalance(senderAccountNumber)
      const receiverCurrentBalance = await getWalletBalance(receiverAccountNumber)

      if (wallet === 'dollar') {
        
          const { dollars } = senderCurrentBalance
          if (amount > dollars) {
            return Utils.provideResponse(400, 'error', 'insufficient funds', {})
          }
            
            const newReceiverAmount: number = amount + receiverCurrentBalance.dollars

            const newSenderAmount: number = dollars - amount


            const updateReceiverBalance = await updateWalletBalance(receiverAccountNumber, WalletType.dollar, newReceiverAmount)

            const updateSenderBalance = await updateWalletBalance(senderAccountNumber, WalletType.dollar, newSenderAmount)

            if (updateReceiverBalance && updateSenderBalance){
              
              const transferFundTransaction = {
                userAccountNumber: senderAccountNumber,
                status: 'Successful',
                wallet: WalletType.dollar,
                transactionType: transactionType,
                amount: amount,
              }
              
              await Transactions.create(transferFundTransaction)
          
              }else{
                const transferFundTransaction = {
                  userAccountNumber: senderAccountNumber,
                  status: 'Failed',
                  wallet: WalletType.dollar,
                  transactionType: transactionType,
                  amount: amount,
                }
                
                await Transactions.create(transferFundTransaction)
          
              }

              const transferHistory = {
                "amount_sent": amount,
                "current_balance": updateSenderBalance?.dollar

              }
            return Utils.provideResponse(201, 'success', 'funds transfered', transferHistory)
      }

      if (wallet === 'naira') {

        const { naira } = senderCurrentBalance

        if (amount > naira){
          return Utils.provideResponse(400, 'error', 'insufficient funds', {})
        }
        
          const newReceiverAmount: number = amount + receiverCurrentBalance.naira

          const newSenderAmount: number = naira - amount


          const updateReceiverBalance = await updateWalletBalance(receiverAccountNumber, WalletType.naira, newReceiverAmount)

          const updateSenderBalance = await updateWalletBalance(senderAccountNumber, WalletType.naira, newSenderAmount)

          if (updateReceiverBalance && updateSenderBalance){
            const transferFundTransaction = {
              userAccountNumber: senderAccountNumber,
              status: 'Successful',
              wallet: WalletType.naira,
              transactionType: transactionType,
              amount: amount,
            }
            
            await Transactions.create(transferFundTransaction)
        
            }else{
              const transferFundTransaction = {
                userAccountNumber: senderAccountNumber,
                status: 'Failed',
                wallet: WalletType.naira,
                transactionType: transactionType,
                amount: amount,
              }
              
              await Transactions.create(transferFundTransaction)
        
            }
            const transferHistory = {
              "amount_sent": amount,
              "current_balance": updateSenderBalance?.naira

            }

            return Utils.provideResponse(201, 'success', 'funds transfered', transferHistory)
  }
}



export const fetchAccountSummary = async (accountNumber: string) => {

  // TODO check if logged in/ token
  const transactionHistory = await getAccountSummary(accountNumber)

  return Utils.provideResponse(200, 'success', 'account summary', transactionHistory)
}




export const fetchTransactionHistory = async (accountNumber: string, page: number, limit: number) => {

  // TODO check if logged in/ token
  const transactionHistory = await getTransactionHistory(accountNumber, page, limit)

  return Utils.provideResponse(200, 'success', 'transaction history', transactionHistory)
}



