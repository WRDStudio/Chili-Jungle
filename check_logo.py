from PIL import Image
import os

src = r"public\images\logo.png"
try:
    if os.path.exists(src):
        img = Image.open(src)
        print(f"Logo Dimensions: {img.width}x{img.height}")
    else:
        print("File not found")
except Exception as e:
    print(e)
