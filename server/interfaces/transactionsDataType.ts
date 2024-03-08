export enum TransactionStatus {
  success = "success",
  fail = "fail",
}

export enum WalletType {
  naira = "NairaWallet",
  dollar = "DollarWallet",
}

export interface FundDataType {
  transactionStatus: TransactionStatus;
  transactionType: string;
  amount: number;
  userAccountNumber: string;
}

export interface TransferDataType {
  transactionStatus: TransactionStatus;
  transactionType: string;
  amount: number;
  senderAccountNumber: string;
  receiverAccountNumber: string;
  currency: string;
}

export interface Transaction {
  code: number;
  status: string;
  message: string;
  data: Record<string, any>;
}

export interface TransactionsArray {
  _id: string;
  userId?: string;
  status: string;
  transactionType: string;
  wallet: string;
  amount: number;
  currency: string;
  createdAt: string;
}
