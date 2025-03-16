from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import todos, users
from .database import engine
from . import models

# Create database tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Todo API", description="Backend API for Todo App")

# CORS設定（より詳細に設定）
app.add_middleware(
    CORSMiddleware,
    # 全てのオリジンを許可（開発環境向け）
    allow_origins=["*"],
    allow_credentials=False,  # credentialsを送信しない場合はFalseにする
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS", "HEAD"],
    allow_headers=["Authorization", "Content-Type", "Accept"],
    expose_headers=["Authorization"],
)

# ルーターの登録
app.include_router(todos.router, prefix="/api/todos", tags=["todos"])
app.include_router(users.router, prefix="/api/users", tags=["users"])


@app.get("/", tags=["health"])
async def root():
    return {"message": "Todo API is running"}
