from flask import Blueprint

from db.mysql import get_connection

dashboard = Blueprint(
    "dashboard",
    __name__
)

@dashboard.route("/dashboard")
def get_dashboard():

    conn = get_connection()

    cursor = conn.cursor()

    cursor.execute(
        "SELECT COUNT(*) FROM students"
    )

    students = cursor.fetchone()[0]

    cursor.execute(
        "SELECT COUNT(*) FROM courses"
    )

    courses = cursor.fetchone()[0]

    return {

        "students": students,

        "courses": courses,

        "faculty": 200,

        "placements": 450
    }