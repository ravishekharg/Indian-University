def test_login_rejects_missing_fields(client):
    response = client.post("/login", json={})
    assert response.status_code == 400


def test_login_rejects_unknown_user(client):
    # No MySQL available in this unit-test environment, so the auth route
    # should fail closed (503) rather than ever issuing a token.
    response = client.post(
        "/login", json={"username": "nobody", "password": "wrong"}
    )
    assert response.status_code in (401, 503)
    assert "token" not in response.get_json()
