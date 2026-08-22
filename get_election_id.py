import urllib.request
import urllib.parse
import re

movie = "Election 1999 trailer"
query = urllib.parse.urlencode({"search_query": movie})
url = f"https://www.youtube.com/results?{query}"
req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
try:
    html = urllib.request.urlopen(req).read().decode("utf-8")
    matches = re.findall(r"watch\?v=([a-zA-Z0-9_-]{11})", html)
    if matches:
        unique_matches = []
        for m in matches:
            if m not in unique_matches:
                unique_matches.append(m)
        print(f"{movie}: {unique_matches[:4]}")
    else:
        print(f"No match for {movie}")
except Exception as e:
    print(f"Error for {movie}: {e}")
