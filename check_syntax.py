import json

c = open('d:/cladu/CodePilot/index.html', encoding='utf-8').read()

start_marker = "const INITIAL_QUESTIONS = "
end_marker = "// --- AUTH MODAL ---"

start_pos = c.find(start_marker)
end_pos = c.find(end_marker)

if start_pos != -1 and end_pos != -1:
    json_part = c[start_pos + len(start_marker):end_pos].strip()
    if json_part.endswith(';'):
        json_part = json_part[:-1].strip()
    try:
        data = json.loads(json_part)
        print(f"JSON is completely valid! Loaded {len(data)} questions.")
    except Exception as e:
        print('JSON Error:', e)
else:
    print("Markers not found in check_syntax.py")
