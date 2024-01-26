// import User from '../models/User'
// import {
//   provideResponse,
//   ErrorResponseProvider
// } from '../repository/response'
// import { accountNumbers } from '../repository/generateAccountNumbers'

// import {transferTransaction} from '../repository/userDataType'
// import config from '../config/env/index'
// import transfers from '../models/Transactions'
// import { Request, Response } from 'express'
// import { CustomRequest } from '../repository/userDataType' 

// export const transferTransactions = async (req: Request, res: Response) => {
//     try {
//       const {_id} = req.data
//       const { userAccountNumber, transactionAmount } = req.body as unknown as transferTransaction;
  
//       if (!(userAccountNumber && transactionAmount)) {
//         res.status(200).json({error: "Error"});
//         return;
//       }
        
//       const beneficiary = await User.findOne({ accountNumber: userAccountNumber });
//       if (beneficiary === null) {
//         res.status(400).send("User with this account number does not exist");
//         return;
//     }
  
//       const dollars = beneficiary!.DollarWallet
//       const Naira = beneficiary!.NairaWallet
// console.log(`This is beneficiary's old balance: ${dollars}`)
//       const accountOwner = await User.findById(_id);

//       if (!accountOwner) {
//         res.status(404).send(`Account owner with id ${(req as any).User?.User_id} does not exist`);
//         return;
//       }
//       console.log(`This is sender's old balance: ${accountOwner.DollarWallet}`)

//       if (transactionAmount > accountOwner.DollarWallet && transactionAmount > 0) {
//         res.status(400).send("Insufficient funds to make this transfer");
//         return;
//       }
  
//       if (accountOwner.accountNumber === beneficiary.accountNumber) {
//         res.status(400).send("Sorry, you cannot send money to yourself");
//         return;
//       }
//         beneficiary.DollarWallet += transactionAmount;
//        accountOwner.DollarWallet -= transactionAmount;
//       await User.findOneAndUpdate(
//         { accountNumber: userAccountNumber },
//         { $inc: { DollarWallet: transactionAmount } }
//       );
  
//       await User.findByIdAndUpdate(
//         _id,
//         { $inc: { DollarWallet: -transactionAmount } }
//       );
//       // beneficiary.DollarWallet += transactionAmount;
//       // accountOwner.DollarWallet -= transactionAmount;
//        console.log(`This is beneficiary's new balance: ${beneficiary.DollarWallet}`)
//        console.log(`This is sender's new balance: ${accountOwner.DollarWallet}`)

     
//       const transactionDetails = {
//         transactionType: 'Transfer',
//         beneficiary: userAccountNumber,
//         sender: accountOwner.accountNumber,
//         transactionAmount,
//       };
      
//       await transfers.create(transactionDetails);
//       const data = {
//         code: 200,
//         status: 'success',
//         message: `Transfer of ${transactionAmount} to ${userAccountNumber} was successful`,
//         data: transactionDetails
//       };
//    res.status(data.code).json(data);
//     } catch (err: unknown) {
//       throw err
//     }
//   };



import User from '../models/User'
import {
  provideResponse,
  ErrorResponseProvider
} from '../repository/response'
import { accountNumbers } from '../repository/generateAccountNumbers'

import {transferTransaction} from '../repository/userDataType'
import config from '../config/env/index'
import transfers from '../models/Transactions'
import { Request, Response } from 'express' 

export const transferTransactions = async (req: Request, res: Response) => {
    try {
      const {_id} = req.data
      const { userAccountNumber, transactionAmount, currency } = req.body as unknown as transferTransaction;
  
      if (!(userAccountNumber && transactionAmount)) {
        res.status(200).json({error: "Error"});
        return;
      } 
        
      const beneficiary = await User.findOne({ accountNumber: userAccountNumber });
      if (beneficiary === null) {
        res.status(400).send("User with this account number does not exist");
        return;
    }
  
      const beneficiaryDollars = beneficiary!.DollarWallet
      const beneficiaryNaira = beneficiary!.NairaWallet


console.log(`This is beneficiary's old balance - dollar account: ${beneficiaryDollars}`)
console.log(`This is beneficiary's old balance - naira account: ${beneficiaryNaira}`)

      const accountOwner = await User.findById(_id);

      if (!accountOwner) {
        res.status(404).send(`Account owner with id ${(req as any).User?.User_id} does not exist`);
        return;
      }

      const senderDollars = accountOwner!.DollarWallet
      const senderNaira = accountOwner!.NairaWallet

      console.log(`This is sender's old balance - dollar account: ${senderDollars}`)
      console.log(`This is sender's old balance - naira account: ${senderNaira}`)
     
      const senderWallet = currency === 'Dollar' ? accountOwner.DollarWallet : accountOwner.NairaWallet;
      const beneficiaryWallet = currency === 'Dollar' ? beneficiary.DollarWallet : beneficiary.NairaWallet;
    console.log(`This is sender's old balance(naira): ${senderWallet}`)
      if (transactionAmount > senderWallet && transactionAmount > 0) {
        res.status(400).send("Insufficient funds to make this transfer");
        return;
      }
     
      if (accountOwner.accountNumber === beneficiary.accountNumber) {
        res.status(400).send("Sorry, you cannot send money to yourself");
        return;
      }
       
      // if(currency === 'Naira'){
      //   beneficiary.NairaWallet +=transactionAmount
      //   accountOwner.NairaWallet -= transactionAmount
      // }
      
      // if (currency === 'dollars'){
      //   console.log("Updating Dollar Wallets");
      // console.log("Old Beneficiary Dollar Wallet:", beneficiary.DollarWallet);
      // console.log("Old Sender Dollar Wallet:", accountOwner.DollarWallet);
      //   beneficiary.DollarWallet +=transactionAmount
      //   accountOwner.DollarWallet -= transactionAmount

              
      // console.log("New Beneficiary Dollar Wallet:", beneficiary.DollarWallet);
      // console.log("New Sender Dollar Wallet:", accountOwner.DollarWallet);
      // }
      const currencyWallet = currency + 'Wallet';

      console.log("Currency Wallet: ", currencyWallet )
        
      const updateBeneficiary = await User.findOneAndUpdate(
        { accountNumber: userAccountNumber },
        { $inc: { [currency + 'Wallet']: transactionAmount } },
        {new: true}
      );

      console.log(updateBeneficiary)
     
      const updateSender = await User.findByIdAndUpdate(
        _id,
        { $inc: { [currency + 'Wallet']: -transactionAmount } },
        { new: true }
      );      

      console.log(updateSender)

      // beneficiary.DollarWallet += transactionAmount;s
      // accountOwner.DollarWallet -= transactionAmount;
       console.log(`This is beneficiary's new balance: ${beneficiaryWallet}`)
       console.log(`This is sender's new balance: ${senderWallet}`)
      //  console.log(`This is beneficiary's new balance(naira): ${beneficiary.NairaWallet}`)

      
      const transactionDetails = {
        transactionType: 'Transfer',
        beneficiary: userAccountNumber,
        sender: accountOwner.accountNumber,
        transactionAmount,
        currency,
      };
      
      await transfers.create(transactionDetails);
      const data = {
        code: 200,
        status: 'success',
        message: `Transfer of ${transactionAmount} to ${userAccountNumber} was successful`,
        data: transactionDetails
      };
   res.status(data.code).json(data);
    } catch (err: unknown) {
      throw err
    }
  };