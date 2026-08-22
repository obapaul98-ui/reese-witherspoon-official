import os
import re

files = [
    'index.html', 'about.html', 'films.html', 'reels.html',
    'gallery.html', 'explore.html', 'community.html', 'join.html'
]

base_url = "https://reesewitherspoonofficial.com"
default_img = "https://reesewitherspoonofficial.com/reesewitherspoon/reesewitherspoon_1579478144_2225146406606465542_367315644.jpg"

for file in files:
    with open(file, 'r') as f:
        html = f.read()

    # Skip if already optimized to prevent duplicates
    if 'property="og:title"' in html:
        print(f"Skipping {file}, already has OG tags.")
        continue

    # Extract title
    title_match = re.search(r'<title>(.*?)</title>', html)
    title = title_match.group(1) if title_match else "Reese Witherspoon Official Fan Club"

    # Extract description
    desc_match = re.search(r'<meta name="description" content="(.*?)".*?>', html)
    description = desc_match.group(1) if desc_match else "Join the Reese Witherspoon Official Fan Club for exclusive news, early content drops, and community events."

    canonical_url = f"{base_url}/{file}" if file != 'index.html' else base_url

    seo_tags = f"""
  <!-- SEO & Open Graph Tags -->
  <link rel="canonical" href="{canonical_url}" />
  <meta property="og:title" content="{title}" />
  <meta property="og:description" content="{description}" />
  <meta property="og:image" content="{default_img}" />
  <meta property="og:url" content="{canonical_url}" />
  <meta property="og:type" content="website" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="{title}" />
  <meta name="twitter:description" content="{description}" />
  <meta name="twitter:image" content="{default_img}" />
</head>"""

    # Replace the closing </head> with the new tags + closing </head>
    html = html.replace('</head>', seo_tags)

    with open(file, 'w') as f:
        f.write(html)
        
    print(f"Added SEO tags to {file}")

print("SEO tags injected.")
