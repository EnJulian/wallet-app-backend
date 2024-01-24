// import {transferTransactions} from '../services/user.service'
// import { type NextFunction, type Request, type Response } from 'express'


// export const transferMoney = async (
//     req: Request,
//     res: Response,
//     next: NextFunction
//   ) => {
//     try {
//     const {userAccountNumber, transactionAmount, status} = req.body
      
//       const data = await transferTransactions( userAccountNumber, transactionAmount)
  
//       res.status(data.code).json(
//         data
//       )
//     } catch (error) {
//       next(error)
//     }
//   }
  