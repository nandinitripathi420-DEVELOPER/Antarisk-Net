import cv2
import numpy as np

def preprocess_image(image):

    image = image.astype(np.float32)

    image = image / 255.0

    image = cv2.resize(image, (256, 256))

    return image