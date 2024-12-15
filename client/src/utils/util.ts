export type Transactions = {
  type: TransactionType;
  amount: number;
  reason: string;
  balance_now: number;
  time: string;
};

export type FormattedTransactions = {
  Reason: string;
  Credit: number | string;
  Debit: number | string;
  Balance: number;
  Time: string;
};

export type User = {
  id: number;
  name: string;
  balance: number;
  transactions: Transactions[];
};

export type TransactionType =
  | typeof WITHDRAW
  | typeof DEPOSIT
  | typeof TRANSFER
  | typeof CREDIT
  | typeof DEBIT

export const WITHDRAW = "withdraw";
export const DEPOSIT = "deposit";
export const TRANSFER = "transfer";

export const url = "http://127.0.0.1:8000";

export const INFO = "info";
export const REMOVE = "remove";
export const CREDIT = "credit";
export const DEBIT = "debit";

export enum API_URLS{
  GET_USERS='users',
  GET_USER = 'user',
  GET_IDS = 'ids',
  ADD_USER='add_user',
  REMOVE_USER='remove_user',
  WITHDRAW = 'withdraw',
  DEPOSIT = 'deposit',
  TRANSFER='transfer'
}

export const monthNames: string[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];