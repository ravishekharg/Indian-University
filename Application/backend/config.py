import os
from dotenv import load_dotenv

load_dotenv()

MYSQL_HOST = os.getenv("MYSQL_HOST")
MYSQL_PORT = os.getenv("MYSQL_PORT")

CASSANDRA_HOST = os.getenv("CASSANDRA_HOST")

JWT_SECRET = os.getenv("JWT_SECRET")