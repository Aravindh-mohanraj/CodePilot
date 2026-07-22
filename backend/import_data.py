import json

from app.database import SessionLocal,engine
from app.models import Base,Question

Base.metadata.create_all(bind=engine)

db=SessionLocal()

with open("dataset/questions.json") as file:
    questions = json.load(file)
for q in questions:
    question = Question(
        id=q["id"],
        title=q["title"],
        category=q["category"],
        difficulty=q["difficulty"],
        companies=q["companies"],
        statement=q.get("satement",""),
        examples=q.get("examples",[]),
        constraints=q.get("constraints", []),
        python_solution=q.get("python_solution", ""),
        java_solution=q.get("java_solution", ""),
        test_cases=q.get("test_cases", []),
        explanation=q.get("explanation", "")
    )
    db.add(question)
db.commit()
db.close()
print("Dataset imported successfully")