#!/usr/bin/env python3
"""
Windows Host から直接アクセスするためのサーバー起動スクリプト
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

    # 特定のIPと明示的なポートでサーバーを起動
    try:
        print("FastAPI サーバーを起動しています...")
        # Windows Hostからアクセスできるよう設定
        uvicorn.run(
            "app.main:app", 
            host="localhost",  # すべてのインターフェースでリッスン
            port=8000, 
            reload=False  # 安定性のためreloadはオフに
        )
    except Exception as e:
        print(f"サーバー起動エラー: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()