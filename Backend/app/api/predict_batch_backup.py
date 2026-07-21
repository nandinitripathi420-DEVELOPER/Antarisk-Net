from fastapi import APIRouter, UploadFile, File

router = APIRouter()

@router.post("/predict-batch")
async def predict_batch(
    files: list[UploadFile] = File(...)
):
    return {
        "count": len(files),
        "filenames": [file.filename for file in files]
    }