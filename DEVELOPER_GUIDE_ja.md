# yoronchizu2024 実行ガイド

このガイドでは、yoronchizu2024プロジェクトを実行するための手順を説明します。

## 前提条件

- Git
- Docker と Docker Compose
- Node.js (v20.x)
- npm または yarn

## セットアップ手順

### 1. リポジトリのクローン

```bash
git clone https://github.com/nishio/yoronchizu2024.git
cd yoronchizu2024
```

### 2. Polisサブモジュールの初期化

通常の`git submodule update --init --recursive`コマンドでは初期化できない場合があります。以下のコマンドを実行してください：

```bash
git submodule add https://github.com/compdemocracy/polis.git polis
```

### 3. 環境変数の設定

`.env`ファイルを作成し、必要な環境変数を設定します：

```bash
cp polis/example.env .env
```

`.env`ファイルを編集して、少なくとも以下の項目を設定してください：

```
POSTGRES_DB=polis-dev
POSTGRES_PASSWORD=postgres
POSTGRES_USER=postgres
DATABASE_URL=postgres://postgres:postgres@postgres:5432/polis-dev
WEBSERVER_USERNAME=admin
WEBSERVER_PASS=admin
```

### 4. Docker Composeでサービスを起動

```bash
docker compose up
```

これにより、Polisサーバー、数学計算サービス、PostgreSQLデータベース、ファイルサーバーなどが起動します。

### 5. フロントエンドの実行

別のターミナルで以下のコマンドを実行します：

```bash
npm install
npm run dev
```

これでフロントエンドが`http://localhost:3000`で起動します。

## テストデータの初期化（オプション）

テストデータを初期化するには、Playwrightスクリプトを使用します：

1. Playwrightのインストール

```bash
cd scripts/polis/playwright-scripts
npm install
npx playwright install
```

2. テストスクリプトの設定

`tests/seed_comments.test.ts`と`tests/vote.test.ts`を編集して、適切なURLと認証情報を設定します：

```typescript
// seed_comments.test.ts
const TARGET_POLIS = "http://localhost:5000/";
const EMAIL = "あなたのメールアドレス";
const PASSWORD = "あなたのパスワード";
```

```typescript
// vote.test.ts
const URL = "http://localhost:3000/polis/tmp";
```

3. テストスクリプトの実行

```bash
npx playwright test
```

## 注意点

- 実際の運用では、セキュリティを考慮して適切な認証情報を設定してください
- APIプロキシの設定は`src/pages/api/polis/handler.ts`で行います
- キャッシュモードとリアルタイムモードの切り替えは`src/components/pages/polis/PolisPage.tsx`で設定できます

## トラブルシューティング

- Polisサブモジュールの初期化に問題がある場合は、手動でサブモジュールを追加してください
- Docker Composeの起動に失敗する場合は、`.env`ファイルの設定を確認してください
- フロントエンドの実行に問題がある場合は、Node.jsのバージョンが20.xであることを確認してください
