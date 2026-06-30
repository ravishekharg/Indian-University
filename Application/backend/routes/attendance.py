from flask import Blueprint, current_app, jsonify, request

from auth_utils import require_auth
from db.cassandra import get_session
from metrics.prometheus import (
    API_ERRORS,
    ATTENDANCE_REQUESTS,
    CASSANDRA_WRITES,
    REQUEST_LATENCY,
)

attendance = Blueprint("attendance", __name__)

VALID_STATUSES = {"Present", "Absent", "Late", "Excused"}


@attendance.route("/attendance/summary")
@require_auth
def attendance_summary():
    """
    Returns today's present/absent counts.

    Note: Cassandra's attendance table is partitioned by student_id, so
    there's no efficient global index to aggregate across students by
    status/date. ALLOW FILTERING is acceptable for this dataset's small
    demo scale; a production version should maintain a separate counter
    table (e.g. keyed by attendance_date) updated alongside each write
    instead of scanning here.
    """
    try:
        session = get_session()
        rows = session.execute(
            "SELECT status FROM attendance WHERE attendance_date = toDate(now()) ALLOW FILTERING"
        )
        present = absent = 0
        for row in rows:
            if row.status == "Present":
                present += 1
            elif row.status == "Absent":
                absent += 1
        return jsonify({"present": present, "absent": absent})
    except Exception:
        API_ERRORS.inc()
        current_app.logger.exception("Failed to summarize attendance")
        return jsonify({"error": "unable to summarize attendance"}), 500


@attendance.route("/attendance", methods=["POST"])
@require_auth
def mark_attendance():
    body = request.get_json(silent=True) or {}
    student_id = body.get("student_id")
    status = body.get("status", "Present")

    if not isinstance(student_id, int):
        return jsonify({"error": "student_id (integer) is required"}), 400
    if status not in VALID_STATUSES:
        return jsonify({"error": f"status must be one of {sorted(VALID_STATUSES)}"}), 400

    try:
        with REQUEST_LATENCY.time():
            session = get_session()
            session.execute(
                """
                INSERT INTO attendance (student_id, attendance_date, status)
                VALUES (%s, toDate(now()), %s)
                """,
                (student_id, status),
            )

            ATTENDANCE_REQUESTS.inc()
            CASSANDRA_WRITES.inc()

            return jsonify({"status": "success"})

    except Exception:
        API_ERRORS.inc()
        current_app.logger.exception("Failed to record attendance")
        return jsonify({"error": "unable to record attendance"}), 500
