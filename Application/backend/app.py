from flask import Flask
from flask import request
from flask import g
from time import time
from flask_cors import CORS
from prometheus_client import generate_latest
from metrics.prometheus import REQUEST_COUNT
from routes.students import students
from routes.courses import courses
from routes.attendance import attendance
from routes.auth import auth
from routes.dashboard import dashboard

import logging

app = Flask(__name__)

CORS(app)

logging.basicConfig(

    level=logging.INFO,

    format='%(asctime)s %(levelname)s %(message)s'
)

# --------------------------------------------------
# Prometheus Request Counter Middleware
# --------------------------------------------------

@app.before_request
def before_request():

    g.start_time = time()

    REQUEST_COUNT.inc()

    app.logger.info(
        f"{request.remote_addr} "
        f"{request.method} "
        f"{request.path}"
    )


@app.after_request
def after_request(response):

    if hasattr(g, "start_time"):
        duration = time() - g.start_time

        app.logger.info(
            f"{request.method} "
            f"{request.path} "
            f"status={response.status_code} "
            f"duration={duration:.4f}s"
        )

    return response

@app.route("/health")
def health():
    return {
        "status": "UP",
        "service": "backend-api"
    }, 200


# --------------------------------------------------
# Register Blueprints
# --------------------------------------------------

app.register_blueprint(students)
app.register_blueprint(courses)
app.register_blueprint(attendance)
app.register_blueprint(dashboard)
app.register_blueprint(auth)


# --------------------------------------------------
# Health Check
# --------------------------------------------------

@app.route("/")
def home():

    return {
        "application": "Gurram University Platform",
        "status": "UP"
    }


# --------------------------------------------------
# Readiness Probe
# --------------------------------------------------

@app.route("/ready")
def readiness():
    return {"status": "ready"}, 200


# --------------------------------------------------
# Liveness Probe
# --------------------------------------------------

@app.route("/live")
def liveness():
    return {"status": "alive"}, 200

# --------------------------------------------------
# Prometheus Metrics Endpoint
# --------------------------------------------------

@app.route("/metrics")
def metrics():

    return generate_latest(), 200, {
        "Content-Type": "text/plain"
    }


# --------------------------------------------------
# Application Entry Point
# --------------------------------------------------

if __name__ == "__main__":

    app.run(
        host="0.0.0.0",
        port=5000,
        debug=True
    )