import os
import re
from urllib.parse import urlparse

html_files = [f for f in os.listdir('.') if f.endswith('.html')]

broken_links = []
broken_images = []
broken_youtube = []

# List of known broken YouTube IDs from earlier (just a few of the main ones)
known_broken_yt = ["NVCD5sfNigI", "Hd5T3W9xTMg", "3K7AvWVX3dI", "g-WJY8jI4bA", "45g7dJnR9PM", "MthEgKPaYAM", "N30i2JEi2i0", "u5gvnMYfYjM", "_gkm2QoUpWs", "SCsECJ3lDhg", "CrLC5BPNu6k", "H2qnK5R5mjE", "uCFqm87-hT4", "yXS1Y2nvqoE", "I6S3z8IcGkA", "vWOHwI_FgAo", "E2ySMc4iT04", "6-oNSs_XMxI", "OOPHFQZ5aiM", "xOPl8gKdmYE"]

for file in html_files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
        
        # Check hrefs
        hrefs = re.findall(r'href=["\'](.*?)["\']', content)
        for href in hrefs:
            if href.startswith('http') or href.startswith('mailto:') or href.startswith('#') or href.startswith('javascript:'):
                if 'youtube.com' in href:
                    for broken in known_broken_yt:
                        if broken in href:
                            broken_youtube.append(f"{file}: {href} uses broken ID {broken}")
                continue
            
            # Remove query params or fragments for local file check
            local_path = href.split('?')[0].split('#')[0]
            if local_path and not os.path.exists(local_path):
                broken_links.append(f"{file}: Missing link target -> {local_path}")
                
        # Check srcs
        srcs = re.findall(r'src=["\'](.*?)["\']', content)
        for src in srcs:
            if src.startswith('http') or src.startswith('data:'):
                continue
            
            local_path = src.split('?')[0].split('#')[0]
            if local_path and not os.path.exists(local_path):
                broken_images.append(f"{file}: Missing source -> {local_path}")
                
        # Check data-ytid
        ytids = re.findall(r'data-ytid=["\'](.*?)["\']', content)
        for ytid in ytids:
            if ytid in known_broken_yt:
                 broken_youtube.append(f"{file}: data-ytid uses broken ID {ytid}")

print("--- BROKEN INTERNAL LINKS ---")
for b in set(broken_links): print(b)
print("\n--- BROKEN IMAGES/SCRIPTS ---")
for b in set(broken_images): print(b)
print("\n--- RESIDUAL BROKEN YOUTUBE IDs ---")
for b in set(broken_youtube): print(b)

