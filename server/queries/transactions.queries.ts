import User from '../models/User'
import Transactions from '../models/Transactions'



/**
 * fetch account summary for home page
 * @date 1/24/2024 - 16:51:46 PM
 *
 * @export
 * @async
 */

export const getAccountSummary = async (accountNumber: string) => {
  
      const transactionHistory = await User.aggregate([
  
      {$match: {
        accountNumber: accountNumber
        }
      },
      {
        $lookup:
          {
            from: "transactions",
            localField: "accountNumber",
            foreignField: "userAccountNumber",
            as: "summary",
          }
      },
    {
      $sort: {
        "summary.createdAt": -1
      }
    },
      {
      $project: {
      "firstname": 1,
      "surname": 1,
      "DollarWallet": 1,
      "NairaWallet": 1,
      recentTransactions: { $slice: ["$summary", 6]}
      }
    }
    ])  
      

    return transactionHistory
  }
  
  

/**
 * fetch transaction history
 * @date 1/23/2024 - 12:54:40 PM
 *
 * @export
 * @async
 */

export const getTransactionHistory = async (accountNumber: string, page: number, limit: number) => {
  
  const transactionHistory = await Transactions.aggregate([
    {
      $match: {
      userAccountNumber: accountNumber
      }
    },
  
     {
      $project: {
            "status": 1,
            "amount": 1,
            "wallet": 1,
            "transactionType": 1,
            "createdAt": 1,
     }
     },
      {
  $facet: {
        metadata: [
          { $count: "totalTransactions"},
          {
          $addFields:{
            pageNumber: page,
            // remainingPages: { $ceil: {$divide:["$totalTransactions", limit]} }
          }
        },
        ],
        data: [{ $skip: (page - 1) * limit }, { $limit: limit}]
      }
  }, 
  ])

  return transactionHistory
}


