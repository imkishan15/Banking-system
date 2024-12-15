import json
from schema.user_schema import User

DATA_FILE = "./data/user.json"


def get_Users() -> list:
    with open(DATA_FILE, "r", encoding="utf-8") as f:
        # LOGGER.info("Requested for the data of all users")
        return json.load(f)


def write_users(users: list):
    with open(DATA_FILE, "w", encoding="utf-8") as file:
        json.dump(users, file, indent=2)


def add_user(name: str):
    users = get_Users()
    new_user = {
        "id": (users[-1]["id"] + 1) if users else 1,
        "name": name,
        "balance": 0.0,
        "transactions": [],
    }
    users.append(new_user)
    write_users(users)
    return {"message": f"User {name} was added successfully!"}


def update_user(updated_user: User, id: int):
    users = get_Users()
    for index, user in enumerate(users):
        if user["id"] == id:
            users[index] = updated_user
    write_users(users)
    return {"message": f"User {updated_user['name']} was updated successfully!"}


def delete_user(id: int):
    users = get_Users()
    user_name = ""
    for user in users:
        if user["id"] == id:
            user_name = user["name"]
            users.remove(user)
            break
    write_users(users)
    return {"message": f"User {user_name} was removed successfully!"}


def get_ids():
    users = get_Users()
    return [user["id"] for user in users]


def get_specific_user(id: int):
    users = get_Users()
    for user in users:
        if user["id"] == id:
            return user
    return {"error": f"No user found with id: {id}"}
