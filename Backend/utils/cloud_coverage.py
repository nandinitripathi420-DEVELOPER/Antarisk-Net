import cv2
import numpy as np


def calculate_cloud_percentage(image_path):

    image = cv2.imread(image_path)

    image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

    gray = cv2.cvtColor(image, cv2.COLOR_RGB2GRAY)

    # Bright pixels are considered clouds
    _, cloud_mask = cv2.threshold(
        gray,
        170,
        255,
        cv2.THRESH_BINARY
    )

    cloud_pixels = np.sum(cloud_mask == 255)

    total_pixels = gray.shape[0] * gray.shape[1]

    percentage = (cloud_pixels / total_pixels) * 100

    return round(percentage, 2)