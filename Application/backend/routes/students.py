import logging

from flask import Blueprint, jsonify

from db.mysql import get_connection

logger = logging.getLogger(__name__)

students = Blueprint("students", __name__)


@students.route("/students")
def get_students():
    conn = None
    try:
        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute(
            """
            SELECT id, first_name, last_name, email
            FROM students
            ORDER BY id
            LIMIT 200
            """
        )
        rows = cursor.fetchall()
        cursor.close()

        return jsonify([
            {
                "id": row["id"],
                "first_name": row["first_name"],
                "last_name": row["last_name"],
                "email": row["email"],
            }
            for row in rows
        ])
    except Exception:
        logger.exception("Failed to fetch students")
        return jsonify({"error": "failed to fetch students"}), 500
    finally:
        if conn is not None:
            conn.close()
