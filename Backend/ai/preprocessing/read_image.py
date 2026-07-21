import rasterio
import matplotlib.pyplot as plt

image_path = "/workspaces/practice/sample.tif"

with rasterio.open(image_path) as src:
    image = src.read()

print("Shape:", image.shape)

# Convert from (bands, H, W) to (H, W, bands)
image = image.transpose(1, 2, 0)

plt.imshow(image)
plt.title("Satellite Image")
plt.axis("off")

# Save image instead of showing
plt.savefig("output.png")
print("Image saved as output.png")