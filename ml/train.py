from pathlib import Path

import joblib
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder


# Project paths
ROOT = Path(__file__).resolve().parents[1]
DATA_PATH = ROOT / "dataset" / "student_performance.csv"
MODEL_DIR = ROOT / "backend" / "model"
MODEL_PATH = MODEL_DIR / "student_model.pkl"


# Load dataset
df = pd.read_csv(DATA_PATH)

# Input features
features = [
    "attendance",
    "internal_marks",
    "assignment_percentage",
    "study_hours",
    "previous_marks",
]

# Target
target = "performance"

X = df[features]
y = df[target]


# Convert text labels into numbers
label_encoder = LabelEncoder()
y_encoded = label_encoder.fit_transform(y)


# Split data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y_encoded,
    test_size=0.2,
    random_state=42,
    stratify=y_encoded,
)


# Create Random Forest model
model = RandomForestClassifier(
    n_estimators=100,
    random_state=42,
)


# Train the model
model.fit(X_train, y_train)


# Make predictions
y_pred = model.predict(X_test)


# Evaluate model
accuracy = accuracy_score(y_test, y_pred)

print("Model Training Completed")
print("------------------------")
print(f"Accuracy: {accuracy:.2%}")
print("\nClassification Report:")
print(
    classification_report(
        y_test,
        y_pred,
        target_names=label_encoder.classes_,
    )
)


# Create model directory
MODEL_DIR.mkdir(parents=True, exist_ok=True)


# Save model and encoder together
joblib.dump(
    {
        "model": model,
        "label_encoder": label_encoder,
        "features": features,
    },
    MODEL_PATH,
)


print(f"\nModel saved successfully:")
print(MODEL_PATH)