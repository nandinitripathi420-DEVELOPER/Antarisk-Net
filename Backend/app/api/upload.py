from pathlib import Path
import shutil

from fastapi import APIRouter, UploadFile, File

from utils.cloud_coverage import calculate_cloud_percentage
from utils.metadata import extract_metadata

router = APIRouter()

# =====================================================
# Project Paths
# =====================================================

BASE_DIR = Path(__file__).resolve().parents[2]

UPLOAD_FOLDER = BASE_DIR / "uploads"
UPLOAD_FOLDER.mkdir(parents=True, exist_ok=True)

UPLOAD_FILE = UPLOAD_FOLDER / "sample.png"

# =====================================================
# Upload Endpoint
# =====================================================

@router.post("/upload")
async def upload_image(file: UploadFile = File(...)):

    try:

        # Validate file

        if not file.filename:

            return {
                "success": False,
                "error": {
                    "code": "NO_FILE",
                    "message": "No file was uploaded."
                }
            }

        allowed_extensions = (
            ".png",
            ".jpg",
            ".jpeg",
            ".tif",
            ".tiff",
        )

        if not file.filename.lower().endswith(allowed_extensions):

            return {
                "success": False,
                "error": {
                    "code": "INVALID_FILE",
                    "message": "Only PNG, JPG, JPEG and GeoTIFF images are supported."
                }
            }

        # Save uploaded file

        with open(UPLOAD_FILE, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        # Calculate cloud coverage

        cloud_coverage = calculate_cloud_percentage(
            str(UPLOAD_FILE)
        )

        # Metadata

        if file.filename.lower().endswith((".tif", ".tiff")):

            try:
                metadata = extract_metadata(
                    str(UPLOAD_FILE)
                )

            except Exception as e:
                metadata = {
                    "error": str(e)
                }

        else:

            metadata = {
                "message": "Metadata available only for GeoTIFF images."
            }

        return {
            "success": True,
            "message": "Image uploaded successfully",
            "data": {
                "filename": file.filename,
                "path": str(UPLOAD_FILE),
                "cloud_coverage": cloud_coverage,
                "metadata": metadata,
            },
        }

    except Exception as e:

        return {
            "success": False,
            "error": {
                "code": "UPLOAD_FAILED",
                "message": str(e),
            },
        }