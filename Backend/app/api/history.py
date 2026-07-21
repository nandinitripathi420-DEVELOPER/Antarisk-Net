from fastapi import APIRouter
import csv
import os

router = APIRouter()


@router.get("/history")
def get_history():

    history_file = "history/prediction_history.csv"

    try:

        # ======================================
        # Check if history exists
        # ======================================

        if not os.path.exists(history_file):

            return {

                "success": False,

                "error": {

                    "code": "HISTORY_NOT_FOUND",

                    "message": "No prediction history found."

                }

            }

        history = []

        # ======================================
        # Read CSV
        # ======================================

        with open(history_file, "r", newline="") as file:

            reader = csv.DictReader(file)

            for row in reader:

                history.append({

                    "Prediction_ID": int(row["Prediction_ID"]),

                    "Timestamp": row["Timestamp"],

                    "Input_File": row["Input_File"],

                    "Output_File": row["Output_File"],

                    "Cloud_Coverage": float(row["Cloud_Coverage"]),

                    "Processing_Time": float(row["Processing_Time"]),

                    "Model_Version": row["Model_Version"],

                    "Status": row["Status"]

                })

        # ======================================
        # Success Response
        # ======================================

        return {

            "success": True,

            "message": "Prediction history retrieved successfully.",

            "data": {

                "total_predictions": len(history),

                "history": history

            }

        }

    except Exception as e:

        return {

            "success": False,

            "error": {

                "code": "HISTORY_READ_FAILED",

                "message": str(e)

            }

        }