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
        print(f"Checking matches for {movie}:")
        for match in unique_matches[:10]:
            try:
                check_url = "https://www.youtube.com/watch?v=" + match
                check_req = urllib.request.Request(check_url, headers={"User-Agent": "Mozilla/5.0"})
                check_html = urllib.request.urlopen(check_req).read().decode("utf-8")
                if "Video unavailable" not in check_html and "This video isn't available anymore" not in check_html:
                    print(f"FOUND WORKING: {match}")
                    break
            except:
                pass
    else:
        print(f"No match for {movie}")
except Exception as e:
    print(f"Error for {movie}: {e}")
