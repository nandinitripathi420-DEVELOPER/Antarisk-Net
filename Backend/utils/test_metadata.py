from utils.metadata import extract_metadata

metadata = extract_metadata("sample.tif")

print("\n===== Image Metadata =====\n")

for key, value in metadata.items():
    print(f"{key} : {value}")