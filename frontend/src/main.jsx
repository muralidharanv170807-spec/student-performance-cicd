import React, { useState } from "react";
import { createRoot } from "react-dom/client";

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

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);
    setResult(null);
    setError("");

    try {
      const response = await fetch("http://127.0.0.1:8000/predict", {
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
        throw new Error("Prediction request failed");
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(
        "Unable to connect to the prediction server. Make sure FastAPI is running."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Student Performance Predictor</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Attendance</label>
          <input
            type="number"
            name="attendance"
            min="0"
            max="100"
            value={formData.attendance}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Internal Marks</label>
          <input
            type="number"
            name="internal_marks"
            min="0"
            max="100"
            value={formData.internal_marks}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Assignment Percentage</label>
          <input
            type="number"
            name="assignment_percentage"
            min="0"
            max="100"
            value={formData.assignment_percentage}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Study Hours</label>
          <input
            type="number"
            name="study_hours"
            min="0"
            max="24"
            step="0.1"
            value={formData.study_hours}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Previous Marks</label>
          <input
            type="number"
            name="previous_marks"
            min="0"
            max="100"
            value={formData.previous_marks}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Predicting..." : "Predict Performance"}
        </button>
      </form>

      {error && <p>{error}</p>}

      {result && (
        <div>
          <h2>Prediction Result</h2>
          <p>
            Performance: <strong>{result.prediction}</strong>
          </p>
          <p>
            Confidence: <strong>{result.confidence}%</strong>
          </p>
        </div>
      )}
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);