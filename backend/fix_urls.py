import os, glob

src_dir = r'd:\cladu\CodePilot\frontend\src'
old = 'http://localhost:8000/'
new = '/'

count = 0
for fpath in glob.glob(os.path.join(src_dir, '**', '*.jsx'), recursive=True):
    with open(fpath, 'r', encoding='utf-8') as f:
        content = f.read()
    if old in content:
        content = content.replace(old, new)
        with open(fpath, 'w', encoding='utf-8') as f:
            f.write(content)
        count += 1
        print(f"Updated: {fpath}")

# Also handle the backtick pattern: `http://localhost:8000/questions/${id}`
for fpath in glob.glob(os.path.join(src_dir, '**', '*.jsx'), recursive=True):
    with open(fpath, 'r', encoding='utf-8') as f:
        content = f.read()
    if 'http://localhost:8000' in content:
        content = content.replace('http://localhost:8000', '')
        with open(fpath, 'w', encoding='utf-8') as f:
            f.write(content)
        count += 1
        print(f"Updated remaining: {fpath}")

print(f"\nDone! Updated {count} files total.")
