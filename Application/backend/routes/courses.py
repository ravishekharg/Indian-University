from flask import Blueprint, current_app, jsonify

from db.mysql import get_connection

courses = Blueprint("courses", __name__)


@courses.route("/courses")
def get_courses():
    conn = None
    try:
        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute(
            """
            SELECT id, course_name, duration, fees
            FROM courses
            """
        )
        rows = cursor.fetchall()
        cursor.close()

        return jsonify(
            [
                {
                    "id": row["id"],
                    "course_name": row["course_name"],
                    "duration": row["duration"],
                    "fees": float(row["fees"]),
                }
                for row in rows
            ]
        )
    except Exception:
        # Log the real exception server-side; don't return internals to the client.
        current_app.logger.exception("Failed to fetch courses")
        return jsonify({"error": "unable to fetch courses"}), 500
    finally:
        if conn:
            conn.close()
