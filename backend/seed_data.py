#!/usr/bin/env python3
"""
SQLiteデータベースに初期データを投入するスクリプト
"""
import os
import sys
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from datetime import datetime, timedelta

# アプリケーションモジュールをインポート
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
from app.database import engine, SessionLocal, Base
from app import models

# パスワードハッシュのコンテキスト
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# データベースセッションの取得
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# データベースのテーブルを作成
def create_tables():
    Base.metadata.create_all(bind=engine)
    print("✅ データベーステーブルが作成されました")

# パスワードのハッシュ化
def get_password_hash(password):
    return pwd_context.hash(password)

# ユーザーデータの作成
def create_test_users(db: Session):
    # すでにユーザーが存在するか確認
    existing_user = db.query(models.User).filter(models.User.username == "testuser").first()
    if existing_user:
        print("ℹ️ テストユーザーはすでに存在します")
        return existing_user

    # テストユーザーの作成
    test_user = models.User(
        email="test@example.com",
        username="testuser",
        hashed_password=get_password_hash("password123"),
        is_active=True
    )
    db.add(test_user)
    
    # 追加のユーザー
    admin_user = models.User(
        email="admin@example.com",
        username="admin",
        hashed_password=get_password_hash("admin123"),
        is_active=True
    )
    db.add(admin_user)
    
    db.commit()
    db.refresh(test_user)
    db.refresh(admin_user)
    print("✅ テストユーザーが作成されました")
    return test_user

# タスクデータの作成
def create_test_todos(db: Session, user_id: int):
    # すでにタスクが存在するか確認
    todos_count = db.query(models.Todo).filter(models.Todo.owner_id == user_id).count()
    if todos_count > 0:
        print(f"ℹ️ ユーザーID {user_id} のタスクはすでに {todos_count} 件存在します")
        return

    # サンプルタスクのリスト
    sample_todos = [
        {
            "title": "買い物リストを作成する",
            "description": "週末の買い物のためのリストを作成する。牛乳、卵、パン、果物を忘れないように。",
            "completed": True,
            "priority": 2,
        },
        {
            "title": "プロジェクト計画書を作成",
            "description": "新しいプロジェクトの計画書を作成し、チームメンバーに共有する。",
            "completed": False,
            "priority": 3,
        },
        {
            "title": "ジムに行く",
            "description": "週3回はジムに行く習慣をつける。有酸素運動とウェイトトレーニングをバランスよく。",
            "completed": False,
            "priority": 2,
        },
        {
            "title": "読書: 1984",
            "description": "ジョージ・オーウェルの「1984年」を読み終える。",
            "completed": False,
            "priority": 1,
        },
        {
            "title": "定期健康診断の予約",
            "description": "年次健康診断の予約を入れる。血液検査も含めて。",
            "completed": False,
            "priority": 2,
        },
        {
            "title": "友人との食事",
            "description": "久しぶりに会う友人と、新しくオープンしたイタリアンレストランで食事する。",
            "completed": False,
            "priority": 1,
        },
        {
            "title": "税金申告書類の準備",
            "description": "確定申告に必要な書類を集める。領収書や源泉徴収票を整理する。",
            "completed": False,
            "priority": 3,
        },
        {
            "title": "プログラミングの勉強",
            "description": "Pythonの新しいフレームワークについて学ぶ。オンラインコースを探す。",
            "completed": False,
            "priority": 2,
        }
    ]

    # 現在の日時を基準にする
    now = datetime.now()
    
    # サンプルタスクをデータベースに追加
    for i, todo_data in enumerate(sample_todos):
        # 作成日時を少しずつずらす
        created_at = now - timedelta(days=i, hours=i)
        
        todo = models.Todo(
            title=todo_data["title"],
            description=todo_data["description"],
            completed=todo_data["completed"],
            priority=todo_data["priority"],
            owner_id=user_id,
            created_at=created_at
        )
        db.add(todo)
    
    db.commit()
    print(f"✅ {len(sample_todos)} 件のサンプルタスクが作成されました")

# メイン処理
def main():
    try:
        print("🚀 データベースに初期データを投入します...")
        
        # テーブルの作成
        create_tables()
        
        # DBセッションの開始
        db = next(get_db())
        
        # テストユーザーの作成
        user = create_test_users(db)
        
        # テストタスクの作成
        create_test_todos(db, user.id)
        
        print("✅ 初期データの投入が完了しました！")
        print("\n以下のユーザー情報でログインできます：")
        print("Username: testuser")
        print("Password: password123")
        
    except Exception as e:
        print(f"❌ エラーが発生しました: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()