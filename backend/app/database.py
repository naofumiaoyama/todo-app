import os
import sys
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv

# .envファイルから環境変数を読み込む
load_dotenv()

# SQLiteデータベースの設定
SQLITE_DB_PATH = os.getenv("SQLITE_DB_PATH", "./todo_app.db")
SQLALCHEMY_DATABASE_URL = f"sqlite:///{SQLITE_DB_PATH}"

# データベースファイルディレクトリの確認
db_dir = os.path.dirname(SQLITE_DB_PATH)
if db_dir and not os.path.exists(db_dir):
    try:
        os.makedirs(db_dir)
        print(f"Created directory: {db_dir}")
    except Exception as e:
        print(f"Error creating directory {db_dir}: {e}", file=sys.stderr)

# SQLiteエンジンの作成（同時実行制御のためcheck_same_threadをFalse）
engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)

# セッションの作成
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# モデルの基底クラス
Base = declarative_base()

# データベースセッションの依存関係
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()