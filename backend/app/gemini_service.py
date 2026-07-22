import os
import json
from dotenv import load_dotenv

load_dotenv()

api_key = os.getenv("GEMINI_API_KEY", "")

# Initialize Gemini if key available
genai = None
model = None

if api_key and api_key != "Your API Key":
    try:
        import google.generativeai as google_genai
        google_genai.configure(api_key=api_key)
        model = google_genai.GenerativeModel("gemini-1.5-flash")
        genai = google_genai
    except Exception as e:
        print(f"Gemini initialization error: {e}")

def generate_solution(question_title: str):
    """Generates complete problem statement, Python/Java solutions, examples, and test cases."""
    if model:
        schema = {
            "title": question_title,
            "category": "Arrays / Algorithms",
            "difficulty": "Medium",
            "statement": "Detailed problem statement text...",
            "examples": [{"input": "nums = [2,7,11,15], target = 9", "output": "[0,1]", "explanation": "2 + 7 = 9"}],
            "constraints": ["1 <= nums.length <= 10^4"],
            "explanation": "Logic explanation and O(N) complexity analysis...",
            "python_solution": "class Solution:\n    def solve(self):\n        pass",
            "java_solution": "class Solution {\n    public void solve() {}\n}",
            "test_cases": [{"input": "[2,7,11,15], 9", "output": "[0,1]", "explanation": "Passes"}]
        }

        prompt = f"""
You are an expert coding interview assistant.
Generate a complete interview question package for: '{question_title}'.
Return ONLY valid JSON with keys: title, category, difficulty, statement, examples, constraints, explanation, python_solution, java_solution, test_cases.
Schema template:
{json.dumps(schema, indent=2)}
"""

        try:
            response = model.generate_content(prompt)
            result = response.text.strip().replace("```json", "").replace("```", "").strip()
            return json.loads(result)
        except Exception as e:
            print(f"Gemini API error, using smart fallback: {e}")

    # Smart Fallback AI Solution
    return {
        "title": question_title,
        "category": "Data Structures & Algorithms",
        "difficulty": "Medium",
        "statement": f"Given the problem '{question_title}', design an optimal algorithm with minimum time and space complexity. Analyze edge cases and implement robust error handling.",
        "examples": [],
        "constraints": [
            "1 <= N <= 10^5",
            "-10^9 <= elements <= 10^9",
            "Time Complexity target: O(N) or O(N log N)"
        ],
        "explanation": f"### Optimal Solution Approach for {question_title}\n\n1. Analyze the requirements for {question_title}.\n2. Identify brute force bottlenecks.\n3. Optimize using appropriate data structures (e.g., Hash Maps, Two Pointers).",
        "python_solution": "",
        "java_solution": "",
        "test_cases": []
    }

def chat_with_ai(user_prompt: str, context: str = ""):
    """Provides real-time AI interview coaching responses."""
    if model:
        try:
            full_prompt = f"System Context: You are PrepForge AI, a top-tier technical interview coach.\nUser Context: {context}\nUser Question: {user_prompt}\nProvide a concise, highly insightful, markdown-formatted response."
            response = model.generate_content(full_prompt)
            return {"response": response.text.strip()}
        except Exception as e:
            print(f"Gemini Chat error: {e}")

    # Fallback Coaching Response
    prompt_lower = user_prompt.lower()
    if "dynamic programming" in prompt_lower or "dp" in prompt_lower:
        reply = "### Dynamic Programming Blueprint\n\n1. **Define State**: `dp[i]` represents optimal answer for subproblem size `i`.\n2. **Transition**: `dp[i] = min/max(dp[i-1], dp[i-2]) + cost[i]`.\n3. **Base Case**: Initialize initial array boundaries."
    elif "system design" in prompt_lower or "scale" in prompt_lower:
        reply = "### System Design Framework\n\n1. **Functional Requirements**: Read/Write throughput, Latency SLAs.\n2. **Storage**: SQL (ACID) vs NoSQL (Key-Value/Document).\n3. **Caching & CDN**: Redis / Memcached cluster for hot keys."
    else:
        reply = f"Great question regarding **{user_prompt}**! In technical interviews, first state your brute-force approach (e.g. O(N²)), then identify bottlenecks to optimize using Hash Maps or Two Pointers to hit O(N)."

    return {"response": reply}