import torch
import rasterio
import numpy as np
import matplotlib.pyplot as plt

from ai.models.antarisk_net import ANTARISKNet


# Device

device = torch.device(
    "cuda" if torch.cuda.is_available()
    else "cpu"
)


# Load model

model = ANTARISKNet().to(device)

model.load_state_dict(
    torch.load(
        "saved_models/antarisk_v1.pth",
        map_location=device
    )
)

model.eval()


# Load image

image_path = "sample.tif"

with rasterio.open(image_path) as src:
    image = src.read()


# Convert

image = np.transpose(image, (1, 2, 0))

image = image.astype(np.float32) / 255.0

tensor = torch.tensor(
    image,
    dtype=torch.float32
).permute(2, 0, 1)

tensor = tensor.unsqueeze(0).to(device)


# Prediction

with torch.no_grad():

    output = model(tensor)


# Convert output

output = output.squeeze(0)

output = output.permute(1, 2, 0)

output = output.cpu().numpy()

output = np.clip(output, 0, 1)


# Save image

plt.imshow(output)

plt.axis("off")

plt.title("ANTARISK Prediction")

plt.savefig(
    "outputs/prediction.png"
)

print(
    "Prediction saved at outputs/prediction.png"
)