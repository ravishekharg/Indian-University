from flask import Blueprint

from db.mysql import get_connection

students = Blueprint(
    "students",
    __name__
)

@students.route("/students")
def get_students():

    conn = get_connection()

    cursor = conn.cursor()

    cursor.execute(
        """
        SELECT
            id,
            first_name,
            last_name,
            email
        FROM students
        """
    )

    rows = cursor.fetchall()

    result = []

    for row in rows:

        result.append({

            "id": row[0],

            "first_name": row[1],

            "last_name": row[2],

            "email": row[3]
        })

    cursor.close()
    conn.close()
    
    return result