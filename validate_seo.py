import os
import re
import json
import xml.etree.ElementTree as ET

html_files = [
    'index.html', 'about.html', 'films.html', 'reels.html',
    'gallery.html', 'explore.html', 'community.html', 'join.html', 'fan-card.html'
]

print("=== STARTING SEO & STRUCTURED DATA VALIDATION ===")

errors = []

# 1. Validate HTML files JSON-LD and Meta Tags
for file in html_files:
    if not os.path.exists(file):
        errors.append(f"Missing file: {file}")
        continue
        
    with open(file, 'r', encoding='utf-8') as f:
        html = f.read()
        
    # Check title
    title_match = re.search(r'<title>(.*?)</title>', html)
    if not title_match or not title_match.group(1):
        errors.append(f"{file}: Missing or empty <title>")
    else:
        print(f"✓ {file} title: {title_match.group(1)}")
        
    # Check description
    desc_match = re.search(r'<meta name="description" content="(.*?)"\s*/?>', html)
    if not desc_match or not desc_match.group(1):
        errors.append(f"{file}: Missing or empty meta description")
        
    # Check canonical link
    canon_match = re.search(r'<link rel="canonical" href="(.*?)"\s*/?>', html)
    if not canon_match or not canon_match.group(1):
        errors.append(f"{file}: Missing or empty canonical link")
        
    # Extract and parse JSON-LD scripts
    scripts = re.findall(r'<script type="application/ld\+json">\s*(.*?)\s*</script>', html, re.DOTALL)
    if not scripts:
        errors.append(f"{file}: No JSON-LD schema found")
    else:
        for idx, script_content in enumerate(scripts):
            try:
                data = json.loads(script_content)
                schema_type = data.get('@type', 'Unknown')
                print(f"  ✓ {file} JSON-LD [{idx+1}]: Valid {schema_type}")
            except Exception as e:
                errors.append(f"{file} JSON-LD [{idx+1}] JSON decode error: {e}")

# 2. Validate robots.txt
if os.path.exists('robots.txt'):
    with open('robots.txt', 'r') as f:
        robots_content = f.read()
    if 'Google-Extended' in robots_content and 'Sitemap:' in robots_content:
        print("✓ robots.txt verified with AI crawlers and Sitemap directive.")
    else:
        errors.append("robots.txt missing AI crawler directives or Sitemap.")
else:
    errors.append("robots.txt does not exist.")

# 3. Validate llms.txt
if os.path.exists('llms.txt'):
    with open('llms.txt', 'r') as f:
        llms_content = f.read()
    if 'Reese Witherspoon' in llms_content and 'https://reesewitherspoonofficial.com' in llms_content:
        print("✓ llms.txt verified with entity metadata and official site directory.")
    else:
        errors.append("llms.txt missing key entity info.")
else:
    errors.append("llms.txt does not exist.")

# 4. Validate sitemap.xml
if os.path.exists('sitemap.xml'):
    try:
        tree = ET.parse('sitemap.xml')
        root = tree.getroot()
        urls = root.findall('{http://www.sitemaps.org/schemas/sitemap/0.9}url')
        print(f"✓ sitemap.xml valid XML containing {len(urls)} page entries.")
    except Exception as e:
        errors.append(f"sitemap.xml XML parse error: {e}")
else:
    errors.append("sitemap.xml does not exist.")

print("\n=== SUMMARY ===")
if errors:
    print(f"FAILED with {len(errors)} errors:")
    for err in errors:
        print(f"  - {err}")
    exit(1)
else:
    print("SUCCESS: All SEO tags, JSON-LD schemas, robots.txt, llms.txt, and sitemap.xml are 100% valid!")
