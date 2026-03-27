import shutil
import os
import sys

log_file = r"C:\Users\Wardo\.gemini\antigravity\scratch\chili_jungle_webpage3\deploy_debug.log"

def log(msg):
    with open(log_file, "a") as f:
        f.write(msg + "\n")
    print(msg)

source = r"C:\Users\Wardo\.gemini\antigravity\brain\079d2a77-32b0-42e4-89cf-c6f592db84fa\uploaded_image_1766706977795.png"
dest = r"C:\Users\Wardo\.gemini\antigravity\scratch\chili_jungle_webpage3\public\images\logo_hero.png"

log("Starting deployment...")
if not os.path.exists(source):
    log(f"ERROR: Source not found: {source}")
else:
    log(f"Source size: {os.path.getsize(source)} bytes")
    try:
        shutil.copy2(source, dest)
        log("Copy command executed.")
        if os.path.exists(dest):
             log(f"SUCCESS: Dest exists. Size: {os.path.getsize(dest)}")
        else:
             log("ERROR: Dest still missing after copy.")
    except Exception as e:
        log(f"EXCEPTION: {e}")

log("Done.")
