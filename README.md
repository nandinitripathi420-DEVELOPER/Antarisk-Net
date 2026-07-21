# 🌍 ANTARISK
## AI-Powered Cloud Removal & Reconstruction for Satellite Imagery

ANTARISK is an AI-powered web application that reconstructs cloud-obstructed satellite imagery using a deep learning model. The system provides an end-to-end workflow for uploading cloudy satellite images, performing AI-based reconstruction, visualizing results, comparing outputs, generating analysis reports, and maintaining prediction history through a modern web interface.

---

## 📖 Project Overview

Cloud cover is one of the major challenges in optical remote sensing, as it obscures valuable ground information and limits the usability of satellite imagery for environmental monitoring, agriculture, urban planning, and disaster management.

ANTARISK addresses this challenge using a deep learning-based image reconstruction pipeline capable of restoring cloud-covered regions while preserving important spatial structures and surface details.

The project integrates a **React + Vite** frontend with a **FastAPI + PyTorch** backend to provide a complete AI-powered cloud removal platform.

---

# ✨ Features

- 🛰 Upload cloud-covered satellite images
- 🤖 AI-powered cloud removal using ANTARISK-Net
- ⚡ Live AI processing timeline
- 🔍 Interactive Before & After comparison slider
- 📊 Reconstruction quality metrics
- 📄 Professional PDF analysis report generation
- 📂 Prediction history dashboard
- 💾 Download reconstructed images
- 🎨 Modern glassmorphism user interface
- 📱 Responsive design

---

# 🏗 System Architecture

```text
                  React + Vite Frontend
                           │
                           │ REST API
                           ▼
                  FastAPI Backend Server
                           │
         ┌─────────────────┴─────────────────┐
         │                                   │
   Image Upload                      AI Inference
         │                                   │
         └─────────────────┬─────────────────┘
                           │
                     ANTARISK-Net
                  (PyTorch Deep Learning)
                           │
                  Reconstructed Image
                           │
      ┌────────────────────┴────────────────────┐
      │                                         │
 Quality Metrics                      PDF Report Generator
                           │
                     Frontend Dashboard
```

---

# 💻 Technology Stack

## Frontend

- React.js
- Vite
- Tailwind CSS
- Framer Motion
- Lucide React

## Backend

- FastAPI
- PyTorch
- OpenCV
- Pillow
- NumPy

## AI & Deep Learning

- ANTARISK-Net
- Image Reconstruction
- Cloud Removal
- Satellite Image Processing

---

# 📂 Project Structure

```text
Backend/
│
├── app/
│   ├── api/
│   ├── services/
│   ├── schemas/
│   ├── config.py
│   └── main.py
│
├── datasets/
├── saved_models/
├── uploads/
├── outputs/
├── utils/
└── requirements.txt

frontend/
│
├── src/
│   ├── api/
│   ├── components/
│   ├── config/
│   ├── hooks/
│   └── utils/
│
└── package.json
```

---

# 🚀 Getting Started

## Clone the Repository

```bash
git clone https://github.com/<your-username>/<your-repository>.git

cd <your-repository>
```

---

## Backend Setup

```bash
cd Backend

pip install -r requirements.txt

python -m uvicorn app.main:app --reload
```

Backend runs on:

```
http://localhost:8000
```

---

## Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

# 🧠 AI Processing Pipeline

1. Upload satellite image
2. Detect cloud coverage
3. Preprocess image
4. Run ANTARISK-Net inference
5. Reconstruct cloud-covered regions
6. Calculate reconstruction metrics
7. Display Before & After comparison
8. Generate PDF analysis report
9. Store prediction history

---

# 📊 Output

The application generates:

- Reconstructed Satellite Image
- Cloud Coverage Percentage
- Processing Time
- Image Resolution
- Model Information
- Device Information
- Prediction Timestamp
- Downloadable PDF Analysis Report

---

# 📦 Dataset

The training dataset (**~1 GB**) is **not included** in this repository because of GitHub storage limitations.

This project uses the publicly available **RICE (Remote Sensing Images for Cloud Removal)** dataset. :contentReference[oaicite:0]{index=0}

**Dataset:**

:contentReference[oaicite:1]{index=1}

After downloading, place the dataset inside:

```text
Backend/data/
```

Example structure:

```text
Backend/data/
├── cloudy/
└── clear/
```

---

# 📸 Application Modules

- Landing Page
- Upload Workspace
- AI Processing Timeline
- Reconstruction Viewer
- Before & After Comparison
- Reconstruction Metrics
- Prediction History
- PDF Report Generation

---

# 🔮 Future Enhancements

- Difference Heatmap Visualization
- Cloud Mask Overlay
- Batch Image Processing
- GeoTIFF Export
- Interactive Image Inspector
- GIS Integration
- Authentication System
- Cloud Deployment
- Model Performance Dashboard

---

# 👨‍💻 Developer

**Anuj Kadam**

Data Science Student

---

# 📄 License

This project is developed for educational, research, and hackathon purposes.

---

# ⭐ Acknowledgements

- FastAPI
- PyTorch
- React
- Vite
- Tailwind CSS
- Framer Motion
- OpenCV
- RICE (Remote Sensing Images for Cloud Removal) Dataset :contentReference[oaicite:2]{index=2}

---

If you found this project useful, consider giving it a ⭐ on GitHub.