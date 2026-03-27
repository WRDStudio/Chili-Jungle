import shutil
import os

src1 = r"C:\Users\Wardo\.gemini\antigravity\brain\079d2a77-32b0-42e4-89cf-c6f592db84fa\uploaded_image_0_1766625781123.png"
dst1 = r"public\images\classic_label.png"

src2 = r"C:\Users\Wardo\.gemini\antigravity\brain\079d2a77-32b0-42e4-89cf-c6f592db84fa\uploaded_image_1_1766625781123.png"
dst2 = r"public\images\tropical_label.png"

try:
    shutil.copy(src1, dst1)
    print(f"Copied {src1} to {dst1}")
except Exception as e:
    print(f"Error copying 1: {e}")

try:
    shutil.copy(src2, dst2)
    print(f"Copied {src2} to {dst2}")
except Exception as e:
    print(f"Error copying 2: {e}")
