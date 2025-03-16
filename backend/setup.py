#!/usr/bin/env python3
import subprocess
import sys

def install_pip():
    try:
        subprocess.check_call([sys.executable, "-m", "ensurepip", "--upgrade"])
        print("pipがインストールされました")
        return True
    except Exception as e:
        print(f"pipのインストールに失敗しました: {e}")
        return False

def install_packages():
    try:
        packages = [
            "fastapi",
            "uvicorn",
            "sqlalchemy",
            "python-dotenv",
            "pydantic",
            "python-jose[cryptography]",
            "passlib[bcrypt]",
            "python-multipart"
        ]
        
        for package in packages:
            print(f"{package}をインストール中...")
            subprocess.check_call([sys.executable, "-m", "pip", "install", package])
        
        print("すべてのパッケージのインストールが完了しました")
        return True
    except Exception as e:
        print(f"パッケージのインストールに失敗しました: {e}")
        return False

if __name__ == "__main__":
    print("Todoアプリのバックエンドセットアップを開始します")
    
    # pipが利用可能か確認
    try:
        subprocess.check_call([sys.executable, "-m", "pip", "--version"])
        print("pipは利用可能です")
    except:
        print("pipがインストールされていません。インストールを試みます...")
        if not install_pip():
            print("pipのインストールに失敗しました。手動でインストールしてください。")
            sys.exit(1)
    
    # 必要なパッケージをインストール
    if install_packages():
        print("\nセットアップが完了しました！")
        print("以下のコマンドでアプリケーションを起動できます：")
        print("  python run.py")
    else:
        print("\nセットアップに失敗しました。")
        sys.exit(1)