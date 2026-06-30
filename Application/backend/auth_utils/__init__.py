import functools

import jwt
from flask import request, jsonify, g

import config


def require_auth(fn):
    """Decorator that validates a Bearer JWT and attaches the claims to flask.g.user."""

    @functools.wraps(fn)
    def wrapper(*args, **kwargs):
        header = request.headers.get("Authorization", "")
        if not header.startswith("Bearer "):
            return jsonify({"error": "missing or invalid Authorization header"}), 401

        token = header.removeprefix("Bearer ").strip()
        try:
            claims = jwt.decode(token, config.JWT_SECRET, algorithms=["HS256"])
        except jwt.ExpiredSignatureError:
            return jsonify({"error": "token expired"}), 401
        except jwt.InvalidTokenError:
            return jsonify({"error": "invalid token"}), 401

        g.user = claims
        return fn(*args, **kwargs)

    return wrapper
