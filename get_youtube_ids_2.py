import urllib.request
import urllib.parse
import re

movies = [
    "Legally Blonde 2001 trailer",
    "Sweet Home Alabama 2002 trailer",
    "Walk the Line 2005 trailer",
    "Water for Elephants 2011 trailer",
    "Wild 2014 trailer"
]

results = {}

for movie in movies:
    query = urllib.parse.urlencode({"search_query": movie})
    url = f"https://www.youtube.com/results?{query}"
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    try:
        html = urllib.request.urlopen(req).read().decode("utf-8")
        matches = re.findall(r"watch\?v=([a-zA-Z0-9_-]{11})", html)
        if matches:
            results[movie] = matches[0]
            print(f"{movie}: {matches[0]}")
        else:
            print(f"No match for {movie}")
    except Exception as e:
        print(f"Error for {movie}: {e}")

