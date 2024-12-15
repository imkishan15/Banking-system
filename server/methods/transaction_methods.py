import csv
from datetime import datetime
from methods.user_methods import *
from schema.user_schema import Transfer


def get_time():
    return datetime.now().strftime("%I:%M %p %d %B %y")


def withdraw_from_balance(user: dict, amount: int):
    if user["balance"] < amount:
        return {"error": f"Not enough balance for {user['name']}"}
    user["balance"] -= amount
    return None


def log_transaction(user: dict, amount: int, transaction_type: str, reason: str):
    user["transactions"].append(
        {
            "type": "debit" if transaction_type == "withdrawal" else "credit",
            "amount": amount,
            "reason": reason,
            "balance_now": user["balance"],
            "time": get_time(),
        }
    )


def make_transaction(type: str, amount: int, id: int):
    users = get_Users()
    user_name = ""
    for user in users:
        if user["id"] == id:
            if type == "withdrawal":
                withdrawal_error = withdraw_from_balance(user, amount)
                if withdrawal_error:
                    return withdrawal_error
            else:
                user["balance"] += amount
            log_transaction(user, amount, type, f"Made {type}")
            user_name = user["name"]
            break
    write_users(users)
    return {"message": f"Made {type} successfully for {user_name}"}


def transfer_money(transfer: Transfer):
    users = get_Users()
    sender = ""
    for user in users:
        if user["id"] == transfer.sender_id:
            sender = user["name"]
            withdrawal_error = withdraw_from_balance(user, transfer.amount)
            if withdrawal_error:
                return withdrawal_error

    for user in users:
        if user["id"] == transfer.receiver_id:
            user["balance"] += transfer.amount
            log_transaction(user, transfer.amount, "credit", f"Received from {sender}")
            break
    for user in users:
        if user["id"] == transfer.sender_id:
            log_transaction(
                user, transfer.amount, "withdrawal", f"Transferred to {user['name']}"
            )
            LOGGER.info("Made transaction from %s to %s", sender, user["name"])

    write_users(users)
    return {"message": "Transfer made successfully!"}


def generate_statement(id: int):
    user = get_specific_user(id)
    transactions = user.get("transactions", [])
    if not transactions:
        return []

    transformed_data = [
        {
            "Reason": entry["reason"],
            "Deposit": entry["amount"] if entry["type"] == "credit" else "-",
            "Withdrawal": entry["amount"] if entry["type"] == "debit" else "-",
            "Balance": entry["balance_now"],
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
    return transformed_data
