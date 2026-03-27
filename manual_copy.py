import os

src = r"C:\Users\Wardo\.gemini\antigravity\brain\0e35a5ee-b84b-4c0a-98a9-a405109415a1\uploaded_image_2_1768461159611.png"

try:
    with open(src, 'rb') as f:
        data = f.read()
        print(f"Read {len(data)} bytes from source.")
        
    dst = r"public\images\costa_rica_flag_round.png"
    with open(dst, 'wb') as f:
        f.write(data)
        print(f"Wrote {len(data)} bytes to dest.")

except Exception as e:
    print(f"Error: {e}")
