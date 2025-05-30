# バックエンドアーキテクチャ

このドキュメントでは、バックエンドのアーキテクチャについて説明します。

## 1. 技術スタック

### 1.1 コアテクノロジー
- **Next.js API Routes**: サーバーサイドAPIエンドポイント
- **TypeScript**: 型安全な開発言語
- **Zod**: スキーマベースのバリデーションライブラリ
- **Nodemailer**: メール送信ライブラリ

## 2. APIアーキテクチャ

### 2.1 API構造
```
src/
└── app/
    └── api/
        └── contact/
            └── route.ts    # お問い合わせAPI
```

### 2.2 APIエンドポイント
- **/api/contact**: お問い合わせフォーム送信処理API（POST）

## 3. データフロー

### 3.1 リクエスト処理フロー
1. クライアントからのPOSTリクエスト受信
2. リクエストボディのJSONパース
3. Zodスキーマによるサーバーサイドバリデーション
4. バリデーション成功時のメール送信処理
5. レスポンス返却

### 3.2 エラーハンドリングフロー
1. バリデーションエラー発生時の400レスポンス
2. メール送信エラー発生時の500レスポンス
3. その他の例外発生時の500レスポンス

## 4. メール送信機能

### 4.1 Nodemailerの設定
```typescript
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});
```

### 4.2 メール送信処理
```typescript
await transporter.sendMail({
  from: process.env.MAIL_FROM,
  to: process.env.MAIL_FROM, // 自分自身に送信
  subject: `お問い合わせ: ${validatedData.name}様より`,
  html: `
    <h2>新しいお問い合わせ</h2>
    <p><strong>お名前:</strong> ${validatedData.name}</p>
    <p><strong>メールアドレス:</strong> ${validatedData.email}</p>
    <p><strong>お問い合わせ内容:</strong></p>
    <p>${validatedData.message.replace(/\n/g, '<br>')}</p>
  `,
});
```

## 5. 環境変数

### 5.1 必要な環境変数
- **SMTP_HOST**: SMTPサーバーのホスト名
- **SMTP_PORT**: SMTPサーバーのポート番号
- **SMTP_USER**: SMTPユーザー名
- **SMTP_PASSWORD**: SMTPパスワード
- **MAIL_FROM**: 送信元メールアドレス

### 5.2 環境変数の管理
- 開発環境: `.env.local`ファイル
- 本番環境: Vercel環境変数
- CI/CD: GitHub Secrets

## 6. セキュリティ対策

### 6.1 入力バリデーション
- Zodスキーマによる厳格な入力検証
- 不正な入力に対する適切なエラーレスポンス

### 6.2 環境変数の保護
- 機密情報（SMTPサーバーの認証情報など）は環境変数として管理
- `.env.local`ファイルは`.gitignore`に追加

### 6.3 エラーハンドリング
- 詳細なエラーメッセージ（開発環境のみ）
- 本番環境では一般的なエラーメッセージを表示

## 7. 将来の拡張性

### 7.1 追加APIエンドポイント
- ニュースレター登録API
- お問い合わせ履歴管理API
- ユーザー認証API

### 7.2 データベース統合
- お問い合わせデータの永続化
- ユーザー管理
- コンテンツ管理

## 更新履歴

| 日付 | バージョン | 更新者 | 内容 |
|------|------------|--------|------|
| 2025-05-29 | 0.1 | Devin | 初期ドキュメント作成 |
