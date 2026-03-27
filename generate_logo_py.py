import base64
import os

src = r"C:\Users\Wardo\.gemini\antigravity\brain\079d2a77-32b0-42e4-89cf-c6f592db84fa\uploaded_image_2_1766702471614.png"
dest = r"components\logoData.ts"

print("Reading source...")
try:
    with open(src, "rb") as image_file:
        encoded_string = base64.b64encode(image_file.read()).decode('utf-8')
    
    mime = "image/png"
    content = f'export const logoBase64 = "data:{mime};base64,{encoded_string}";\n'
    
    print("Writing to components/logoData.ts...")
    with open(dest, "w") as ts_file:
        ts_file.write(content)
        
    print("Success.")
except Exception as e:
    print(f"Error: {e}")
