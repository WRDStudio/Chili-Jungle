from PIL import Image
import os

src = r"C:\Users\Wardo\.gemini\antigravity\brain\079d2a77-32b0-42e4-89cf-c6f592db84fa\uploaded_image_0_1766625781123.png"
dest = r"public\images\qr_extracted.png"

try:
    img = Image.open(src)
    w, h = img.width, img.height
    print(f"Original: {w}x{h}")
    
    # QR is usually on the far right. Let's guess the copy is clean.
    # Defining crop box: (left, upper, right, lower)
    # Let's take the right-most portion.
    # Assuming the QR code is roughly square and sits near the right edge.
    # Let's crop the right 25% of width?
    
    # A cleaner guess: The QR code is likely a square element.
    # Let's try to crop the a square from the right side, but with some padding.
    
    # Crop right-most square-ish area
    # left = w - (h * 0.8) # Approx square from right
    # Actually, visual check of labels usually has it not *at* the edge but close.
    
    # Let's just crop the right 25% for now and the user can check.
    crop_width = int(w * 0.22) # 22% of width
    left = w - crop_width - int(w * 0.02) # Start 2% from right edge? No, usually right edge.
    
    # Better: Start from w - h (if height < width)
    # Let's try:
    target_size = int(h * 0.6) # QR might be 60% of height
    top = int((h - target_size) / 2)
    left = w - target_size - int(w * 0.1) # 10% padding from right
    
    # Simpler approach: Just crop the right 1/4th.
    box = (int(w * 0.75), 0, w, h)
    
    qr_img = img.crop(box)
    qr_img.save(dest)
    print(f"Saved crop to {dest}")
    
except Exception as e:
    print(f"Error: {e}")
