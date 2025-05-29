# API設計

このドキュメントでは、システムのAPI設計について説明します。

## 1. お問い合わせAPI

### 1.1 エンドポイント
- **URL**: `/api/contact`
- **メソッド**: POST
- **説明**: お問い合わせフォームからの送信を処理するAPI

### 1.2 リクエスト形式
```json
{
  "name": "山田太郎",
  "email": "yamada@example.com",
  "message": "サービスについて質問があります。"
}
```

### 1.3 レスポンス形式
#### 成功時 (200 OK)
```json
{
  "message": "お問い合わせを受け付けました。"
}
```

#### バリデーションエラー時 (400 Bad Request)
```json
{
  "message": "入力内容に誤りがあります。",
  "errors": [
    {
      "code": "too_small",
      "minimum": 10,
      "type": "string",
      "inclusive": true,
      "exact": false,
      "message": "お問い合わせ内容は10文字以上で入力してください。",
      "path": ["message"]
    }
  ]
}
```

#### サーバーエラー時 (500 Internal Server Error)
```json
{
  "message": "サーバーエラーが発生しました。"
}
```

### 1.4 実装詳細
```typescript
// src/app/api/contact/route.ts
import { NextRequest, NextResponse } from "next/server";
import { contactSchema } from "@/schema/contact";
import { ZodError } from "zod";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const validatedData = contactSchema.parse(body);
    
    console.log("Contact form submission:", validatedData);
    
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

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
    
    return NextResponse.json(
      { message: "お問い合わせを受け付けました。" },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { 
          message: "入力内容に誤りがあります。",
          errors: error.errors 
        },
        { status: 400 }
      );
    }
    
    console.error("Contact API error:", error);
    return NextResponse.json(
      { message: "サーバーエラーが発生しました。" },
      { status: 500 }
    );
  }
}
```

## 2. APIセキュリティ

### 2.1 入力バリデーション
- Zodスキーマを使用した厳格な入力バリデーション
- 不正な入力に対する適切なエラーレスポンス

### 2.2 エラーハンドリング
- 詳細なエラーメッセージ（開発環境のみ）
- 本番環境では一般的なエラーメッセージを表示

### 2.3 レート制限
- 将来的な実装として検討
- IPアドレスベースのレート制限
- 1時間あたりの最大リクエスト数の制限

## 3. 将来の拡張性

### 3.1 認証API
- 将来的な管理画面実装時に検討
- JWT認証の導入
- ロールベースのアクセス制御

### 3.2 コンテンツ管理API
- 将来的なCMS機能実装時に検討
- コンテンツの取得・更新・削除API
- 画像アップロードAPI

## 更新履歴

| 日付 | バージョン | 更新者 | 内容 |
|------|------------|--------|------|
| 2025-05-29 | 0.1 | Devin | 初期ドキュメント作成 |
