import json

with open('dataset/questions.json', 'r', encoding='utf-8') as f:
    qs = json.load(f)

js = json.dumps(qs, indent=2)

with open('../index.html', 'r', encoding='utf-8') as f:
    content = f.read()

start_marker = "const INITIAL_QUESTIONS = "
end_marker = "// --- AUTH MODAL ---"

start_pos = content.find(start_marker)
end_pos = content.find(end_marker)

if start_pos != -1 and end_pos != -1:
    new_content = content[:start_pos + len(start_marker)] + js + ";\n\n    " + content[end_pos:]
    with open('../index.html', 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("index.html synced successfully!")
else:
    print("Error: Could not find markers in index.html")
