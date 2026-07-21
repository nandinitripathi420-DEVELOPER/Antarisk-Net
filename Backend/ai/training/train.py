import torch
import torch.nn as nn
import torch.optim as optim

from torch.utils.data import DataLoader
from torch.utils.data import random_split

from ai.models.antarisk_net import ANTARISKNet
from ai.preprocessing.dataset import SatelliteDataset


# ======================================
# Load Dataset
# ======================================

dataset = SatelliteDataset(
    [
        "data/rice_dataset/RICE/RICE1",
        "data/rice_dataset/RICE/RICE2"
    ]
)

print(f"Total Images : {len(dataset)}")


# ======================================
# Train / Validation Split
# ======================================

train_size = int(0.8 * len(dataset))
val_size = len(dataset) - train_size

train_dataset, val_dataset = random_split(
    dataset,
    [train_size, val_size]
)

print(f"Training Images : {len(train_dataset)}")
print(f"Validation Images : {len(val_dataset)}")


# ======================================
# DataLoader
# ======================================

train_loader = DataLoader(
    train_dataset,
    batch_size=8,
    shuffle=True
)

val_loader = DataLoader(
    val_dataset,
    batch_size=8,
    shuffle=False
)


# ======================================
# Device
# ======================================

device = torch.device(
    "cuda" if torch.cuda.is_available() else "cpu"
)

print("Using Device :", device)


# ======================================
# Model
# ======================================

model = ANTARISKNet().to(device)


# ======================================
# Loss
# ======================================

criterion = nn.MSELoss()


# ======================================
# Optimizer
# ======================================

optimizer = optim.Adam(
    model.parameters(),
    lr=0.0001
)


# ======================================
# Training
# ======================================

epochs = 100

best_val_loss = float("inf")

for epoch in range(epochs):

    model.train()

    train_loss = 0

    for cloudy, clear in train_loader:

        cloudy = cloudy.to(device)
        clear = clear.to(device)

        optimizer.zero_grad()

        prediction = model(cloudy)

        loss = criterion(
            prediction,
            clear
        )

        loss.backward()

        optimizer.step()

        train_loss += loss.item()

    train_loss /= len(train_loader)


    # ==========================
    # Validation
    # ==========================

    model.eval()

    val_loss = 0

    with torch.no_grad():

        for cloudy, clear in val_loader:

            cloudy = cloudy.to(device)
            clear = clear.to(device)

            prediction = model(cloudy)

            loss = criterion(
                prediction,
                clear
            )

            val_loss += loss.item()

    val_loss /= len(val_loader)


    print("-" * 50)

    print(f"Epoch {epoch+1}/{epochs}")

    print(f"Train Loss : {train_loss:.6f}")

    print(f"Validation Loss : {val_loss:.6f}")


    # ==========================
    # Save Best Model
    # ==========================

    if val_loss < best_val_loss:

        best_val_loss = val_loss

        torch.save(

            model.state_dict(),

            "saved_models/antarisk_best.pth"

        )

        print("✅ Best Model Saved")


print("\nTraining Completed Successfully")