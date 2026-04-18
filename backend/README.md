---
title: TheraMatch API
emoji: 🧬
colorFrom: cyan
colorTo: blue
sdk: docker
app_port: 7860
pinned: false
---

# TheraMatch Backend API

This is the FastAPI backend for the TheraMatch Drug Repurposing Workbench. 

## Deployment Info
- **Framework**: FastAPI
- **Engine**: Docker
- **Source**: Johnashraf7/TheraMatch-Workbench (backend-deploy branch)

## Endpoints
- `GET /`: Health check
- `POST /predict`: Generate drug repurposing candidates for a disease.
