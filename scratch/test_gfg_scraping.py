import requests
from bs4 import BeautifulSoup
import re

headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
}

print("1. Scraping GFG POTD...")
r1 = requests.get("https://www.geeksforgeeks.org/problem-of-the-day", headers=headers, timeout=10)
soup1 = BeautifulSoup(r1.text, "html.parser")
gfg_potd_titles = []
for a in soup1.select("a[href*='/problems/']"):
    txt = a.get_text(strip=True)
    if txt and len(txt) > 3 and txt not in gfg_potd_titles:
        gfg_potd_titles.append(txt)

print("GFG POTD Titles:", gfg_potd_titles[:5])

print("2. Scraping GFG Tag / Company...")
r2 = requests.get("https://www.geeksforgeeks.org/google-interview-experience/", headers=headers, timeout=10)
soup2 = BeautifulSoup(r2.text, "html.parser")
gfg_comp_titles = []
for h in soup2.select("h2, h3, .entry-title a"):
    txt = h.get_text(strip=True)
    if txt and len(txt) > 5 and not txt.startswith("Geeks") and txt not in gfg_comp_titles:
        gfg_comp_titles.append(txt)

print("GFG Company Titles:", gfg_comp_titles[:5])
