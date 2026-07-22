from sqlalchemy import column, Integer, String, JSON, Column
from .database import Base

class Question(Base):

    __tablename__ = "questions"

    id = Column(Integer, primary_key=True)

    title = Column(String)

    type = Column(String)

    category = Column(String)

    difficulty = Column(String)

    companies = Column(JSON)

    statement = Column(String)

    examples = Column(JSON)

    constraints = Column(JSON)

    python_solution = Column(String)

    java_solution = Column(String)

    test_cases = Column(JSON)

    explanation = Column(String)