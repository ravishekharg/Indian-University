import pymysql
import config


def get_connection():
    """
    Returns a new MySQL connection using credentials from the environment
    (see config.py). Credentials are never hardcoded here - they are
    injected at deploy time via the Kubernetes Secret / CI secret store.
    """
    return pymysql.connect(
        host=config.MYSQL_HOST,
        port=config.MYSQL_PORT,
        user=config.MYSQL_USER,
        password=config.MYSQL_PASSWORD,
        database=config.MYSQL_DATABASE,
        cursorclass=pymysql.cursors.DictCursor,
        connect_timeout=5,
    )
