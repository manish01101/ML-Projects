---
title: Potato Disease Classifier
emoji: 🥔
colorFrom: green
colorTo: yellow
sdk: docker
app_file: api/main.py
pinned: false
---

# Potato Disease Classifier

A full-stack **web application** that classifies **potato leaf diseases** — *Early Blight*, *Late Blight*, or *Healthy* — using a **TensorFlow/Keras CNN model**.  

Built with:
- **TensorFlow + Keras** for deep learning  
- **FastAPI** for the backend API  
- **React + TypeScript + Tailwind CSS** for the frontend  
- **Vercel** for frontend deployment  
- **Hugging Face Spaces / Docker** for backend deployment  

---

## Overview

Potatoes are globally important crops but are prone to diseases that can devastate yields.  
This app provides an easy interface to upload a potato leaf image and instantly receive a disease classification result.  
It is designed for **farmers, agronomists, and researchers** to aid early disease detection and better crop management.

---

## Model Details

- **Framework:** TensorFlow / Keras  
- **Architecture:** Convolutional Neural Network (CNN)  
- **Input size:** 256×256×3 (RGB images)  
- **Classes:**
  1. Early Blight 
  2. Late Blight  
  3. Healthy  

### Training Highlights
- Dataset: Open-source potato leaf dataset  
- Augmentations: Rotation, Zoom, Flip, Brightness adjustments  
- Optimizer: Adam  
- Accuracy: ~97% on validation data  

---

## Backend (FastAPI)

Located in the `/api` directory.

### Installation and Run Locally

```bash
cd api
pip install -r requirements.txt
uvicorn main:app --reload
````

Visit:

```
http://localhost:8000/docs
```

### API Endpoint

**POST** `/predict`

**Request (multipart/form-data):**

```
file: image (jpg/png)
```

**Response:**

```json
{
  "class": "Late Blight",
  "confidence": 0.9876
}
```
---

## Frontend (React + TypeScript + Tailwind)

Located in the `/frontend` directory.

### Setup

```bash
cd frontend
npm install
npm run dev
```

Then visit:

```
http://localhost:5173
```

Make sure the backend is running on `http://localhost:8000`.

### Environment Variables

Create `.env` file in `frontend/`:

```
VITE_API_URL=http://localhost:8000
```

Or set this to your deployed backend URL.

---

## Deployment

### Frontend (Vercel)

1. Push your frontend folder to GitHub
2. Import the repo into [Vercel](https://vercel.com/)
3. Add environment variable:

   ```
   VITE_API_URL=https://<your-backend-endpoint>
   ```
4. Deploy — and your web app is live!

---

### Backend (Hugging Face / Docker)

#### Option 1: Hugging Face Spaces

Hugging Face needs a YAML block (already included in README file in api folder).

Steps:

```bash
cd api
git lfs install
git add .
git commit -m "Deploy FastAPI backend"
git push
```

If your model file (`.keras`) is large, ensure it’s tracked with Git LFS:

```bash
git lfs track "*.keras"
```

#### Option 2: Docker Local

Run locally with Docker:

```bash
cd api
docker build -t potato-api .
docker run -p 8000:8000 potato-api
```

---

## End-to-End Flow

1. User uploads an image via frontend
2. Frontend sends the image to FastAPI `/predict` endpoint
3. Backend loads model → predicts disease
4. Frontend displays class name + confidence with a beautiful UI

---

## Tech Stack

| Layer          | Technology                                                 |
| -------------- | ---------------------------------------------------------- |
| **Frontend**   | React, TypeScript, Tailwind CSS                            |
| **Backend**    | FastAPI, Python                                            |
| **ML Model**   | TensorFlow, Keras                                          |
| **Deployment** | Vercel (frontend) + Hugging Face Spaces / Docker (backend) |

---

## Features
- Simple & responsive UI
- Drag-and-drop or click-to-upload image upload
- Real-time prediction with confidence score


---