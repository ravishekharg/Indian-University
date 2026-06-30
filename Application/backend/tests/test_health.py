def test_health_endpoint(client):
    response = client.get("/health")
    assert response.status_code == 200
    assert response.get_json()["status"] == "UP"


def test_liveness_and_readiness(client):
    assert client.get("/live").status_code == 200
    assert client.get("/ready").status_code == 200
