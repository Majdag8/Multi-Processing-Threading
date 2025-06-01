# Multi-threading vs Multi-processing Performance Comparison

This project is a full-stack application designed to compare the performance of **multi-threading** and **multi-processing** when processing large arrays on the backend. It demonstrates and evaluates the speed and efficiency of these two concurrency models in handling heavy computational tasks.

---

## Project Overview

- **Frontend:** Built with **React** to provide a user-friendly interface for inputting data and displaying performance results.
- **Backend:** Powered by **Flask** to handle the processing of large arrays using multi-threading and multi-processing approaches.
- The backend exposes APIs to trigger processing with either concurrency model, and the frontend visualizes the comparative results.

---

## Features

- Submit large arrays to backend for processing.
- Choose between multi-threading or multi-processing for computation.
- Display runtime and performance metrics on the frontend.
- Easy to extend for other concurrency or parallelism models.

---

## Repo Structure

/frontend # React app source code, including components and UI logic
/backend # Flask backend source code, including API endpoints for multi-threading and multi-processing


---

## Getting Started

### Prerequisites

- Python 3.x  
- Node.js and npm/yarn  


###  Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate   # On Windows use `venv\Scripts\activate`
pip install -r requirements.txt
python app.py              # Starts the Flask server

```bash
cd frontend
npm install
npm start                  # Runs React app on http://localhost:3000


