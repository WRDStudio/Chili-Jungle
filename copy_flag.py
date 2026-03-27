import shutil
import os

src = r"C:\Users\Wardo\.gemini\antigravity\brain\0e35a5ee-b84b-4c0a-98a9-a405109415a1\uploaded_image_2_1768461159611.png"
dst = r"public\images\costa_rica_flag_round.png"

try:
    if not os.path.exists(src):
        print(f"Source does not exist: {src}")
    
    shutil.copy(src, dst)
    print(f"Successfully copied {src} to {dst}")
except Exception as e:
    print(f"Error copying: {e}")
