import logging
from time import time

from flask import Flask, request, g
from flask_cors import CORS
import config
from prometheus_client import generate_latest

import config
from metrics.prometheus import REQUEST_COUNT
from routes.students import students
from routes.courses import courses
from routes.attendance import attendance
from routes.auth import auth
from routes.dashboard import dashboard

app = Flask(__name__)

# Restrict CORS to explicitly configured origins instead of allowing all (*).
CORS(app, origins=config.ALLOWED_ORIGINS or [])

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s %(levelname)s %(name)s %(message)s",
)


@app.before_request
def before_request():
    g.start_time = time()
    REQUEST_COUNT.inc()
    app.logger.info("%s %s %s", request.remote_addr, request.method, request.path)


@app.after_request
def after_request(response):
    if hasattr(g, "start_time"):
        duration = time() - g.start_time
        app.logger.info(
            "%s %s status=%s duration=%.4fs",
            request.method,
            request.path,
            response.status_code,
            duration,
        )
    return response


@app.errorhandler(404)
def not_found(_err):
    return {"error": "not found"}, 404


@app.errorhandler(500)
def server_error(_err):
    app.logger.exception("Unhandled server error")
    return {"error": "internal server error"}, 500


app.register_blueprint(students)
app.register_blueprint(courses)
app.register_blueprint(attendance)
app.register_blueprint(dashboard)
app.register_blueprint(auth)


@app.route("/")
def home():
    return {"application": "Indian University Platform", "status": "UP"}


@app.route("/health")
def health():
    return {"status": "UP", "service": "backend-api"}, 200


@app.route("/ready")
def readiness():
    return {"status": "ready"}, 200


@app.route("/live")
def liveness():
    return {"status": "alive"}, 200


@app.route("/metrics")
def metrics():
    return generate_latest(), 200, {"Content-Type": "text/plain"}


if __name__ == "__main__":
    # debug must stay off outside local development; FLASK_DEBUG is opt-in via env.
    app.run(host="0.0.0.0", port=5000, debug=config.FLASK_DEBUG)
