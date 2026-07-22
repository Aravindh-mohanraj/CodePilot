import requests
qs = requests.get('http://127.0.0.1:8000/questions').json()[:6]
for q in qs:
    print(f"Q{q['id']}: {repr(q['python_solution'])}")
