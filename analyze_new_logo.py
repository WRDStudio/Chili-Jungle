from PIL import Image
import os

def analyze_logo(path):
    print(f"Analyzing {path}...")
    try:
        if not os.path.exists(path):
            print("File not found.")
            return

        img = Image.open(path)
        print(f"Format: {img.format}")
        print(f"Mode: {img.mode}")
        print(f"Size: {img.size}")
        
        # Check for transparency
        if img.mode == 'RGBA':
            extrema = img.getextrema()
            if extrema[3][0] < 255:
                print("Transparency detected.")
            else:
                print("No transparency detected (alpha channel fully opaque).")
        
        # Sample center pixel color
        cx, cy = img.size[0] // 2, img.size[1] // 2
        pixel = img.getpixel((cx, cy))
        print(f"Center Pixel Color: {pixel}")
        
    except Exception as e:
        print(f"Error: {e}")

# Path to the new uploaded file
new_logo_path = r"C:\Users\Wardo\.gemini\antigravity\brain\079d2a77-32b0-42e4-89cf-c6f592db84fa\uploaded_image_1766706018353.png"

analyze_logo(new_logo_path)
