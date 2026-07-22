from fastapi import FastAPI
from .database import engine
from .models import Base
from .routes import router
from fastapi.middleware.cors import CORSMiddleware

app=FastAPI(title="CodePilot")

app.add_middleware(

    CORSMiddleware,

    allow_origins=["*"],

    allow_methods=["*"],

    allow_headers=["*"],

)

Base.metadata.create_all(bind=engine)
app.include_router(router)
@app.get("/")
def home():
    return{
        "message":"CodePilot is running"
    }
