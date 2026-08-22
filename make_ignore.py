import os
import re

# Read all html, css, js files
extensions = ('.html', '.css', '.js')
files_to_check = [f for f in os.listdir('.') if f.endswith(extensions)]

used_files = set()

for file in files_to_check:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
        # Find anything starting with reesewitherspoon/
        matches = re.findall(r'reesewitherspoon/[a-zA-Z0-9_\-\.]+', content)
        used_files.update(matches)

ignore_content = "reesewitherspoon/*\n"
for f in used_files:
    ignore_content += f"!{f}\n"
    
# also ignore python scripts
ignore_content += "*.py\n"

with open('.vercelignore', 'w', encoding='utf-8') as f:
    f.write(ignore_content)

print(f"Generated .vercelignore with {len(used_files)} explicit inclusions.")
