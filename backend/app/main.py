from fastapi import FastAPI
from app.routers import places
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # 或者指定前端的URL，如 "http://localhost:3000"
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(places.router, prefix="/api/places", tags=["Places"])

@app.get("/")
def read_root():
    return {"message": "Welcome to the RAG Service API"}