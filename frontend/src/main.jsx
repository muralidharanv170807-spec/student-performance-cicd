import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import "./style.css";

const API_URL = "https://student-performance-cicd.onrender.com/predict";

function App() {
  const [formData, setFormData] = useState({
    attendance: "",
    internal_marks: "",
    assignment_percentage: "",
    study_hours: "",
    previous_marks: "",
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setResult(null);
    setError("");

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          attendance: Number(formData.attendance),
          internal_marks: Number(formData.internal_marks),
          assignment_percentage: Number(formData.assignment_percentage),
          study_hours: Number(formData.study_hours),
          previous_marks: Number(formData.previous_marks),
        }),
      });

      if (!response.ok) {
        throw new Error("Prediction failed");
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError("Unable to connect to the prediction server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="card">
        <div className="header">
          <p className="tag">AI + MACHINE LEARNING</p>
          <h1>Student Performance Predictor</h1>
          <p className="subtitle">
            Predict student academic performance using a trained machine
            learning model.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="form">
          <div className="field">
            <label>Attendance (%)</label>
            <input
              type="number"
              name="attendance"
              min="0"
              max="100"
              value={formData.attendance}
              onChange={handleChange}
              placeholder="Enter attendance"
              required
            />
          </div>

          <div className="field">
            <label>Internal Marks</label>
            <input
              type="number"
              name="internal_marks"
              min="0"
              max="100"
              value={formData.internal_marks}
              onChange={handleChange}
              placeholder="Enter internal marks"
              required
            />
          </div>

          <div className="field">
            <label>Assignment Percentage (%)</label>
            <input
              type="number"
              name="assignment_percentage"
              min="0"
              max="100"
              value={formData.assignment_percentage}
              onChange={handleChange}
              placeholder="Enter assignment percentage"
              required
            />
          </div>

          <div className="field">
            <label>Study Hours / Day</label>
            <input
              type="number"
              name="study_hours"
              min="0"
              max="24"
              step="0.1"
              value={formData.study_hours}
              onChange={handleChange}
              placeholder="Enter study hours"
              required
            />
          </div>

          <div className="field">
            <label>Previous Marks</label>
            <input
              type="number"
              name="previous_marks"
              min="0"
              max="100"
              value={formData.previous_marks}
              onChange={handleChange}
              placeholder="Enter previous marks"
              required
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Predicting..." : "Predict Performance"}
          </button>
        </form>

        {error && <div className="error">{error}</div>}

        {result && (
          <div className="result">
            <p className="result-title">Prediction Result</p>

            <div className="prediction">
              {result.prediction}
            </div>

            <div className="confidence">
              Confidence: <strong>{result.confidence}%</strong>
            </div>
          </div>
        )}

        <div className="footer">
          <span>React</span>
          <span>FastAPI</span>
          <span>Scikit-learn</span>
          <span>Docker</span>
          <span>GitHub Actions</span>
        </div>
      </div>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);