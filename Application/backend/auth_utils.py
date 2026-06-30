from functools import wraps

import jwt
from flask import jsonify, request

import config


def require_auth(view_func):
    """Decorator that rejects requests without a valid Bearer JWT."""

    @wraps(view_func)
    def wrapper(*args, **kwargs):
        header = request.headers.get("Authorization", "")
        if not header.startswith("Bearer "):
            return jsonify({"error": "missing bearer token"}), 401

        token = header.split(" ", 1)[1]
        try:
            jwt.decode(token, config.JWT_SECRET, algorithms=["HS256"])
        except jwt.ExpiredSignatureError:
            return jsonify({"error": "token expired"}), 401
        except jwt.InvalidTokenError:
            return jsonify({"error": "invalid token"}), 401

        return view_func(*args, **kwargs)

    return wrapper
