"""
CodePilot Question Bank Generator
Uses Gemini AI to generate rich programming + non-coding reference questions
and inserts them into the SQLite database.
Run once locally: python generate_questions.py
"""

import sys
import os
import json
import sqlite3
from datetime import datetime

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

# ─── Gemini setup ───────────────────────────────────────────────────────────
from dotenv import load_dotenv

# Load from backend/.env
env_path = os.path.join(os.path.dirname(__file__), "backend", ".env")
load_dotenv(env_path)

GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY", "")
print(f"Using API key: {'OK' if GEMINI_API_KEY and GEMINI_API_KEY != 'Your API Key' else 'NOT SET - please set GEMINI_API_KEY in backend/.env'}")

if not GEMINI_API_KEY or GEMINI_API_KEY == "Your API Key":
    print("ERROR: Please set your real GEMINI_API_KEY in backend/.env")
    sys.exit(1)


import google.generativeai as genai
genai.configure(api_key=GEMINI_API_KEY)
model = genai.GenerativeModel("gemini-1.5-flash")

DB_PATH = os.path.join(os.path.dirname(__file__), "backend", "database", "interview.db")

# ─── Helpers ────────────────────────────────────────────────────────────────

def ask_gemini(prompt: str) -> str:
    response = model.generate_content(prompt)
    return response.text.strip()

def parse_json_from_response(text: str):
    """Extract JSON from Gemini response that may have markdown fences."""
    if "```json" in text:
        text = text.split("```json", 1)[1].split("```", 1)[0]
    elif "```" in text:
        text = text.split("```", 1)[1].split("```", 1)[0]
    return json.loads(text.strip())

# ─── Coding Questions ────────────────────────────────────────────────────────

CODING_CATEGORIES = [
    ("Dynamic Programming", ["Amazon", "Google", "Microsoft"], 10),
    ("Backtracking", ["Google", "Meta", "Adobe"], 10),
    ("Greedy Algorithms", ["Amazon", "Flipkart", "Uber"], 10),
    ("Divide and Conquer", ["Microsoft", "Apple", "Google"], 8),
    ("Two Pointers", ["Amazon", "LeetCode", "Meta"], 8),
]

def generate_coding_question(category: str, companies: list, difficulty: str, index: int) -> dict:
    prompt = f"""
Generate a unique, real interview-style programming question for the category: "{category}".
Difficulty: {difficulty}
Company tags: {companies}
Question index: {index} (make it unique from common ones)

Return ONLY a JSON object with this exact structure:
{{
  "title": "...",
  "statement": "Detailed problem statement (3-5 sentences)",
  "examples": [
    {{"input": "...", "output": "...", "explanation": "..."}},
    {{"input": "...", "output": "...", "explanation": "..."}}
  ],
  "constraints": ["...", "...", "..."],
  "test_cases": [
    {{"input": "...", "expected": "..."}},
    ... (10 test cases covering edge cases)
  ],
  "python_solution": "Complete working Python solution with explanation comments",
  "java_solution": "Complete working Java solution",
  "python_template": "def solve(...):\\n    pass",
  "java_template": "public ... solve(...) {{\\n    // your code\\n}}",
  "explanation": "Step-by-step explanation of the approach"
}}
"""
    try:
        raw = ask_gemini(prompt)
        data = parse_json_from_response(raw)
        data["category"] = category
        data["difficulty"] = difficulty
        data["companies"] = companies
        data["type"] = "coding"
        data["created_date"] = datetime.utcnow().strftime("%Y-%m-%d")
        return data
    except Exception as e:
        print(f"  ⚠ Failed to generate: {e}")
        return None

def insert_coding_question(conn, q: dict):
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO questions
        (title, type, category, difficulty, companies, statement, examples, constraints,
         python_solution, java_solution, python_template, java_template, test_cases,
         explanation, created_date, is_daily)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, (
        q.get("title", ""),
        q.get("type", "coding"),
        q.get("category", ""),
        q.get("difficulty", "Medium"),
        json.dumps(q.get("companies", [])),
        q.get("statement", ""),
        json.dumps(q.get("examples", [])),
        json.dumps(q.get("constraints", [])),
        q.get("python_solution", ""),
        q.get("java_solution", ""),
        q.get("python_template", ""),
        q.get("java_template", ""),
        json.dumps(q.get("test_cases", [])),
        q.get("explanation", ""),
        q.get("created_date", ""),
        "false",
    ))
    conn.commit()

# ─── Non-Coding Questions ─────────────────────────────────────────────────────

NON_CODING_TOPICS = [
    ("Machine Learning", [
        "Supervised vs Unsupervised Learning", "Overfitting and Regularization",
        "Gradient Descent", "Neural Networks", "Decision Trees", "SVM", "Clustering",
        "Feature Engineering", "Model Evaluation", "Bias-Variance Tradeoff"
    ]),
    ("Operating Systems", [
        "Process vs Thread", "Deadlocks", "Memory Management", "Paging",
        "Scheduling Algorithms", "Semaphores", "Virtual Memory", "File Systems",
        "IPC", "Context Switching"
    ]),
    ("Database Management", [
        "ACID Properties", "SQL vs NoSQL", "Indexing", "Normalization",
        "Transactions", "Joins", "Query Optimization", "Sharding",
        "CAP Theorem", "Database Locking"
    ]),
    ("Computer Networks", [
        "OSI Model", "TCP vs UDP", "HTTP vs HTTPS", "DNS", "Routing",
        "Firewalls", "Subnetting", "Load Balancing", "CDN", "REST vs GraphQL"
    ]),
    ("System Design", [
        "Horizontal vs Vertical Scaling", "Microservices", "Message Queues",
        "Caching Strategies", "Database Replication", "Rate Limiting",
        "API Gateway", "Service Discovery", "Consistency Models", "Event-Driven Architecture"
    ]),
    ("Object Oriented Programming", [
        "Inheritance vs Composition", "SOLID Principles", "Design Patterns",
        "Polymorphism", "Encapsulation", "Abstraction", "Factory Pattern",
        "Observer Pattern", "Singleton Pattern", "Dependency Injection"
    ]),
]

def generate_non_coding_questions(topic: str, subtopics: list) -> list:
    prompt = f"""
Generate detailed interview Q&A pairs for the topic: "{topic}".
Cover these subtopics: {subtopics}

Return ONLY a JSON array with this structure (one object per subtopic):
[
  {{
    "title": "Interview question about the subtopic",
    "subtopic": "exact subtopic name",
    "answer": "Detailed, accurate answer (4-8 sentences). Include examples where helpful.",
    "difficulty": "Easy" | "Medium" | "Hard",
    "tags": ["tag1", "tag2", "tag3"]
  }},
  ...
]

Make answers interview-quality: concise but complete. No fluff.
"""
    try:
        raw = ask_gemini(prompt)
        data = parse_json_from_response(raw)
        for item in data:
            item["topic"] = topic
            item["source"] = "General"
            item["created_at"] = datetime.utcnow().strftime("%Y-%m-%d")
        return data
    except Exception as e:
        print(f"  ⚠ Failed for topic {topic}: {e}")
        return []

def insert_non_coding_question(conn, q: dict):
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO non_coding_questions
        (title, topic, subtopic, answer, difficulty, tags, source, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    """, (
        q.get("title", ""),
        q.get("topic", ""),
        q.get("subtopic", ""),
        q.get("answer", ""),
        q.get("difficulty", "Medium"),
        json.dumps(q.get("tags", [])),
        q.get("source", "General"),
        q.get("created_at", ""),
    ))
    conn.commit()

# ─── Main ─────────────────────────────────────────────────────────────────────

def main():
    conn = sqlite3.connect(DB_PATH)

    # Ensure non_coding_questions table exists
    conn.execute("""
        CREATE TABLE IF NOT EXISTS non_coding_questions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT,
            topic TEXT,
            subtopic TEXT,
            answer TEXT,
            difficulty TEXT,
            tags TEXT,
            source TEXT,
            created_at TEXT
        )
    """)
    conn.commit()

    # Check existing coding question count
    existing = conn.execute("SELECT COUNT(*) FROM questions").fetchone()[0]
    print(f"Existing coding questions: {existing}")

    # ── Generate Coding Questions ──────────────────────────────────────────
    print("\n=== Generating Coding Questions ===")
    difficulties = ["Easy", "Medium", "Hard"]
    for category, companies, count in CODING_CATEGORIES:
        print(f"\n📌 Category: {category}")
        for i in range(count):
            difficulty = difficulties[i % 3]
            print(f"  [{i+1}/{count}] {difficulty}...", end=" ")
            q = generate_coding_question(category, companies, difficulty, i + 1)
            if q:
                insert_coding_question(conn, q)
                print(f"✓ {q.get('title', 'Untitled')}")
            else:
                print("✗ skipped")

    # ── Generate Non-Coding Q&A ─────────────────────────────────────────────
    print("\n=== Generating Non-Coding Reference Q&A ===")
    # Clear existing non-coding questions to avoid duplicates
    conn.execute("DELETE FROM non_coding_questions")
    conn.commit()

    for topic, subtopics in NON_CODING_TOPICS:
        print(f"\n📖 Topic: {topic}")
        questions = generate_non_coding_questions(topic, subtopics)
        for q in questions:
            insert_non_coding_question(conn, q)
            print(f"  ✓ {q.get('title', '')[:70]}")

    final_coding = conn.execute("SELECT COUNT(*) FROM questions").fetchone()[0]
    final_ref = conn.execute("SELECT COUNT(*) FROM non_coding_questions").fetchone()[0]
    print(f"\n✅ Done! Coding questions: {final_coding} | Reference Q&A: {final_ref}")
    conn.close()

if __name__ == "__main__":
    main()
