import os
import json
from dotenv import load_dotenv
import google.generativeai as genai

# Load environment variables
load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    raise Exception("GEMINI_API_KEY not found in .env file")

genai.configure(api_key=api_key)

model = genai.GenerativeModel("models/gemini-2.5-flash")


def generate_solution(question):
    # JSON schema as a Python dictionary (avoids f-string brace errors)
    schema = {
        "title": "",
        "category": "",
        "difficulty": "",
        "statement": "",
        "examples": [
            {
                "input": "",
                "output": "",
                "explanation": ""
            }
        ],
        "constraints": [],
        "explanation": "",
        "python_solution": "",
        "java_solution": "",
        "test_cases": [
            {
                "input": "",
                "output": "",
                "explanation": ""
            }
        ]
    }

    prompt = f"""
You are an expert coding interview assistant.

Generate a complete interview question package.

Question:
{question}

Return ONLY valid JSON.

The JSON MUST match this schema exactly:

{json.dumps(schema, indent=2)}

Requirements:
1. Generate a detailed problem statement.
2. Generate category and difficulty.
3. Generate at least one example.
4. Generate constraints.
5. Generate a detailed explanation.
6. Generate a correct Python solution.
7. Generate a correct Java solution.
8. Generate exactly 10 diverse test cases.
9. Do NOT include markdown.
10. Do NOT include ```json.
11. Return ONLY JSON.
"""

    try:
        response = model.generate_content(prompt)

        result = response.text.strip()

        # Remove markdown if Gemini returns it
        result = result.replace("```json", "")
        result = result.replace("```", "")
        result = result.strip()

        # Convert JSON string to Python dictionary
        return json.loads(result)

    except json.JSONDecodeError:
        return {
            "error": "Gemini returned invalid JSON",
            "raw_response": response.text if 'response' in locals() else ""
        }

    except Exception as e:
        return {
            "error": str(e)
        }