/**
 * @openapi
 * components:
 *  schemas:
 *    AccountBalanceResponse:
 *      type: object
 *      properties:
 *        code:
 *          type: number
 *          default: 200
 *        message:
 *          type: string
 *          default: "current account balance"
 *        status:
 *          type: string
 *          default: "success"
 *        data:
 *          type: object
 *          properties:
 *              dollars:
 *                type: interger
 *                default: 0
 *              naira:
 *                type: integer
 *                default: 0
 *
 *
 *    ServerErrorResponse:
 *      type: object
 *      properties:
 *        code:
 *          type: number
 *          default: 500
 *        message:
 *          type: string
 *          default: "An Error has Occurred!"
 *        status:
 *          type: string
 *          default: "error"
 *          data:
 *            type: object
 *            default:
 *
 *
 *    UnauthorizedErrorResponse:
 *      type: object
 *      properties:
 *        code:
 *          type: number
 *          default: 401 
 *        message:
 *          type: string
 *          default: "Kindly log in!"
 *        status:
 *          type: string
 *          default: "error"
 *          data:
 *            type: object
 *            default:
 *
 *
 *    AuthenticationSchemes:
 *      bearerAuth:
 *        type: http
 *        scheme: bearer
 *        bearerFormat: JWT
 *    
 *    AccountSummaryResponse:
 *      type: object
 *      properties:
 *        code:
 *          type: number
 *          default: 200
 *        message:
 *          type: string
 *          default: "account summary" 
 *        status: 
 *          type: string
 *          default: "success"
 *        _id:
 *          type: string
 *        firstname:
 *          type: string
 *        surname:
 *          type: string
 *        DollarWallet:
 *          type: number
 *          default: 0
 *        NairaWallet:
 *          type: number
 *          default: 0
 *        transactions:
 *          type: array
 *          default: [{  "_id": "65e08b8a6a1b97bef2f61900", "status": "Successful", "transactionType": "Wallet Deposit", "dateTime": "February 29, 2024 | 1:50 PM", "currencyAmount": "NGN 15"}]
 *
 * 
 * 
 *    WalletTransactions:
 *      type: object
 *      properties:
 *        _id:
 *          type: string
 *        status:
 *          type: string
 *        transactionType:
 *          type: string
 *        dateTime:
 *          type: string
 *        currencyAmount:
 *          type: string
 * 
 *    TransactionsHistoryResponse:
 *      type: object
 *      properties:
 *        code:
 *          type: number
 *          default: 200
 *        message:
 *          type: string
 *          default: "transaction history"
 *        status: 
 *          type: string
 *          default: "success"
 *        metadata:
 *          type: object
 *          properties: { "totalTransactions": 5, "pageNumber": 1, "remainingPages": 1}
 *        transactions:
 *          type: array
 *          default: [{"_id": "65e08b8a6a1b97bef2f61900", "status": "Successful", "transactionType": "Wallet Deposit", "dateTime": "February 29, 2024 | 1:50 PM", "currencyAmount": "USD 15"}]
 * 
 * 
 */


