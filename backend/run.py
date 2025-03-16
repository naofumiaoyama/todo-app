#!/usr/bin/env python3
"""
Todo API バックエンドのローカル開発サーバー起動スクリプト
"""
import os
import sys
import uvicorn
from app.database import Base, engine

def main():
    # データベースのテーブルを作成
    try:
        Base.metadata.create_all(bind=engine)
        print("データベーステーブルが正常に作成されました")
    except Exception as e:
        print(f"データベーステーブルの作成に失敗しました: {e}")
        sys.exit(1)

    # uvicornサーバーを起動
    try:
        print("FastAPI サーバーを起動しています...")
        # Windows HostとWSL間の通信を容易にするために特定のIPを使用
        uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
    except Exception as e:
        print(f"サーバー起動エラー: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()