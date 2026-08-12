# Student Performance CI/CD

AI-based student performance prediction system with React, FastAPI, Scikit-learn, Docker, and GitHub Actions.

## Project structure

- `frontend/` - React frontend
- `backend/` - FastAPI backend and saved ML model
- `ml/` - model training and preprocessing
- `dataset/` - training dataset
- `.github/workflows/` - CI/CD workflow
- `Dockerfile` - backend container
- `docker-compose.yml` - local development orchestration

## Getting started

### Backend
```bash
cd backend
pip install -r requirements.txt
uvicorn app:app --reload
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

The ML training script can later be used to generate `backend/model/student_model.pkl`.
