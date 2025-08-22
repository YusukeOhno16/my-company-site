# MyTechCompany ウェブサイト

## プロジェクト概要

このプロジェクトは、株式会社MyTechCompanyの企業ウェブサイトです。システム開発、Web制作、紙媒体デザインを提供する日本の技術企業のオンラインプレゼンスとして機能します。PRテスト用の変更を追加しました。

## 技術スタック

- **フレームワーク**: Next.js 15.3.2（App Routerパターンを使用）
- **言語**: TypeScript 5.x
- **スタイリング**: Tailwind CSS 4.x
- **フォーム管理**: React Hook Form 7.56.3 + Zod 3.24.4（バリデーション）
- **メール送信**: Nodemailer

## 主な機能

- **レスポンシブデザイン**: モバイルからデスクトップまでのすべてのデバイスに対応
- **お問い合わせフォーム**: バリデーション機能付きのフォーム
- **メール通知**: お問い合わせ内容をメールで受信

## 開発環境のセットアップ

```bash
# リポジトリのクローン
git clone https://github.com/YusukeOhno16/my-company-site.git
cd my-company-site

# 依存関係のインストール
npm install

# 環境変数の設定
# .env.localファイルを作成し、必要な環境変数を設定

# 開発サーバーの起動
npm run dev
```

開発サーバーが起動したら、ブラウザで [http://localhost:3000](http://localhost:3000) を開いて結果を確認できます。

## ドキュメント

プロジェクトの詳細なドキュメントは[ドキュメントディレクトリ](./docs/README.md)にあります。以下のセクションが含まれています：

- [要件定義](./docs/requirements/README.md)
- [基本設計](./docs/basic-design/README.md)
- [詳細設計](./docs/detailed-design/README.md)
- [アーキテクチャ](./docs/architecture/README.md)
- [システム構成](./docs/system-configuration/README.md)

## デプロイ

このプロジェクトはVercelにデプロイされています。mainブランチへのマージで自動的にデプロイされます。
