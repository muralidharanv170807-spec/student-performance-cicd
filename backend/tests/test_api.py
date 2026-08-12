from fastapi.testclient import TestClient

from backend.app import app


client = TestClient(app)


def test_root():
    response = client.get("/")
    assert response.status_code == 200


def test_health():
    response = client.get("/health")
    assert response.status_code == 200


def test_predict():
    response = client.post(
        "/predict",
        json={
            "attendance": 85,
            "internal_marks": 78,
            "assignment_percentage": 90,
            "study_hours": 4,
            "previous_marks": 82,
        },
    )

    assert response.status_code == 200

    data = response.json()

    assert "prediction" in data
    assert "confidence" in data