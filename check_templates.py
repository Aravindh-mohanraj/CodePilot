import json
import re

c = open('d:/cladu/CodePilot/index.html', encoding='utf-8').read()
json_part = re.search(r'const INITIAL_QUESTIONS = (\[.*?\]);', c, re.DOTALL).group(1)
qs = json.loads(json_part)
for q in qs:
    print(f"Q{q['id']}: {repr(q['python_solution'])}")
