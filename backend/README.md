---
title: ClinicaSync API
emoji: 🧬
colorFrom: blue
colorTo: blue
sdk: docker
app_port: 7860
pinned: false
---

# ClinicaSync Backend API

This is the FastAPI backend for the ClinicaSync Drug Repurposing Workbench. 

## Deployment Info
- **Framework**: FastAPI
- **Engine**: Docker
- **Source**: Johnashraf7/ClinicaSync-Workbench (backend-deploy branch)

## Endpoints
- `GET /`: Health check
- `POST /predict`: Generate drug repurposing candidates for a disease.
