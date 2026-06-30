import os
from dotenv import load_dotenv

load_dotenv()


def _require(name: str) -> str:
    """Fail fast at startup instead of silently running with None secrets."""
    value = os.getenv(name)
    if value is None:
        raise RuntimeError(f"Required environment variable '{name}' is not set")
    return value


# MySQL
MYSQL_HOST = os.getenv("MYSQL_HOST", "mysql-server")
MYSQL_PORT = int(os.getenv("MYSQL_PORT", "3306"))
MYSQL_USER = _require("MYSQL_USER")
MYSQL_PASSWORD = _require("MYSQL_PASSWORD")
MYSQL_DATABASE = os.getenv("MYSQL_DATABASE", "university")

# Cassandra
CASSANDRA_HOST = os.getenv("CASSANDRA_HOST", "cassandra-server")
CASSANDRA_PORT = int(os.getenv("CASSANDRA_PORT", "9042"))
CASSANDRA_KEYSPACE = os.getenv("CASSANDRA_KEYSPACE", "university")

# Auth
JWT_SECRET = _require("JWT_SECRET")
JWT_EXPIRY_MINUTES = int(os.getenv("JWT_EXPIRY_MINUTES", "60"))

# CORS - comma separated list of allowed origins, no wildcard default
ALLOWED_ORIGINS = [
    origin.strip()
    for origin in os.getenv("ALLOWED_ORIGINS", "").split(",")
    if origin.strip()
]

# Flask
FLASK_DEBUG = os.getenv("FLASK_DEBUG", "false").lower() == "true"
