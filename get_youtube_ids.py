import urllib.request
import urllib.parse
import re
import json

movies = [
    "The Man in the Moon 1991 trailer",
    "Freeway 1996 trailer",
    "Fear 1996 trailer",
    "Pleasantville 1998 trailer",
    "Legally Blonde 2 2003 trailer",
    "Just Like Heaven 2005 trailer",
    "Rendition 2007 trailer",
    "Four Christmases 2008 trailer",
    "This Means War 2012 trailer",
    "Mud 2012 trailer",
    "The Good Lie 2014 trailer",
    "Hot Pursuit 2015 trailer",
    "Home Again 2017 trailer"
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

