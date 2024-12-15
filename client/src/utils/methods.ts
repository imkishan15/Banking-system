import axios from "axios";
import {
  CREDIT,
  DEBIT,
  FormattedTransactions,
  monthNames,
  Transactions,
  url,
  User,
} from "./util";

export const fetch = async (): Promise<User[]> => {
  try {
    const res = await axios.get(`${url}/users`);
    return res.data;
  } catch (e) {
    console.log(e);
  }
  return [];
};

export const fetchUser = async (id: number) => {
  try {
    const res = await axios.get(`${url}/user/${id}`);
    return res.data;
  } catch (e) {
    console.log(e);
  }
  return;
};

export const fetchStatement = async (id: number) => {
  try {
    const res = await axios.get(`${url}/generate_statement/${id}`);
    return res.data;
  } catch (e) {
    console.log(e);
  }
  return;
};

export const makeWithdrawal = async (id: number, amount: number) => {
  const body = {
    id: id,
    amount: amount,
  };
  try {
    const res = await axios.post(`${url}/withdraw`, body, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (e) {
    console.log(e);
  }
  return;
};

export const makeDeposit = async (id: number, amount: number) => {
  const body = {
    id: id,
    amount: amount,
  };
  try {
    const res = await axios.post(`${url}/deposit`, body, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (e) {
    console.log(e);
  }
  return;
};

export const makeTransfer = async (
  sender_id: number,
  receiver_id: number,
  amount: number
) => {
  const body = {
    sender_id: sender_id,
    receiver_id: receiver_id,
    amount: amount,
  };
  try {
    const res = await axios.post(`${url}/transfer`, body, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (e) {
    console.log(e);
  }
  return;
};

export const formatData = (
  transactions: Transactions[]
): FormattedTransactions[] =>
  transactions
    .map((entry) => ({
      Reason: entry.reason,
      Credit: entry.type === CREDIT ? entry.amount : "-",
      Debit: entry.type === DEBIT ? entry.amount : "-",
      Balance: entry.balance_now,
      Time: entry.time,
    }))
    .reverse();

export const getCurrentMonth = (): string => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth(); // Returns 0-based index
  return monthNames[currentMonth];
};