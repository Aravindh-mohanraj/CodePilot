from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from fastapi.responses import JSONResponse
from fastapi.responses import FileResponse
from .database import get_db
from .models import Question
from .gemini_service import generate_solution
import json
import os

router = APIRouter()


# Get all questions with filters
@router.get("/questions")
def get_questions(
        company: str = None,
        difficulty: str = None,
        category: str = None,
        db: Session = Depends(get_db)
):

    query = db.query(Question)

    if difficulty:
        query = query.filter(
            Question.difficulty == difficulty
        )

    if category:
        query = query.filter(
            Question.category == category
        )

    if company:
        query = query.filter(
            Question.companies.contains(company)
        )

    return query.all()



# Get single question
@router.get("/questions/{question_id}")
def get_question(
        question_id: int,
        db: Session = Depends(get_db)
):

    question = (
        db.query(Question)
        .filter(Question.id == question_id)
        .first()
    )

    return question
@router.post("/download")
def download_questions(
        question_ids: list[int],
        db: Session = Depends(get_db)
):

    questions = (
        db.query(Question)
        .filter(Question.id.in_(question_ids))
        .all()
    )


    result = []

    for q in questions:

        result.append({

            "id": q.id,
            "title": q.title,
            "type": q.type,
            "category": q.category,
            "difficulty": q.difficulty,
            "companies": q.companies,

            "statement": q.statement,

            "examples": q.examples,

            "constraints": q.constraints,

            "python_solution": q.python_solution,

            "java_solution": q.java_solution,

            "test_cases": q.test_cases,

            "explanation": q.explanation

        })

    os.makedirs("downloads", exist_ok=True)

    file_path = "downloads/questions.json"

    # Pretty-print JSON
    with open(file_path, "w", encoding="utf-8") as f:
        json.dump(result, f, indent=4, ensure_ascii=False)

    return FileResponse(
        path=file_path,
        filename="questions.json",
        media_type="application/json"
    )
@router.post("/generate-ai/{question_id}")
def generate_ai(question_id: int, db: Session = Depends(get_db)):

    question = db.query(Question).filter(
        Question.id == question_id
    ).first()

    if question is None:
        return {"error": "Question not found"}

    ai = generate_solution(question.title)

    if "error" in ai:
        return ai

    question.title = ai.get("title", question.title)
    question.category = ai.get("category", question.category)
    question.difficulty = ai.get("difficulty", question.difficulty)

    question.statement = ai.get("statement", "")
    question.examples = ai.get("examples", [])
    question.constraints = ai.get("constraints", [])
    question.explanation = ai.get("explanation", "")

    question.python_solution = ai.get("python_solution", "")
    question.java_solution = ai.get("java_solution", "")
    question.test_cases = ai.get("test_cases", [])

    db.commit()
    db.refresh(question)

    return {
        "message": "AI content generated successfully",
        "question": question.id
    }

