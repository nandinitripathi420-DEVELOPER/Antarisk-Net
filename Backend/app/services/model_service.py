from pathlib import Path

import torch

from ai.models.antarisk_net import ANTARISKNet


class ModelService:

    def __init__(self):

        # =====================================================
        # Project Paths
        # =====================================================

        self.base_dir = Path(__file__).resolve().parents[2]

        self.model_path = (
            self.base_dir /
            "saved_models" /
            "antarisk_best.pth"
        )

        # =====================================================
        # Device
        # =====================================================

        self.device = torch.device(
            "cuda" if torch.cuda.is_available() else "cpu"
        )

        # =====================================================
        # Model
        # =====================================================

        self.model = ANTARISKNet().to(self.device)

        if not self.model_path.exists():
            raise FileNotFoundError(
                f"Model file not found:\n{self.model_path}"
            )

        self.model.load_state_dict(
            torch.load(
                self.model_path,
                map_location=self.device
            )
        )

        self.model.eval()

        print(f"✅ ANTARISK-Net Loaded Successfully")
        print(f"📦 Model Path : {self.model_path}")
        print(f"🖥 Device     : {self.device}")

    def predict(self, image_tensor):

        image_tensor = image_tensor.to(self.device)

        with torch.no_grad():
            prediction = self.model(image_tensor)

        return prediction


model_service = ModelService()