from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from routers import data, chapters, literature
import os

load_dotenv()

app = FastAPI(
    title="Thesis Research Portal API",
    description="Backend for M-PESA & Financial Inclusion research management",
    version="1.0.0"
)

# CORS
allowed_origins = os.getenv("ALLOWED_ORIGINS", "http://localhost:3000").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[o.strip() for o in allowed_origins],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers
app.include_router(data.router)
app.include_router(chapters.router)
app.include_router(literature.router)

@app.get("/")
async def root():
    return {
        "name": "Thesis Research Portal API",
        "version": "1.0.0",
        "endpoints": {
            "data": "/data/*",
            "chapters": "/chapters",
            "literature": "/literature"
        }
    }

@app.get("/health")
async def health():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8002, reload=True)