import os
import cv2
import torch
import numpy as np

from torch.utils.data import Dataset


class SatelliteDataset(Dataset):

    def __init__(self, dataset_roots):

        self.samples = []

        for root in dataset_roots:

            cloud_dir = os.path.join(root, "cloud")
            label_dir = os.path.join(root, "label")

            images = sorted(os.listdir(cloud_dir))

            for image in images:

                self.samples.append(
                    (
                        os.path.join(cloud_dir, image),
                        os.path.join(label_dir, image)
                    )
                )

    def __len__(self):

        return len(self.samples)

    def __getitem__(self, idx):

        cloudy_path, clear_path = self.samples[idx]

        cloudy = cv2.imread(cloudy_path)
        clear = cv2.imread(clear_path)

        cloudy = cv2.cvtColor(cloudy, cv2.COLOR_BGR2RGB)
        clear = cv2.cvtColor(clear, cv2.COLOR_BGR2RGB)

        cloudy = cv2.resize(cloudy, (512, 512))
        clear = cv2.resize(clear, (512, 512))

        cloudy = cloudy.astype(np.float32) / 255.0
        clear = clear.astype(np.float32) / 255.0

        cloudy = torch.tensor(cloudy).permute(2, 0, 1)
        clear = torch.tensor(clear).permute(2, 0, 1)

        return cloudy, clear