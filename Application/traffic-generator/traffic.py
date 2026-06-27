import requests

import random

import time

URL = "http://frontend-service"

while True:

    requests.get(
        f"{URL}"
    )

    requests.get(
        f"{URL}/api/dashboard"
    )

    requests.get(
        f"{URL}/api/students"
    )

    time.sleep(
        random.randint(1,5)
    )