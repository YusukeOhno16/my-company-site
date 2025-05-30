# システム構成

このディレクトリには、インフラストラクチャとシステム構成に関するドキュメントが含まれています。

## 目次

- [開発環境](./development-environment.md)
- [本番環境](./production-environment.md)
- [CI/CD](./ci-cd.md)
- [環境変数](./environment-variables.md)

## 概要

このプロジェクトは以下のようなシステム構成を採用しています：

- 開発環境: ローカル開発サーバー (Next.js dev server)
- 本番環境: Vercel
- CI/CD: GitHub Actions + Vercel
- 環境変数管理: GitHub Secrets + Vercel環境変数

## 更新履歴

| 日付 | バージョン | 更新者 | 内容 |
|------|------------|--------|------|
| 2025-05-29 | 0.1 | Devin | 初期ドキュメント作成 |
