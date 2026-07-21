import torch
import cv2
import numpy as np
import os

from ai.models.antarisk_net import ANTARISKNet
from ai.evaluation.metrics import (
    calculate_mse,
    calculate_psnr,
    calculate_ssim
)

# ======================================
# Device
# ======================================

device = torch.device(
    "cuda" if torch.cuda.is_available() else "cpu"
)

# ======================================
# Load Model
# ======================================

model = ANTARISKNet().to(device)

model.load_state_dict(
    torch.load(
        "saved_models/antarisk_best.pth",
        map_location=device
    )
)

model.eval()

# ======================================
# Dataset Path
# ======================================

cloud_dir = "data/rice_dataset/RICE/RICE1/Test/cloud"
label_dir = "data/rice_dataset/RICE/RICE1/Test/label"

images = sorted(os.listdir(cloud_dir))

mse_list = []
psnr_list = []
ssim_list = []

# ======================================
# Evaluation Loop
# ======================================

with torch.no_grad():

    for image_name in images:

        cloud_path = os.path.join(cloud_dir, image_name)
        label_path = os.path.join(label_dir, image_name)

        cloudy = cv2.imread(cloud_path)
        target = cv2.imread(label_path)

        cloudy = cv2.cvtColor(cloudy, cv2.COLOR_BGR2RGB)
        target = cv2.cvtColor(target, cv2.COLOR_BGR2RGB)

        cloudy = cv2.resize(cloudy, (512, 512))
        target = cv2.resize(target, (512, 512))

        cloudy = cloudy.astype(np.float32) / 255.0
        target = target.astype(np.float32) / 255.0

        input_tensor = (
            torch.tensor(cloudy)
            .permute(2, 0, 1)
            .unsqueeze(0)
            .to(device)
        )

        prediction = model(input_tensor)

        prediction = (
            prediction.squeeze(0)
            .permute(1, 2, 0)
            .cpu()
            .numpy()
        )

        prediction = np.clip(prediction, 0, 1)

        mse = calculate_mse(prediction, target)
        psnr = calculate_psnr(prediction, target)
        ssim = calculate_ssim(prediction, target)

        mse_list.append(mse)
        psnr_list.append(psnr)
        ssim_list.append(ssim)

# ======================================
# Results
# ======================================

print("=" * 40)

print("Evaluation Results")

print("=" * 40)

print(f"Average MSE  : {np.mean(mse_list):.6f}")

print(f"Average PSNR : {np.mean(psnr_list):.2f} dB")

print(f"Average SSIM : {np.mean(ssim_list):.4f}")

print("=" * 40)