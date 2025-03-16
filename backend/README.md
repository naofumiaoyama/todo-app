# Todo App Backend API

FastAPI と SQLite を使用した Todo アプリのバックエンド API サーバー

## 機能

- ユーザー認証 (JWT トークン)
- Todo タスクの作成、取得、更新、削除
- SQLite データベースを使用したシンプルな構成

## 技術スタック

- Python 3.8+
- FastAPI
- SQLAlchemy (ORM)
- SQLite
- JWT 認証

## セットアップ

### 環境変数の設定

`.env.example` ファイルを `.env` にコピーして、必要な環境変数を設定します：

```bash
cp .env.example .env
```

`.env` ファイルを編集して、以下の項目を設定します：

```
# Database configuration - SQLiteを使用
USE_SQLITE=true
SQLITE_DB_PATH=./todo_app.db

# JWT Settings
SECRET_KEY=your-secret-key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

### 仮想環境のセットアップとパッケージのインストール

```bash
# 仮想環境を作成して有効化
python -m venv venv
source venv/bin/activate  # Linux/Mac
# または
venv\Scripts\activate  # Windows

# 依存パッケージのインストール
pip install -r requirements.txt
```

## アプリケーションの起動

### 初期データの投入

SQLiteデータベースに初期データを投入するには：

```bash
python seed_data.py
```

これにより、テストユーザーとサンプルタスクがデータベースに追加されます。

**初期ユーザー情報**:
- ユーザー名: `testuser`
- パスワード: `password123`

### サーバーの起動

開発サーバーを起動するには：

```bash
python run.py
```

これにより、FastAPI サーバーが `http://localhost:8000` で起動します。

API ドキュメントは以下の URL で確認できます：

- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## API エンドポイント

### 認証関連

- `POST /api/users/` - 新規ユーザー登録
- `POST /api/users/token` - ログイン（アクセストークン取得）
- `GET /api/users/me` - 現在のユーザー情報取得

### Todo 関連

- `GET /api/todos/` - Todoリスト取得
- `POST /api/todos/` - 新規Todo作成
- `GET /api/todos/{todo_id}` - 特定のTodo取得
- `PUT /api/todos/{todo_id}` - Todo更新
- `DELETE /api/todos/{todo_id}` - Todo削除

## デプロイメント

本アプリケーションはSQLiteを使用しているため、シンプルにデプロイできます：

- 仮想プライベートサーバー（VPS）：任意のLinuxサーバー
- PaaS: Heroku, Railway, Render などの各種PaaSサービス
- コンテナ: Docker, Podman などのコンテナ技術

本番環境では、SQLiteからPostgreSQLやMySQLなどの本格的なデータベースへの移行も検討できます。

## フロントエンドとの連携

フロントエンドとの連携のために CORS 設定が有効になっています。
デフォルトでは、`http://localhost:5173` と `http://localhost:5174` からのリクエストを許可しています。