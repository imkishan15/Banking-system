import json
import csv
from datetime import datetime

DATA_FILE = "./data/user.json"


def read_users() -> list:
    with open(DATA_FILE, "r", encoding="utf-8") as f:
        return json.load(f)


def write_users(users: list):
    with open(DATA_FILE, "w", encoding="utf-8") as file:
        json.dump(users, file, indent=2)


def add_user(name: str):
    users = read_users()
    new_user = {
        "id": (users[-1]["id"] + 1) if users else 1,  # Handle empty users
        "name": name,
        "balance": 0.0,
        "transactions": [],
    }
    users.append(new_user)
    write_users(users)
    return {"message": f"User {name} was added successfully!"}


def update_user(updated_user: dict, id: int):
    users = read_users()
    for index, user in enumerate(users):
        if user["id"] == id:
            users[index] = updated_user  # Update directly by index
            break
    write_users(users)
    return {"message": f"User {updated_user['name']} was updated successfully!"}


def delete_user(id: int):
    users = read_users()
    user_name = ""
    for user in users:
        if user["id"] == id:
            user_name = user["name"]
            users.remove(user)
            break
    write_users(users)
    return {"message": f"User {user_name} was deleted successfully!"}


def get_ids() -> list:
    users = read_users()
    return [user["id"] for user in users]


def get_specific_user(id: int) -> dict:
    users = read_users()
    for user in users:
        if user["id"] == id:
            return user
    return {"error": f"No user found with id: {id}"}


def get_time() -> str:
    return datetime.now().strftime("%I:%M %p %d %B %y")


def update_balance(user: dict, amount: int, transaction_type: str):
    if transaction_type == "withdrawal":
        if user["balance"] < amount:
            return {"error": f"Not enough balance for {user['name']}"}
        user["balance"] -= amount
    else:
        user["balance"] += amount
    return None


def log_transaction(user: dict, amount: int, transaction_type: str, reason: str):
    user["transactions"].append(
        {
            "type": "debit" if transaction_type == "withdrawal" else "credit",
            "amount": amount,
            "reason": reason,
            "time": get_time(),
        }
    )


def make_transaction(type: str, amount: int, id: int):
    users = read_users()
    user_name = ""
    for user in users:
        if user["id"] == id:
            balance_error = update_balance(user, amount, type)
            if balance_error:
                return balance_error
            log_transaction(user, amount, type, f"Made {type}")
            user_name = user["name"]
            break
    write_users(users)
    return {"message": f"Made {type} successfully for {user_name}"}


def transfer_money(transfer: dict):
    users = read_users()
    sender, receiver = None, None

    for user in users:
        if user["id"] == transfer["sender_id"]:
            sender = user
            if user["balance"] < transfer["amount"]:
                return {"error": f"Not enough balance for {user['name']}"}

    for user in users:
        if user["id"] == transfer["receiver_id"]:
            receiver = user
            receiver["balance"] += transfer["amount"]
            log_transaction(
                receiver,
                transfer["amount"],
                "credit",
                f"Received from {sender['name']}",
            )
            break

    if sender:
        sender["balance"] -= transfer["amount"]
        log_transaction(
            sender,
            transfer["amount"],
            "withdrawal",
            f"Transferred to {receiver['name']}",
        )

    write_users(users)
    return {"message": "Transfer made successfully!"}


def generate_statement(id: int):
    user = get_specific_user(id)
    transactions = user.get("transactions", [])
    if not transactions:
        return {"message": "No transactions yet!"}

    transformed_data = [
        {
            "Reason": entry["reason"],
            "Deposit": entry["amount"] if entry["type"] == "credit" else "-",
            "Withdrawal": entry["amount"] if entry["type"] == "debit" else "-",
            "Time": entry["time"],
        }
        for entry in transactions
    ]

    with open(
        f"reports/{user['name']}_statement.csv", mode="w", newline="", encoding="utf-8"
    ) as file:
        writer = csv.DictWriter(file, fieldnames=transformed_data[0].keys())
        writer.writeheader()
        writer.writerows(transformed_data)

    return {"message": "Statement report generated successfully!"}
