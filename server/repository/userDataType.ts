export interface UserDataType {
  firstname: string
  surname: string
  othernames?: string
  phonenumber: string
  password: string
  email: string
  accountNumber: string
  pin?: number
  Dollars?: number
  Naira?: number
}


export interface transferTransaction {
  userAccountNumber: string;
  transactionAmount: number;
  status: string;
}; 

export interface CustomRequest extends Request {
  data?: any; // Add any additional properties you need
}
