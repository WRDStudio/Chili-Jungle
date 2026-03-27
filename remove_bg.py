from PIL import Image
import os

def remove_background(input_path):
    print(f"Processing {input_path}...")
    try:
        img = Image.open(input_path).convert("RGBA")
        datas = img.getdata()
        
        # Sample top-left pixel for background color reference
        bg_ref = datas[0]
        print(f"Background reference color: {bg_ref}")
        
        new_data = []
        tolerance = 40 # Allow some variance for JPEG compression artifacts or lighting
        
        for item in datas:
            # Calculate color distance/difference
            # Euclidean-ish or just sum of diffs
            diff = sum([abs(item[i] - bg_ref[i]) for i in range(3)])
            
            if diff < tolerance:
                new_data.append((255, 255, 255, 0))
            else:
                new_data.append(item)

        img.putdata(new_data)
        img.save(input_path, "PNG")
        print(f"Successfully processed and overwrote {input_path}")
    except Exception as e:
        print(f"Error: {e}")

# Process the Tropical bottle
target = r"public/images/bottle-tropical2.png"

if os.path.exists(target):
    remove_background(target)
else:
    print(f"Target file not found: {target}")
