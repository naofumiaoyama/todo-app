from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import todos
from .database import engine
from . import models
import logging

# Create database tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Todo API", description="Backend API for Todo App")

# Remove CORS設定
# origins = [
#     "http://localhost",  # Add your frontend URL here
#     "http://localhost:5173",  # Add your frontend URL here
# ]

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=origins,
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# ルーターの登録
app.include_router(todos.router, prefix="/api/todos", tags=["todos"])

@app.get("/", tags=["health"])
async def root():
    logger.info("Health check endpoint called")
    return {"message": "Todo API is running"}

@app.on_event("startup")
async def startup_event():
    logger.info("Starting up the Todo API")

@app.on_event("shutdown")
async def shutdown_event():
    logger.info("Shutting down the Todo API")
