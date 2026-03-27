import os
import sys

log_file = "resize_log.txt"

def log(msg):
    with open(log_file, "a") as f:
        f.write(str(msg) + "\n")

log("Script started")

try:
    from PIL import Image
    log("PIL imported successfully")
except ImportError:
    log("Pillow not found. Attempting to install...")
    try:
        import subprocess
        subprocess.check_call([sys.executable, "-m", "pip", "install", "Pillow"])
        from PIL import Image
        log("Pillow installed and imported")
    except Exception as e:
        log(f"Failed to install Pillow: {e}")
        exit(1)

target_size = (960, 1088)
images = ["hero-image2.png", "bottle-classic.png", "bottle-tropical.png"]
base_path = "public/images"

for img_name in images:
    path = os.path.join(base_path, img_name)
    if not os.path.exists(path):
        log(f"Error: {path} not found.")
        continue
    
    try:
        with Image.open(path) as img:
            log(f"Processing {img_name}, original size: {img.size}")
            resized_img = img.resize(target_size, Image.Resampling.LANCZOS)
            resized_img.save(path)
            log(f"Success: Resized {img_name} to {target_size}")
    except Exception as e:
        log(f"Error processing {img_name}: {e}")

log("Script finished")
