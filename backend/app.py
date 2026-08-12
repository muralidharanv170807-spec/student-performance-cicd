from pathlib import Path

import joblib
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field


# --------------------------------------------------
# Create FastAPI application
# --------------------------------------------------

app = FastAPI(
    title="Student Performance Prediction API",
    description="API for predicting student academic performance",
    version="1.0.0",
)


# --------------------------------------------------
# CORS configuration
# --------------------------------------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# --------------------------------------------------
# Load trained machine learning model
# --------------------------------------------------

MODEL_PATH = Path(__file__).parent / "model" / "student_model.pkl"

model_data = joblib.load(MODEL_PATH)

model = model_data["model"]
label_encoder = model_data["label_encoder"]
features = model_data["features"]


# --------------------------------------------------
# Student input model
# --------------------------------------------------

class StudentInput(BaseModel):
    attendance: float = Field(ge=0, le=100)
    internal_marks: float = Field(ge=0, le=100)
    assignment_percentage: float = Field(ge=0, le=100)
    study_hours: float = Field(ge=0, le=24)
    previous_marks: float = Field(ge=0, le=100)


# --------------------------------------------------
# Home endpoint
# --------------------------------------------------

@app.get("/")
def home():
    return {
        "message": "Student Performance Prediction API is running"
    }


# --------------------------------------------------
# Health check endpoint
# --------------------------------------------------

@app.get("/health")
def health():
    return {
        "status": "healthy",
        "model_loaded": True
    }


# --------------------------------------------------
# Prediction endpoint
# --------------------------------------------------

@app.post("/predict")
def predict(student: StudentInput):

    input_data = [[
        student.attendance,
        student.internal_marks,
        student.assignment_percentage,
        student.study_hours,
        student.previous_marks,
    ]]

    # Predict performance
    prediction_number = model.predict(input_data)[0]

    # Convert numeric prediction back to text
    prediction = label_encoder.inverse_transform(
        [prediction_number]
    )[0]

    # Get prediction probabilities
    probabilities = model.predict_proba(input_data)[0]

    confidence = float(max(probabilities))

    return {
        "prediction": prediction,
        "confidence": round(confidence * 100, 2)
    }