import User from '../models/User'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {
  provideResponse,
  ErrorResponseProvider
} from '../repository/response'
import { accountNumbers } from '../repository/generateAccountNumbers'
import { UserDataType } from '../repository/userDataType' 
import {transferTransaction} from '../repository/userDataType'
import config from '../config/env/index'
import transfers from '../models/Transactions'
import { Request, Response } from 'express'
// const transfers = mongoose.model("transaction")
/**
 * register new wallet user
 * @date 1/15/2024 - 9:50:35 AM
 *
 * @async
 * @param {Request} req
 * @returns
 */

export const createNewUser = async (
  firstname: string,
  surname: string,
  othernames: string,
  email: string,
  password: string,
  phonenumber: string
) => {
  // check if the email exists in the db
  const duplicate = await User.findOne({ email }).exec()
  // if duplicate is not empty
  // throw error
  if (duplicate !== null) {
    throw new ErrorResponseProvider(
      409,
      'failed',
      'user already exists!'
    )
  }

  // encrypt the password
  const hashedPwd = await bcrypt.hash(password, 10)

  // get accountNumber
  const accountNumber: string = accountNumbers()
  
  // create and store the new wallet user
  const newWalletUser: UserDataType = {
    firstname,
    surname,
    othernames,
    email,
    password: hashedPwd,
    phonenumber,
    accountNumber
  }


  const createUserResult = await User.create(newWalletUser)

  return {
    code: 201,
    status: 'success',
    message: 'wallet user created',
    data: { createUserResult }

  }
}

export const loginUser = async (email: string, password: string ) => {

  // Check if that user is registered
  const registeredUser = await User.findOne({ email }).exec()

  // if the user is not registered throw an error
  if (registeredUser === null) {
    throw new ErrorResponseProvider(
      400,
      'failed',
      'invalid email or password'
    )
  }

  // Compare user passwords
  const { password: dbPassword, _id, accountNumber } = registeredUser

  const userPassword = bcrypt.compareSync(password, dbPassword)
  if (!userPassword) {
    return {
      code: 401,
      status: 'failed',
      message: 'invalid email or password'
    }
  }

  const options = {
    expiresIn: '1d'
  }

  // create token for authentication
  const token = jwt.sign(
    {
      _id,
      email
    },
    config.JWT_SECRET_KEY,
    options
  )

  return provideResponse(
    200,
    'success',
    'login success',
    {
      _id,
      email,
      token,
      accountNumber
    }
  )
}



// export const transferTransaction = async( req:Request, res: Response) => {
//   try{
//     const{userAccountNumber, transactionAmount, status} = req.body as unknown as transferTransaction;
//   if(!(userAccountNumber && transactionAmount && status)){
//     //res.status(400).send("All input are required");
//     res.status(200).json({});
//     return;
//   }
//    const beneficiary = await User.findOne({userAccountNumber});

//    if (beneficiary === null){
//     res.status(400).send("User with this account number does not exist");
//     return;
//    }

//    const accountOwner = await User.findById(req.us);
//    if(!accountOwner){
//     res.status(404).send("Account owner with id => ${req.user?.user_id} does not exist");
//    }

//    if (transactionAmount> accountOwner.accountBalance && transactionAmount > 0)
//    {res.status(400).send("Insufficient funds to make this transfer");
//    return;
//   }

//   if (accountOwner.userAccountNumber === beneficiary.userAccountNumber) {
//     res.status(400).send("Sorry, you cannot send money to yourself");
//     return;
// }

// if (accountOwner.userAccountNumber !== beneficiary.userAccountNumber) {
//     beneficiary.accountBalance += transactionAmount;
//     accountOwner.accountBalance -= transactionAmount;

//     const transactionDetails = {
//         transactionType: 'Transfer',
//         userAccountNumber,
//         Status,
//         sender: accountOwner.accountNumber,
//         transactionAmount: transferAmount
//     };

//     await beneficiary.save();
//     await accountOwner.save();
//     await Transactions.create(transactionDetails);

//     res.status(200).send(`Transfer of ${formatter.format(transactionAmount)} to ${userAccountNumber} was successful`);
// }
// } catch (err) {
// res.status(500).json({ message: err.message });
// }
// }




// export const transferTransactions = async (req: Request, res: Response) => {
//   try {
//     const { userAccountNumber, transactionAmount, status } = req.body as unknown as transferTransaction;

//     if (!(userAccountNumber && transactionAmount && status)) {
//       res.status(200).json({});
//       return;
//     }

//     const beneficiary = await User.findOne({ accountNumber: userAccountNumber });

//     if (beneficiary === null) {
//       res.status(400).send("User with this account number does not exist");
//       return;
//     }

//     const accountOwner = await User.findById((req as any).User?.user_id);

//     if (!accountOwner) {
//       res.status(404).send(`Account owner with id ${(req as any).User?.user_id} does not exist`);
//       return;
//     }

//     if (transactionAmount > accountOwner.accountBalance && transactionAmount > 0) {
//       res.status(400).send("Insufficient funds to make this transfer");
//       return;
//     }

//     if (accountOwner.accountNumber === beneficiary.accountNumber) {
//       res.status(400).send("Sorry, you cannot send money to yourself");
//       return;
//     }

//     if (accountOwner.accountNumber !== beneficiary.accountNumber) {
//       accountOwner.accountBalance += transactionAmount;
//       accountOwner.accountBalance -= transactionAmount;

//       const transactionDetails = {
//         transactionType: 'Transfer',
//         userAccountNumber,
//         status,
//         sender: accountOwner.accountNumber,
//         transactionAmount,
//       };

//       await beneficiary.save();
//       await accountOwner.save();
//       await transfers.create(transactionDetails);

//       res.status(200).send(`Transfer of ${transactionAmount} to ${userAccountNumber} was successful`);
//     }
//   } catch (err: unknown) {
//     if (err instanceof Error) {
//       res.status(500).json({ message: err.message });
//     } else {
//       res.status(500).json({ message: 'An unknown error occurred' });
//     }
//   }
// };