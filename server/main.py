from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from schema.user_schema import *
from methods.user_methods import *
from methods.transaction_methods import *

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/add_user/{name}")
async def create_user(name: str):
    return add_user(name)

@app.delete("/remove_user/{id}")
async def remove_user(id: int):
    return delete_user(id)


@app.put("/update_user/{id}")
async def modify_user(user: User, id: int):
    return update_user(user, id)

@app.get("/users")
async def get_all_users():
    return get_Users()

@app.get("/ids")
async def get_all_ids():
    return get_ids()

@app.get("/user/{id}")
async def get_user_by_id(id: int):
    return get_specific_user(id)

@app.post("/withdraw")
async def make_withdrawal(withdrawal: Withdraw):
    return make_transaction("withdrawal", withdrawal.amount, withdrawal.id)


@app.post("/deposit")
async def make_deposit(deposit: Deposit):
    return make_transaction("deposit", deposit.amount, deposit.id)


@app.post("/transfer")
async def make_transfer(transfer: Transfer):
    return transfer_money(transfer)


@app.get("/generate_statement/{id}")
async def make_statement(id: int):
    return generate_statement(id)
