import datetime

import bcrypt
import jwt
from flask import Blueprint, jsonify, request

import config
from db.mysql import get_connection

auth = Blueprint("auth", __name__)


@auth.route("/login", methods=["POST"])
def login():
    body = request.get_json(silent=True) or {}
    username = body.get("username")
    password = body.get("password")

    if not username or not password:
        return jsonify({"error": "username and password are required"}), 400

    conn = None
    try:
        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute(
            "SELECT id, username, password_hash FROM users WHERE username = %s",
            (username,),
        )
        user = cursor.fetchone()
        cursor.close()
    except Exception:
        # Don't leak DB internals to the client
        return jsonify({"error": "authentication service unavailable"}), 503
    finally:
        if conn:
            conn.close()

    if not user or not bcrypt.checkpw(
        password.encode("utf-8"), user["password_hash"].encode("utf-8")
    ):
        # Same response whether the user doesn't exist or the password is
        # wrong, so the endpoint can't be used to enumerate usernames.
        return jsonify({"error": "invalid username or password"}), 401

    expires_at = datetime.datetime.utcnow() + datetime.timedelta(
        minutes=config.JWT_EXPIRY_MINUTES
    )
    token = jwt.encode(
        {
            "sub": user["id"],
            "user": user["username"],
            "exp": expires_at,
            "iat": datetime.datetime.utcnow(),
        },
        config.JWT_SECRET,
        algorithm="HS256",
    )

    return jsonify({"token": token, "expires_at": expires_at.isoformat()})
