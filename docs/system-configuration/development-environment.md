# 開発環境設定

このドキュメントでは、開発環境の設定方法について説明します。

## 1. 必要条件

### 1.1 ソフトウェア要件
- **Node.js**: v18.x以上
- **npm**: v9.x以上
- **Git**: 最新版

### 1.2 推奨開発ツール
- **Visual Studio Code**: 推奨エディタ
- **ESLint**: コード品質チェック
- **Prettier**: コードフォーマッター

## 2. 環境構築手順

### 2.1 リポジトリのクローン
```bash
git clone https://github.com/YusukeOhno16/my-company-site.git
cd my-company-site
```

### 2.2 依存関係のインストール
```bash
npm install
```

### 2.3 環境変数の設定
`.env.local`ファイルをプロジェクトのルートディレクトリに作成し、以下の環境変数を設定します。

```
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your-username
SMTP_PASSWORD=your-password
MAIL_FROM=noreply@example.com
```

## 3. 開発サーバーの起動

### 3.1 開発サーバー
```bash
npm run dev
```
開発サーバーは http://localhost:3000 で起動します。

### 3.2 ビルド
```bash
npm run build
```

### 3.3 本番モードでの起動
```bash
npm run build
npm start
```

## 4. テストとリント

### 4.1 リントの実行
```bash
npm run lint
```

### 4.2 テストの実行
```bash
npm test
```

### 4.3 型チェック
```bash
npm run typecheck
```

## 5. 開発ワークフロー

### 5.1 ブランチ戦略
- **main**: 本番環境用ブランチ
- **feature/\***: 機能開発用ブランチ
- **bugfix/\***: バグ修正用ブランチ

### 5.2 コミット前のチェック
```bash
npm run lint
npm run typecheck
```

### 5.3 プルリクエスト
1. 機能ブランチを作成
2. 変更を実装
3. テストとリントを実行
4. プルリクエストを作成
5. コードレビュー
6. mainブランチにマージ

## 6. トラブルシューティング

### 6.1 依存関係の問題
```bash
rm -rf node_modules
npm install
```

### 6.2 キャッシュのクリア
```bash
npm run clean
```

### 6.3 一般的な問題
- **ポートの競合**: 別のアプリケーションが3000番ポートを使用している場合は、`PORT=3001 npm run dev`のように別のポートを指定してください。
- **環境変数の問題**: `.env.local`ファイルが正しく設定されているか確認してください。

## 更新履歴

| 日付 | バージョン | 更新者 | 内容 |
|------|------------|--------|------|
| 2025-05-29 | 0.1 | Devin | 初期ドキュメント作成 |
