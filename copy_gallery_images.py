
import shutil
import os

images_map = {
    r"C:\Users\Wardo\.gemini\antigravity\brain\0e35a5ee-b84b-4c0a-98a9-a405109415a1\uploaded_image_1768467670736.jpg": "tamarindo_sunset.jpg",
    r"C:\Users\Wardo\.gemini\antigravity\brain\0e35a5ee-b84b-4c0a-98a9-a405109415a1\uploaded_image_0_1768468235523.jpg": "gallery_1.jpg",
    r"C:\Users\Wardo\.gemini\antigravity\brain\0e35a5ee-b84b-4c0a-98a9-a405109415a1\uploaded_image_1_1768468235523.jpg": "gallery_2.jpg",
    r"C:\Users\Wardo\.gemini\antigravity\brain\0e35a5ee-b84b-4c0a-98a9-a405109415a1\uploaded_image_2_1768468235523.jpg": "gallery_3.jpg",
    r"C:\Users\Wardo\.gemini\antigravity\brain\0e35a5ee-b84b-4c0a-98a9-a405109415a1\uploaded_image_3_1768468235523.jpg": "gallery_4.jpg",
    r"C:\Users\Wardo\.gemini\antigravity\brain\0e35a5ee-b84b-4c0a-98a9-a405109415a1\uploaded_image_4_1768468235523.jpg": "gallery_5.jpg"
}

dest_dir = r"c:\Users\Wardo\.gemini\antigravity\scratch\chili_jungle_webpage3\public\images"

if not os.path.exists(dest_dir):
    os.makedirs(dest_dir)

for src, name in images_map.items():
    try:
        dst = os.path.join(dest_dir, name)
        shutil.copy(src, dst)
        print(f"Copied {src} to {dst}")
    except Exception as e:
        print(f"Error copying {src}: {e}")
