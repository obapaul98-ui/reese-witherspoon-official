import os
import re

js_files = [f for f in os.listdir('.') if f.endswith('.js')]

broken_links = []
broken_images = []

for file in js_files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
        
        # Check src or poster patterns (like in films.js)
        # e.g., poster: 'posters/Legally Blonde.jpg'
        srcs = re.findall(r'[\'"]([a-zA-Z0-9_\-\/]+\.(?:jpg|png|webp|jpeg|svg|gif))[\'"]', content)
        for src in srcs:
            if not os.path.exists(src):
                broken_images.append(f"{file}: Missing resource -> {src}")

print("--- BROKEN JS RESOURCES ---")
for b in set(broken_images): print(b)

