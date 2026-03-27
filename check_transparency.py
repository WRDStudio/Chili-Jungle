from PIL import Image
import os

files = [
    'public/images/hero-image2.png',
    'public/images/bottle-classic2.png',
    'public/images/bottle-tropical2.png'
]

def check_transparency(path):
    try:
        if not os.path.exists(path):
            print(f"{path}: Not found")
            return

        img = Image.open(path)
        if img.mode != 'RGBA':
            print(f"{path}: No Alpha Channel (Mode: {img.mode})")
            return
        
        extrema = img.getextrema()
        # extrema[3] is the alpha channel min/max
        if extrema[3][0] < 255:
             print(f"{path}: Has Transparency")
        else:
             print(f"{path}: Alpha Channel exists but is fully opaque")
            
    except Exception as e:
        print(f"{path}: Error - {e}")

for f in files:
    check_transparency(f)
