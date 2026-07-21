import rasterio


def extract_metadata(image_path):

    with rasterio.open(image_path) as src:

        metadata = {
            "Filename": image_path.split("/")[-1],
            "Width": src.width,
            "Height": src.height,
            "Bands": src.count,
            "Data Type": src.dtypes[0],
            "Coordinate System": str(src.crs),
            "Resolution": src.res
        }

    return metadata