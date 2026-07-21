from ai.preprocessing.dataset import SatelliteDataset

dataset = SatelliteDataset(
    [
        "data/rice_dataset/RICE/RICE1",
        "data/rice_dataset/RICE/RICE2"
    ]
)

print("Total Images :", len(dataset))

cloudy, clear = dataset[0]

print(cloudy.shape)
print(clear.shape)