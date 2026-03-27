import os

images_map = {
    r"C:\Users\Wardo\.gemini\antigravity\brain\0e35a5ee-b84b-4c0a-98a9-a405109415a1\uploaded_image_1768467670736.jpg": "tamarindo_sunset.jpg",
    r"C:\Users\Wardo\.gemini\antigravity\brain\0e35a5ee-b84b-4c0a-98a9-a405109415a1\uploaded_image_0_1768468235523.jpg": "gallery_1.jpg",
    r"C:\Users\Wardo\.gemini\antigravity\brain\0e35a5ee-b84b-4c0a-98a9-a405109415a1\uploaded_image_1_1768468235523.jpg": "gallery_2.jpg",
    r"C:\Users\Wardo\.gemini\antigravity\brain\0e35a5ee-b84b-4c0a-98a9-a405109415a1\uploaded_image_2_1768468235523.jpg": "gallery_3.jpg",
    r"C:\Users\Wardo\.gemini\antigravity\brain\0e35a5ee-b84b-4c0a-98a9-a405109415a1\uploaded_image_3_1768468235523.jpg": "gallery_4.jpg",
    r"C:\Users\Wardo\.gemini\antigravity\brain\0e35a5ee-b84b-4c0a-98a9-a405109415a1\uploaded_image_4_1768468235523.jpg": "gallery_5.jpg",
    r"C:\Users\Wardo\.gemini\antigravity\brain\0e35a5ee-b84b-4c0a-98a9-a405109415a1\uploaded_image_0_1768469524364.png": "logo_clean.png"
}

dest_dir = r"c:\Users\Wardo\.gemini\antigravity\scratch\chili_jungle_webpage3\public\images"

print(f"Starting copy to {dest_dir}")

for src, name in images_map.items():
    try:
        dst_path = os.path.join(dest_dir, name)
        with open(src, 'rb') as f_src:
            content = f_src.read()
            with open(dst_path, 'wb') as f_dst:
                f_dst.write(content)
        print(f"SUCCESS: Copied {name} ({len(content)} bytes)")
    except Exception as e:
        print(f"ERROR: Could not copy {name}: {e}")
