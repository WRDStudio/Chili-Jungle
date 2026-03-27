import os

brain_dir = r"C:\Users\Wardo\.gemini\antigravity\brain\0e35a5ee-b84b-4c0a-98a9-a405109415a1"

print(f"Checking access to: {brain_dir}")

try:
    if os.path.exists(brain_dir):
        print("Directory exists.")
        files = os.listdir(brain_dir)
        print(f"I found {len(files)} files.")
        for f in files[:5]:
            print(f" - {f}")
    else:
        print("Directory does NOT exist.")
except Exception as e:
    print(f"Error listing directory: {e}")
