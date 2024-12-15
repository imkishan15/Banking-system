from typing import List
from pydantic import BaseModel


class Transaction(BaseModel):
    transaction_type: str
    reason: str
    time: str


class User(BaseModel):
    id: int
    name: str
    balance: float
    transactions: List[Transaction]


class Withdraw(BaseModel):
    id: int
    amount: float


class Deposit(BaseModel):
    id: int
    amount: float


class Transfer(BaseModel):
    sender_id: int
    receiver_id: int
    amount: float
