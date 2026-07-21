from pathlib import Path
import csv
from datetime import datetime


class HistoryService:

    def __init__(self):

        # Backend folder
        self.base_dir = Path(__file__).resolve().parents[2]

        # Backend/history
        self.history_folder = self.base_dir / "history"
        self.history_folder.mkdir(parents=True, exist_ok=True)

        self.history_file = self.history_folder / "prediction_history.csv"

        if not self.history_file.exists():

            with open(
                self.history_file,
                "w",
                newline="",
                encoding="utf-8"
            ) as file:

                writer = csv.writer(file)

                writer.writerow([
                    "Prediction_ID",
                    "Timestamp",
                    "Input_File",
                    "Output_File",
                    "Cloud_Coverage",
                    "Processing_Time",
                    "Model_Version",
                    "Status"
                ])

    def save_prediction(
        self,
        input_file,
        output_file,
        cloud_coverage,
        processing_time,
        status
    ):

        prediction_id = self.get_prediction_count() + 1

        with open(
            self.history_file,
            "a",
            newline="",
            encoding="utf-8"
        ) as file:

            writer = csv.writer(file)

            writer.writerow([
                prediction_id,
                datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
                input_file,
                output_file,
                cloud_coverage,
                processing_time,
                "ANTARISK-Net v1",
                status
            ])

    def get_prediction_count(self):

        if not self.history_file.exists():
            return 0

        with open(
            self.history_file,
            "r",
            encoding="utf-8"
        ) as file:

            return max(sum(1 for _ in file) - 1, 0)


history_service = HistoryService()