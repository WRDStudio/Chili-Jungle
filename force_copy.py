import shutil
import os
import sys

src = r"C:\Users\Wardo\.gemini\antigravity\brain\0e35a5ee-b84b-4c0a-98a9-a405109415a1\uploaded_image_2_1768461159611.png"
dst_dir = r"public\images"
dst_file = r"costa_rica_flag_round.png"
dst_path = os.path.join(dst_dir, dst_file)

print(f"Starting debug copy script...")
print(f"Source: {src}")
print(f"Destination: {dst_path}")

# Check source
if os.path.exists(src):
    print(f"Source file EXISTS. Size: {os.path.getsize(src)} bytes")
else:
    print(f"ERROR: Source file does NOT exist!")
    sys.exit(1)

# Check dest dir
if os.path.exists(dst_dir):
    print(f"Destination dir EXISTS.")
else:
    print(f"ERROR: Destination dir does NOT exist!")
    sys.exit(1)

# Attempt copy
try:
    print("Attempting shutil.copy2...")
    shutil.copy2(src, dst_path)
    print("Copy function returned.")
    
    if os.path.exists(dst_path):
        print(f"SUCCESS: Destination file verified. Size: {os.path.getsize(dst_path)} bytes")
    else:
        print(f"FAILURE: File not found at destination after copy!")
except Exception as e:
    print(f"EXCEPTION during copy: {e}")
