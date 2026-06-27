from flask import Blueprint

from db.mysql import get_connection

courses = Blueprint(
    "courses",
    __name__
)

@courses.route("/courses")
def get_courses():

    conn = get_connection()

    cursor = conn.cursor()

    cursor.execute(
        """
        SELECT *
        FROM courses
        """
    )

    rows = cursor.fetchall()

    cursor.close()
    conn.close()

    return [
        {
            "id": row[0],
            "course_name": row[1],
            "duration": row[2],
            "fees": float(row[3])
        }
        for row in rows
    ]

try:
    ...
except Exception as e:
    return {
        "error": str(e)
    }, 500