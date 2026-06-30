import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))

os.environ.setdefault("MYSQL_USER", "test")
os.environ.setdefault("MYSQL_PASSWORD", "test")
os.environ.setdefault("JWT_SECRET", "test-secret")

import pytest

from app import app as flask_app


@pytest.fixture
def client():
    flask_app.testing = True
    with flask_app.test_client() as client:
        yield client
