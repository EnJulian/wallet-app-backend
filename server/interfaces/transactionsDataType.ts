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
}
