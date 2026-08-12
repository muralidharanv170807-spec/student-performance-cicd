import pandas as pd

FEATURES = [
    "attendance",
    "internal_marks",
    "assignment_percentage",
    "study_hours",
    "previous_marks",
]

TARGET = "performance"


def load_data(path: str) -> pd.DataFrame:
    return pd.read_csv(path)
