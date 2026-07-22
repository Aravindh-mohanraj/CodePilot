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

    python_template = Column(String)

    java_template = Column(String)

    test_cases = Column(JSON)

    explanation = Column(String)

    created_date = Column(String, nullable=True)

    is_daily = Column(String, nullable=True)

class User(Base):

    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String)

    email = Column(String, unique=True, index=True)

    hashed_password = Column(String)

    google_id = Column(String, nullable=True)

    avatar = Column(String, nullable=True)

    is_verified = Column(String, default="true")

    created_at = Column(String)

class UserSubmission(Base):

    __tablename__ = "user_submissions"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(Integer, index=True)

    question_id = Column(Integer, index=True)

    status = Column(String)

    language = Column(String)

    submitted_code = Column(String)

    created_at = Column(String)

class UserDownload(Base):

    __tablename__ = "user_downloads"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(Integer, index=True)

    file_name = Column(String)

    questions_count = Column(Integer)

    created_at = Column(String)


class NonCodingQuestion(Base):

    __tablename__ = "non_coding_questions"

    id = Column(Integer, primary_key=True)

    title = Column(String)

    topic = Column(String)  # Machine Learning, Operating Systems, DBMS, etc.

    subtopic = Column(String, nullable=True)

    answer = Column(String)

    difficulty = Column(String)

    tags = Column(JSON, nullable=True)

    source = Column(String, nullable=True)

    created_at = Column(String, nullable=True)