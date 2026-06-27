import jwt
import bcrypt

from flask import Blueprint
from flask import request

auth = Blueprint(
    "auth",
    __name__
)

SECRET="gurram-university-secret"

@auth.route("/login", methods=["POST"])
def login():

    username = request.json["username"]
    password = request.json["password"]
    token = jwt.encode(
        {
            "user": username
        },
        SECRET,
        algorithm="HS256"
    )

    return {
        "token": token
    }