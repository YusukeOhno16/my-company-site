# CI/CD設定

このドキュメントでは、CI/CD（継続的インテグレーション/継続的デリバリー）の設定について説明します。

## 1. CI/CDの概要

### 1.1 CI/CDの目的
- コードの品質保証
- 自動テストの実行
- 自動デプロイメント
- 開発プロセスの効率化

### 1.2 使用ツール
- **GitHub Actions**: CI/CDパイプラインの実行
- **Vercel**: 自動デプロイメント

## 2. GitHub Actions設定

### 2.1 ワークフローファイル
`.github/workflows/ci.yml`ファイルでCI/CDパイプラインを定義します。

```yaml
name: CI

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Lint
      run: npm run lint
    
    - name: Type check
      run: npm run typecheck
    
    - name: Build
      run: npm run build
    
    - name: Test
      run: npm test
```

### 2.2 環境変数の設定
GitHub Secretsを使用して、CI/CDパイプラインで必要な環境変数を設定します。

1. GitHubリポジトリの「Settings」→「Secrets and variables」→「Actions」にアクセス
2. 「New repository secret」ボタンをクリック
3. 以下の環境変数を追加:
   - `SMTP_HOST`
   - `SMTP_PORT`
   - `SMTP_USER`
   - `SMTP_PASSWORD`
   - `MAIL_FROM`

## 3. Vercelデプロイメント設定

### 3.1 Vercelとの連携
1. Vercelダッシュボードでプロジェクトを作成
2. GitHubリポジトリと連携
3. ビルド設定を構成

### 3.2 デプロイメントトリガー
- **本番環境**: mainブランチへのプッシュ
- **プレビュー環境**: プルリクエスト作成/更新時

### 3.3 環境変数の同期
Vercel環境変数とGitHub Secretsを同期させるために、以下の手順を実行します。

1. Vercelダッシュボードの「Settings」→「Environment Variables」にアクセス
2. GitHub Secretsと同じ環境変数を追加

## 4. CI/CDパイプラインのフロー

### 4.1 プルリクエスト時のフロー
1. 開発者がプルリクエストを作成
2. GitHub Actionsが自動的に実行
   - 依存関係のインストール
   - リントチェック
   - 型チェック
   - ビルド
   - テスト実行
3. Vercelがプレビューデプロイメントを作成
4. コードレビュー実施
5. すべてのチェックが通過したらマージ

### 4.2 mainブランチへのマージ時のフロー
1. プルリクエストがmainブランチにマージ
2. GitHub Actionsが自動的に実行
   - 依存関係のインストール
   - リントチェック
   - 型チェック
   - ビルド
   - テスト実行
3. Vercelが本番環境にデプロイ

## 5. CI/CDの監視と管理

### 5.1 ビルド履歴の確認
- GitHub Actionsのワークフロータブでビルド履歴を確認
- Vercelダッシュボードでデプロイメント履歴を確認

### 5.2 失敗時の対応
1. ビルドログを確認
2. エラーの原因を特定
3. 修正を実装
4. 再度プルリクエストを更新

## 更新履歴

| 日付 | バージョン | 更新者 | 内容 |
|------|------------|--------|------|
| 2025-05-29 | 0.1 | Devin | 初期ドキュメント作成 |
