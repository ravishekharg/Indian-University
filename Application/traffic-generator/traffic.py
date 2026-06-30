import logging
import os
import random
import time

import requests

logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")

URL = os.getenv("TARGET_URL", "http://frontend-service")
MIN_SLEEP = int(os.getenv("MIN_SLEEP_SECONDS", "1"))
MAX_SLEEP = int(os.getenv("MAX_SLEEP_SECONDS", "5"))

ENDPOINTS = ["", "/api/dashboard", "/api/students"]


def run():
    while True:
        for endpoint in ENDPOINTS:
            try:
                response = requests.get(f"{URL}{endpoint}", timeout=5)
                logging.info("GET %s -> %s", endpoint or "/", response.status_code)
            except requests.RequestException as exc:
                # Don't let a single failed request crash the generator loop
                logging.warning("GET %s failed: %s", endpoint or "/", exc)

        time.sleep(random.randint(MIN_SLEEP, MAX_SLEEP))


if __name__ == "__main__":
    run()
