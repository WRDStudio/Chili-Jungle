import shutil
import os
import sys

src = r"C:\Users\Wardo\.gemini\antigravity\brain\079d2a77-32b0-42e4-89cf-c6f592db84fa\uploaded_image_1_1766626737735.png"
dest = r"C:\Users\Wardo\.gemini\antigravity\scratch\chili_jungle_webpage3\public\images\logo.png"

print(f"Source: {src}")
print(f"Dest: {dest}")

if not os.path.exists(src):
    print("ERROR: Source does not exist!")
    sys.exit(1)

try:
    shutil.copy2(src, dest)
    print("SUCCESS: File copied.")
    if os.path.exists(dest):
        print(f"Verified: {os.path.getsize(dest)} bytes")
    else:
        print("ERROR: File missing after copy")
except Exception as e:
    print(f"ERROR: Copy failed - {e}")
