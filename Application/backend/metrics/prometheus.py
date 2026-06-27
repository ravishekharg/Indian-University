from prometheus_client import Counter
from prometheus_client import Histogram

REQUEST_COUNT = Counter(
    "http_requests_total",
    "Total Requests"
)

STUDENT_SEARCHES = Counter(
    "student_search_total",
    "Student Searches"
)

COURSE_REQUESTS = Counter(
    "course_requests_total",
    "Course Requests"
)

ATTENDANCE_REQUESTS = Counter(
    "attendance_requests_total",
    "Attendance Requests"
)

MYSQL_QUERIES = Counter(
    "mysql_queries_total",
    "Total MySQL Queries"
)

CASSANDRA_WRITES = Counter(
    "cassandra_writes_total",
    "Total Cassandra Writes"
)

API_ERRORS = Counter(
    "api_errors_total",
    "API Errors"
)

REQUEST_LATENCY = Histogram(
    "request_latency_seconds",
    "Request Latency"
)