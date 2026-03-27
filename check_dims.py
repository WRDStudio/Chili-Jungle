from PIL import Image
import os

files = ['public/images/bottle-classic.png', 'public/images/bottle-tropical.png']

for f in files:
    if os.path.exists(f):
        img = Image.open(f)
        print(f"{f}: {img.size}")
    else:
        print(f"{f}: Not found")
