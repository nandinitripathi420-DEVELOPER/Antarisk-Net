from pathlib import Path
import time
from datetime import datetime

from fastapi import APIRouter
from PIL import Image

from app.services.image_service import image_service
from app.services.history_service import history_service
from app.services.model_service import model_service

from utils.cloud_coverage import calculate_cloud_percentage

router = APIRouter()

# =====================================================
# Project Paths
# =====================================================

BASE_DIR = Path(__file__).resolve().parents[2]

UPLOADS_DIR = BASE_DIR / "uploads"
OUTPUTS_DIR = BASE_DIR / "outputs"

UPLOADS_DIR.mkdir(parents=True, exist_ok=True)
OUTPUTS_DIR.mkdir(parents=True, exist_ok=True)

INPUT_IMAGE = UPLOADS_DIR / "sample.png"
OUTPUT_IMAGE = OUTPUTS_DIR / "prediction.png"


@router.post("/predict")
def predict():

    print("\n========== ANTARISK PREDICTION ==========")

    # ======================================
    # Check if image exists
    # ======================================

    if not INPUT_IMAGE.exists():

        print("❌ Input image not found:", INPUT_IMAGE)

        return {
            "success": False,
            "error": {
                "code": "IMAGE_NOT_FOUND",
                "message": "No image found. Please upload an image before prediction."
            }
        }

    print("✅ Input image found")

    try:

        # ======================================
        # Read Image Resolution
        # ======================================

        with Image.open(INPUT_IMAGE) as img:
            width, height = img.size

        # ======================================
        # Cloud Coverage
        # ======================================

        print("Calculating cloud coverage...")

        cloud_coverage = calculate_cloud_percentage(
            str(INPUT_IMAGE)
        )

        print(f"Cloud Coverage: {cloud_coverage}")

        # ======================================
        # Prediction
        # ======================================

        print("Running ANTARISK-Net...")

        start_time = time.time()

        image_service.predict_image(
            str(INPUT_IMAGE),
            str(OUTPUT_IMAGE)
        )

        end_time = time.time()

        processing_time = round(
            end_time - start_time,
            3
        )

        print(f"Processing Time: {processing_time}s")

        # ======================================
        # Verify Output
        # ======================================

        if not OUTPUT_IMAGE.exists():

            raise RuntimeError(
                "Prediction finished but output image was not created."
            )

        print("✅ Output image created successfully")

        # ======================================
        # Save Prediction History
        # ======================================

        history_service.save_prediction(
            input_file=INPUT_IMAGE.name,
            output_file=OUTPUT_IMAGE.name,
            cloud_coverage=cloud_coverage,
            processing_time=processing_time,
            status="Success"
        )

        print("✅ Prediction completed successfully\n")

        # ======================================
        # Success Response
        # ======================================

        return {

            "success": True,

            "message": "Prediction completed successfully",

            "data": {

                "output": "outputs/prediction.png",

                "cloud_coverage": cloud_coverage,

                "processing_time_seconds": processing_time,

                "resolution": {
                    "width": width,
                    "height": height
                },

                "device": str(model_service.device),

                "model": "ANTARISK-Net",

                "prediction_time": datetime.now().strftime(
                    "%d-%m-%Y %H:%M:%S"
                )

            }

        }

    except FileNotFoundError as e:

        print("❌ FileNotFoundError:", e)

        return {
            "success": False,
            "error": {
                "code": "FILE_NOT_FOUND",
                "message": str(e)
            }
        }

    except ValueError as e:

        print("❌ ValueError:", e)

        return {
            "success": False,
            "error": {
                "code": "INVALID_IMAGE",
                "message": str(e)
            }
        }

    except RuntimeError as e:

        print("❌ RuntimeError:", e)

        return {
            "success": False,
            "error": {
                "code": "MODEL_ERROR",
                "message": str(e)
            }
        }

    except Exception as e:

        print("❌ Unexpected Error:", e)

        return {
            "success": False,
            "error": {
                "code": "PREDICTION_FAILED",
                "message": str(e)
            }
        }