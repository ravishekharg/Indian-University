"""
Utility to create/reset a user with a properly bcrypt-hashed password.

Usage:
    python scripts/create_user.py --username admin --password 'a-strong-password' --role admin

This intentionally requires an interactive/explicit invocation rather than
shipping a seeded user+password in version control.
"""
import argparse
import getpass

import bcrypt

import config
from db.mysql import get_connection


def create_user(username: str, password: str, role: str = "user") -> None:
    password_hash = bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")

    conn = get_connection()
    try:
        cursor = conn.cursor()
        cursor.execute(
            """
            INSERT INTO users (username, password_hash, role)
            VALUES (%s, %s, %s)
            ON DUPLICATE KEY UPDATE password_hash = VALUES(password_hash), role = VALUES(role)
            """,
            (username, password_hash, role),
        )
        cursor.close()
    finally:
        conn.close()

    print(f"User '{username}' created/updated with role '{role}'.")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--username", required=True)
    parser.add_argument("--role", default="user")
    parser.add_argument(
        "--password",
        help="If omitted, you will be prompted (preferred, avoids shell history).",
    )
    args = parser.parse_args()

    password = args.password or getpass.getpass("Password: ")
    create_user(args.username, password, args.role)
