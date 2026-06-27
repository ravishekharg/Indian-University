from flask import Blueprint

from db.cassandra import get_session

from metrics.prometheus import (
    ATTENDANCE_REQUESTS,
    CASSANDRA_WRITES,
    API_ERRORS,
    REQUEST_LATENCY
)

attendance = Blueprint(
    "attendance",
    __name__
)

@attendance.route("/attendance")
def mark_attendance():

    try:

        with REQUEST_LATENCY.time():

            session = get_session()

            session.execute("""
                INSERT INTO attendance
                (
                    student_id,
                    attendance_date,
                    status
                )
                VALUES
                (
                    101,
                    toDate(now()),
                    'Present'
                )
            """)

            ATTENDANCE_REQUESTS.inc()

            CASSANDRA_WRITES.inc()

            return {
                "status": "success"
            }

    except Exception as ex:

        API_ERRORS.inc()

        return {
            "error": str(ex)
        }, 500