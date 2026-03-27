import shutil
import os

source = r"C:\Users\Wardo\.gemini\antigravity\brain\079d2a77-32b0-42e4-89cf-c6f592db84fa\uploaded_image_1766706977795.png"
dest = r"C:\Users\Wardo\.gemini\antigravity\scratch\chili_jungle_webpage3\public\images\logo_hero.png"

print(f"Attempting to copy from {source} to {dest}")

if not os.path.exists(source):
    print("Source file does not exist!")
else:
    try:
        shutil.copy2(source, dest)
        print("Copy successful.")
        if os.path.exists(dest):
            print(f"Destination file size: {os.path.getsize(dest)} bytes")
        else:
            print("Destination file still not found after copy.")
    except Exception as e:
        print(f"Error copying file: {e}")
