from PIL import Image
try:
    img = Image.open('public/images/classic_label.png')
    print(f"Dimensions: {img.width}x{img.height}")
except Exception as e:
    print(e)
