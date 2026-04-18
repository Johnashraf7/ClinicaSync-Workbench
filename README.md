# TheraMatch: Clinical-Grade Drug Repurposing Workbench

TheraMatch is a high-performance bioinformatics platform designed for computational drug repurposing. It integrates multi-omics data from Open Targets and pharmacological precision from EBI ChEMBL to identify novel therapeutic indications for established compounds.

## 🚀 Key Features

- **Tri-Layer Analytical Foundations**: Interactive dashboard for data provenance, clinical validation, and scoring methodology.
- **Clinical Validation Engine**: Cross-references predictions against real-world trial registries (Confirmed vs. Predicted status).
- **Pharma-Link Integration**: Direct access to ClinicalTrials.gov and verified ChEMBL Mechanism of Action (MoA) tables.
- **Explainable AI Pipeline**: Generates biological rationales for predicted drug-disease interactions using LLM-driven synthesis.
- **High-Performance UI**: Sterile-clinical dark mode with glassmorphic elements and real-time network visualizations.

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, Tailwind CSS, Recharts, Lucide Icons.
- **Backend**: Python FastAPI, NetworkX (Graph Theory), Open Targets GraphQL (v4), ChEMBL API.
- **Deployment**: Vercel (Frontend), Hugging Face Spaces / Docker (Backend).

## 📊 Scoring Methodology

Our **Network Proximity Coefficient** ranks candidates based on:
$$Score = \sum(w) \times \sqrt{n}$$
Where:
- $w$ = Genetic association weight of the target for the disease.
- $n$ = Number of shared genes/targets between the drug and the disease's genetic profile.

## 📦 Installation & Setup

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

---
**Developed for Clinical Research Empowerment**
*Contact: johniskros@gmail.com*
