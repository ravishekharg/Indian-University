import logging

from flask import Blueprint, jsonify

from db.mysql import get_connection

logger = logging.getLogger(__name__)

dashboard = Blueprint("dashboard", __name__)


@dashboard.route("/dashboard")
def get_dashboard():
    conn = None
    try:
        conn = get_connection()
        cursor = conn.cursor()

        cursor.execute("SELECT COUNT(*) AS total FROM students")
        student_count = cursor.fetchone()["total"]

        cursor.execute("SELECT COUNT(*) AS total FROM courses")
        course_count = cursor.fetchone()["total"]

        cursor.close()

        return jsonify({
            "students": student_count,
            "courses": course_count,
        })
    except Exception:
        logger.exception("Failed to build dashboard summary")
        return jsonify({"error": "failed to build dashboard summary"}), 500
    finally:
        if conn is not None:
            conn.close()
