from PIL import Image
import os

try:
    classic_path = 'public/images/bottle-classic.png'
    tropical_path = 'public/images/bottle-tropical.png'
    
    if not os.path.exists(classic_path) or not os.path.exists(tropical_path):
        print("Files not found")
        exit()

    img_c = Image.open(classic_path)
    img_t = Image.open(tropical_path)
    
    target_height = img_c.height
    print(f"Target Height (Classic): {target_height}")
    
    # Calculate new width for tropical to maintain aspect ratio
    aspect_ratio = img_t.width / img_t.height
    new_width = int(target_height * aspect_ratio)
    
    print(f"Resizing Tropical from {img_t.size} to ({new_width}, {target_height})")
    
    img_t_resized = img_t.resize((new_width, target_height), Image.Resampling.LANCZOS)
    img_t_resized.save(tropical_path)
    print("Done resizing.")
    
except Exception as e:
    print(f"Error: {e}")
