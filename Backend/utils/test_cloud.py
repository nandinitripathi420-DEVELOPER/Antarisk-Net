from utils.cloud_coverage import calculate_cloud_percentage
image = "uploads/sample.png"

coverage = calculate_cloud_percentage(image)

print(f"Cloud Coverage : {coverage}%")