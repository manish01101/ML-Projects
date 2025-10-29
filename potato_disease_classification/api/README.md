---
title: Potato Disease Classifier
emoji: 🥔
colorFrom: green
colorTo: yellow
sdk: docker
app_port: 8000
pinned: false
---

# Potato Disease Classifier

This Space runs a FastAPI backend serving a TensorFlow model that classifies potato leaf diseases.

## Endpoints

- `/hi` → health check  
- `/predict` → accepts an image file and returns disease prediction

## Run locally

```bash
docker build -t potato-disease .
docker run -p 8000:8000 potato-disease
