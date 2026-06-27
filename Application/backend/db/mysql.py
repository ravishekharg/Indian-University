import pymysql

def get_connection():
    return pymysql.connect(
        host="mysql-server",
        user="admin",
        password="admin123",
        database="university"
    )