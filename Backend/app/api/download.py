from fastapi import APIRouter
from fastapi.responses import FileResponse
import os

router = APIRouter()


@router.get("/download")
def download_prediction():

    output_file = "outputs/prediction.png"

    if not os.path.exists(output_file):

        return {

            "success": False,

            "error": {

                "code": "FILE_NOT_FOUND",

                "message": "Prediction image not found. Please run prediction first."

            }

        }

    return FileResponse(

        path=output_file,

        media_type="image/png",

        filename="prediction.png"

    )