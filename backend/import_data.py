import json
from app.database import SessionLocal, engine
from app.models import Base, Question

Base.metadata.create_all(bind=engine)
db = SessionLocal()

with open("dataset/questions.json") as file:
    questions = json.load(file)

for q in questions:
    existing = db.query(Question).filter(Question.id == q["id"]).first()
    if existing:
        existing.title = q.get("title", existing.title)
        existing.type = q.get("type", existing.type or "Coding")
        existing.category = q.get("category", existing.category)
        existing.difficulty = q.get("difficulty", existing.difficulty)
        existing.companies = q.get("companies", existing.companies)
        if q.get("statement"): existing.statement = q["statement"]
        if q.get("python_solution"): existing.python_solution = q["python_solution"]
        if q.get("java_solution"): existing.java_solution = q["java_solution"]
        if q.get("python_template"): existing.python_template = q["python_template"]
        if q.get("java_template"): existing.java_template = q["java_template"]
    else:
        question = Question(
            id=q["id"],
            title=q["title"],
            type=q.get("type", "Coding"),
            category=q["category"],
            difficulty=q["difficulty"],
            companies=q.get("companies", []),
            statement=q.get("statement", q.get("satement", "")),
            examples=q.get("examples", []),
            constraints=q.get("constraints", []),
            python_solution=q.get("python_solution", ""),
            java_solution=q.get("java_solution", ""),
            python_template=q.get("python_template", ""),
            java_template=q.get("java_template", ""),
            test_cases=q.get("test_cases", []),
            explanation=q.get("explanation", "")
        )
        db.add(question)

db.commit()
db.close()
print("Dataset imported successfully!")