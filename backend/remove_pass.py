import json

with open('dataset/questions.json', 'r', encoding='utf-8') as f:
    qs = json.load(f)

for q in qs:
    if q.get('python_solution'):
        q['python_solution'] = q['python_solution'].replace('        # Write your solution here\n        return', '')

with open('dataset/questions.json', 'w', encoding='utf-8') as f:
    json.dump(qs, f, indent=2)

print("Cleared function bodies.")
