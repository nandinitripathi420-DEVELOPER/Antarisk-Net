from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware

from app.services.model_service import model_service
from app.services.history_service import history_service

from app.api.upload import router as upload_router
from app.api.download import router as download_router
from app.api.history import router as history_router
from app.api.predict import router as predict_router

app = FastAPI(
    title="ANTARISK API",
    description="Cloud Removal API for LISS-IV Satellite Images",
    version="1.0.0",
)

# =====================================================
# CORS (Codespaces + Local Development)
# =====================================================

app.add_middleware(
    CORSMiddleware,
   allow_origins=[
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "https://antarisk-net.vercel.app",
],
    allow_origin_regex=r"https://.*\.app\.github\.dev",
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# =====================================================
# Static Files
# =====================================================

app.mount(
    "/outputs",
    StaticFiles(directory="outputs"),
    name="outputs",
)

app.mount(
    "/uploads",
    StaticFiles(directory="uploads"),
    name="uploads",
)

# =====================================================
# API Routers
# =====================================================

app.include_router(upload_router)
app.include_router(predict_router)
app.include_router(history_router)
app.include_router(download_router)

# =====================================================
# Home
# =====================================================

@app.get("/")
def home():
    return {
        "message": "Welcome to ANTARISK API 🚀"
    }

# =====================================================
# Health Check
# =====================================================

@app.get("/health")
def health():
    return {
        "status": "healthy",
        "model": "ANTARISK-Net",
        "version": "1.0.0",
        "device": str(model_service.device),
    }
