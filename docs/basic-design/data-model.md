# データモデル

このドキュメントでは、システムで使用されるデータモデルについて説明します。

## 1. お問い合わせフォームデータモデル

### 1.1 contactSchema
お問い合わせフォームのデータ構造とバリデーションルールを定義します。

```typescript
// src/schema/contact.ts
import { z } from "zod";

export const contactSchema = z.object({
  name: z.string()
    .min(1, { message: "お名前を入力してください。" })
    .max(50, { message: "お名前は50文字以内で入力してください。" }),
  
  email: z.string()
    .email({ message: "有効なメールアドレスを入力してください。" }),
  
  message: z.string()
    .min(10, { message: "お問い合わせ内容は10文字以上で入力してください。" })
    .max(1000, { message: "お問い合わせ内容は1000文字以内で入力してください。" })
});

export type ContactFormData = z.infer<typeof contactSchema>;
```

### 1.2 ContactFormData型
お問い合わせフォームのデータ型を定義します。

```typescript
// 型定義
export type ContactFormData = {
  name: string;    // お名前（1〜50文字）
  email: string;   // メールアドレス（有効なメールアドレス形式）
  message: string; // お問い合わせ内容（10〜1000文字）
};
```

## 2. APIレスポンスモデル

### 2.1 成功レスポンス
お問い合わせフォーム送信成功時のレスポンス形式です。

```typescript
// 成功レスポンス
{
  message: string; // "お問い合わせを受け付けました。"
}
```

### 2.2 エラーレスポンス
バリデーションエラー時のレスポンス形式です。

```typescript
// バリデーションエラーレスポンス
{
  message: string;   // "入力内容に誤りがあります。"
  errors: ZodError[]; // Zodバリデーションエラーの配列
}

// サーバーエラーレスポンス
{
  message: string; // "サーバーエラーが発生しました。"
}
```

## 3. メール送信データモデル

### 3.1 SMTPトランスポート設定
メール送信に使用するSMTP設定モデルです。

```typescript
// SMTPトランスポート設定
{
  host: string;     // SMTPサーバーのホスト名
  port: number;     // SMTPサーバーのポート番号
  secure: boolean;  // SSL/TLS接続の使用有無
  auth: {
    user: string;   // SMTPユーザー名
    pass: string;   // SMTPパスワード
  }
}
```

### 3.2 メールメッセージ構造
送信するメールの構造モデルです。

```typescript
// メールメッセージ構造
{
  from: string;    // 送信元メールアドレス
  to: string;      // 送信先メールアドレス
  subject: string; // メールの件名
  html: string;    // メールのHTML本文
}
```

## 4. 環境変数モデル

システムで使用される環境変数の構造です。

```
// 環境変数
SMTP_HOST: string     // SMTPサーバーのホスト名
SMTP_PORT: string     // SMTPサーバーのポート番号
SMTP_USER: string     // SMTPユーザー名
SMTP_PASSWORD: string // SMTPパスワード
MAIL_FROM: string     // 送信元メールアドレス
```

## 更新履歴

| 日付 | バージョン | 更新者 | 内容 |
|------|------------|--------|------|
| 2025-05-29 | 0.1 | Devin | 初期ドキュメント作成 |
