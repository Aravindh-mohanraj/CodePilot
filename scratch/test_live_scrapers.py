import requests
import json

def fetch_leetcode_realtime(company="Google", difficulty="Medium"):
    url = "https://leetcode.com/graphql"
    query = """
    query problemsetQuestionList($categorySlug: String, $limit: Int, $skip: Int, $filters: QuestionListFilterInput) {
      problemsetQuestionList: questionList(
        categorySlug: $categorySlug
        limit: $limit
        skip: $skip
        filters: $filters
      ) {
        questions: data {
          title
          difficulty
          topicTags {
            name
          }
        }
      }
    }
    """
    diff_map = {"Easy": "EASY", "Medium": "MEDIUM", "Hard": "HARD"}
    variables = {
        "categorySlug": "",
        "skip": 0,
        "limit": 10,
        "filters": {
            "difficulty": diff_map.get(difficulty, "MEDIUM")
        }
    }
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Content-Type": "application/json"
    }
    try:
        r = requests.post(url, json={"query": query, "variables": variables}, headers=headers, timeout=10)
        if r.status_code == 200:
            data = r.json()
            q_list = data.get("data", {}).get("problemsetQuestionList", {}).get("questions", [])
            titles = [q["title"] for q in q_list if "title" in q]
            return titles
    except Exception as e:
        print("LeetCode live API notice:", e)
    return []

def fetch_gfg_realtime(company="Google", difficulty="Medium"):
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    }
    # Try GFG RSS / HTML search
    url = f"https://www.geeksforgeeks.org/tag/{company.lower()}/"
    titles = []
    try:
        r = requests.get(url, headers=headers, timeout=8)
        if r.status_code == 200:
            from bs4 import BeautifulSoup
            soup = BeautifulSoup(r.text, "html.parser")
            headings = soup.find_all(["h2", "h3"], limit=10)
            for h in headings:
                txt = h.get_text(strip=True)
                if len(txt) > 5 and not txt.startswith("Geeks"):
                    titles.append(txt)
    except Exception as e:
        print("GFG HTML notice:", e)
    return titles

if __name__ == "__main__":
    print("Testing LeetCode Live API...")
    lc_titles = fetch_leetcode_realtime("Google", "Medium")
    print("LeetCode Live Titles:", lc_titles[:5])

    print("Testing GFG Tag Search...")
    gfg_titles = fetch_gfg_realtime("Google", "Medium")
    print("GFG Tag Titles:", gfg_titles[:5])
