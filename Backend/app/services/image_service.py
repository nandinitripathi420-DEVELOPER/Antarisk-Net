import os
import cv2
import numpy as np
import torch

from app.services.model_service import model_service


class ImageService:

    def preprocess(self, image_path):

        image = cv2.imread(image_path)

        if image is None:
            raise FileNotFoundError(
                f"Image not found: {image_path}"
            )

        image = cv2.cvtColor(
            image,
            cv2.COLOR_BGR2RGB
        )

        image = cv2.resize(
            image,
            (512, 512)
        )

        image = image.astype(np.float32) / 255.0

        image = torch.tensor(
            image,
            dtype=torch.float32
        ).permute(2, 0, 1)

        image = image.unsqueeze(0)

        return image

    def postprocess(self, prediction, output_path):

        prediction = prediction.squeeze(0)

        prediction = prediction.permute(1, 2, 0)

        prediction = prediction.detach().cpu().numpy()

        prediction = np.clip(prediction, 0, 1)

        prediction = (prediction * 255).astype(np.uint8)

        prediction = cv2.cvtColor(
            prediction,
            cv2.COLOR_RGB2BGR
        )

        os.makedirs(
            os.path.dirname(output_path),
            exist_ok=True
        )

        success = cv2.imwrite(
            output_path,
            prediction
        )

        if not success:
            raise RuntimeError(
                "Failed to save prediction image."
            )

        print(f"✅ Prediction saved: {output_path}")

        return output_path

    def predict_image(self, input_path, output_path):

        print("Loading image...")

        image_tensor = self.preprocess(input_path)

        image_tensor = image_tensor.to(
            model_service.device
        )

        print("Running ANTARISK model...")

        model_service.model.eval()

        with torch.no_grad():

            prediction = model_service.predict(
                image_tensor
            )

        print("Model inference complete.")

        output_path = self.postprocess(
            prediction,
            output_path
        )

        return output_path


image_service = ImageService()