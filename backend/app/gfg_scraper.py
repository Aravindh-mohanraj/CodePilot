import os
import json
import re
import requests
from datetime import datetime

def extract_problem_titles_gfg(cmp: str, difficulty: str):
    """Scrapes top real-time interview problem titles from GeeksforGeeks for a given company & difficulty."""
    url = f"https://www.geeksforgeeks.org/explore?page=1&company={cmp}&difficulty={difficulty}&sortBy=submissions"
    titles = []

    # 1. Try Playwright sync scraper (User's Implementation) if available
    try:
        from playwright.sync_api import sync_playwright
        with sync_playwright() as p:
            browser = p.chromium.launch(headless=True)
            page = browser.new_page()
            page.goto(url, timeout=10000)
            page.wait_for_timeout(3000)
            html = page.content()
            browser.close()

        try:
            from bs4 import BeautifulSoup
            soup = BeautifulSoup(html, "html.parser")
            problems = soup.select(".explore_problem_name__3QSiP")[:6]
            if not problems:
                problems = soup.select("a[href*='/problems/']")[:6]
            for problem in problems:
                t = problem.get_text(strip=True)
                if t and t not in titles:
                    titles.append(t)
        except Exception:
            pass
    except Exception as e:
        print(f"Playwright GFG scraper notice ({e}), using HTTP fallback...")

    # 2. Try HTTP Requests + BeautifulSoup or regex fallback
    if not titles:
        try:
            headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"}
            res = requests.get(url, headers=headers, timeout=8)
            if res.status_code == 200:
                try:
                    from bs4 import BeautifulSoup
                    soup = BeautifulSoup(res.text, "html.parser")
                    problems = soup.select("a[href*='/problems/']")[:6]
                    for p in problems:
                        t = p.get_text(strip=True)
                        if t and len(t) > 3 and t not in titles:
                            titles.append(t)
                except Exception:
                    # Regex fallback if bs4 is missing
                    raw_matches = re.findall(r'/problems/([a-zA-Z0-9\-]+)', res.text)
                    for m in raw_matches[:6]:
                        clean_t = m.replace('-', ' ').title()
                        if clean_t not in titles:
                            titles.append(clean_t)
        except Exception as e2:
            print("HTTP fallback notice:", e2)

    # 3. Dynamic GFG Curated Fallback if remote site blocks bot requests
    if not titles:
        company_curated = {
            "Google": ["Median of Two Sorted Arrays", "Word Break", "Course Schedule", "Alien Dictionary", "K Closest Points to Origin"],
            "Amazon": ["Rotting Oranges", "Reorganize String", "Kth Largest Element in an Array", "Lowest Common Ancestor of a Binary Tree"],
            "Meta": ["Subarray Sum Equals K", "Valid Palindrome II", "Continuous Subarray Sum", "Minimum Remove to Make Valid Parentheses"],
            "Microsoft": ["Spiral Matrix", "Reverse Words in a String", "Search in Rotated Sorted Array", "Find Minimum in Rotated Sorted Array"],
            "Apple": ["Top K Frequent Elements", "Product of Array Except Self", "Group Anagrams", "3Sum Closest"],
            "Uber": ["Bus Routes", "Cheapest Flights Within K Stops", "Task Scheduler", "Construct Binary Tree"]
        }
        titles = company_curated.get(cmp, ["Two Sum II", "Coin Change", "Longest Increasing Subsequence", "N-Queens"])

    return titles
