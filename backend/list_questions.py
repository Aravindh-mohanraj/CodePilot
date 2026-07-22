import json
for q in json.load(open('dataset/questions.json', encoding='utf-8')):
    print(f"{q['id']}: {q['title']}")
