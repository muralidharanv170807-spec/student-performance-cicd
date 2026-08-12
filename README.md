# AI-Based Student Performance Prediction System

An AI-based web application that predicts student academic performance using machine learning and provides an automated CI/CD pipeline using GitHub Actions, Docker, and Render.

## Live Application

Frontend:
https://student-performance-cicd-1.onrender.com

Backend API:
https://student-performance-cicd.onrender.com

API Documentation:
https://student-performance-cicd.onrender.com/docs

## Project Overview

The system accepts five student performance parameters:

- Attendance
- Internal Marks
- Assignment Percentage
- Study Hours
- Previous Marks

The trained machine learning model predicts the student's performance as:

- Good
- Average
- Poor

## Architecture

```text
User
  ↓
React Frontend
  ↓
FastAPI REST API
  ↓
Random Forest ML Model
  ↓
Prediction
  ↓
React Result Dashboard
