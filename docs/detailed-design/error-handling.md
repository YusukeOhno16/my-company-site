# エラーハンドリング

このドキュメントでは、システムのエラーハンドリング設計について説明します。

## 1. フロントエンドのエラーハンドリング

### 1.1 フォームバリデーションエラー
React Hook FormとZodを使用したフォームバリデーションエラーの処理方法です。

```typescript
// src/components/ContactForm.tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, ContactFormData } from "@/schema/contact";

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema)
  });
  
  // エラーメッセージの表示
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* ... */}
      {errors.name && (
        <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
      )}
      {/* ... */}
    </form>
  );
}
```

### 1.2 API通信エラー
フェッチAPIを使用したAPI通信エラーの処理方法です。

```typescript
// API通信エラーの処理
const [submitError, setSubmitError] = useState("");

const onSubmit = async (data: ContactFormData) => {
  setIsSubmitting(true);
  setSubmitError("");
  
  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    
    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.message || "送信に失敗しました。");
    }
    
    setSubmitSuccess(true);
    reset();
  } catch (error) {
    setSubmitError(error instanceof Error ? error.message : "送信に失敗しました。");
  } finally {
    setIsSubmitting(false);
  }
};

// エラーメッセージの表示
{submitError && (
  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
    {submitError}
  </div>
)}
```

## 2. バックエンドのエラーハンドリング

### 2.1 バリデーションエラー
Zodを使用したサーバーサイドバリデーションエラーの処理方法です。

```typescript
// src/app/api/contact/route.ts
import { NextRequest, NextResponse } from "next/server";
import { contactSchema } from "@/schema/contact";
import { ZodError } from "zod";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Zodによるバリデーション
    const validatedData = contactSchema.parse(body);
    
    // ...
  } catch (error) {
    // バリデーションエラーの処理
    if (error instanceof ZodError) {
      return NextResponse.json(
        { 
          message: "入力内容に誤りがあります。",
          errors: error.errors 
        },
        { status: 400 }
      );
    }
    
    // その他のエラー処理
    console.error("Contact API error:", error);
    return NextResponse.json(
      { message: "サーバーエラーが発生しました。" },
      { status: 500 }
    );
  }
}
```

### 2.2 メール送信エラー
Nodemailerを使用したメール送信エラーの処理方法です。

```typescript
try {
  // トランスポーターの設定
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  // メール送信
  await transporter.sendMail({
    from: process.env.MAIL_FROM,
    to: process.env.MAIL_FROM,
    subject: `お問い合わせ: ${validatedData.name}様より`,
    html: `
      <h2>新しいお問い合わせ</h2>
      <p><strong>お名前:</strong> ${validatedData.name}</p>
      <p><strong>メールアドレス:</strong> ${validatedData.email}</p>
      <p><strong>お問い合わせ内容:</strong></p>
      <p>${validatedData.message.replace(/\n/g, '<br>')}</p>
    `,
  });
  
  // 成功レスポンス
  return NextResponse.json(
    { message: "お問い合わせを受け付けました。" },
    { status: 200 }
  );
} catch (error) {
  // メール送信エラーの処理
  console.error("Email sending error:", error);
  return NextResponse.json(
    { message: "メール送信に失敗しました。" },
    { status: 500 }
  );
}
```

## 3. エラーログ管理

### 3.1 クライアントサイドエラーログ
クライアントサイドでのエラーログ管理方法です。

```typescript
// エラーログの記録
try {
  // 処理
} catch (error) {
  console.error("Error:", error);
  // エラー処理
}
```

### 3.2 サーバーサイドエラーログ
サーバーサイドでのエラーログ管理方法です。

```typescript
// サーバーサイドエラーログ
try {
  // 処理
} catch (error) {
  console.error("API error:", error);
  // エラー処理
}
```

## 4. エラーハンドリングの改善点

### 4.1 集中型エラーハンドリング
将来的な改善として、集中型エラーハンドリングの導入を検討できます。

```typescript
// エラーハンドリングユーティリティ
export function handleApiError(error: unknown): NextResponse {
  if (error instanceof ZodError) {
    return NextResponse.json(
      { 
        message: "入力内容に誤りがあります。",
        errors: error.errors 
      },
      { status: 400 }
    );
  }
  
  if (error instanceof Error) {
    console.error("API error:", error);
    return NextResponse.json(
      { message: error.message || "サーバーエラーが発生しました。" },
      { status: 500 }
    );
  }
  
  console.error("Unknown API error:", error);
  return NextResponse.json(
    { message: "サーバーエラーが発生しました。" },
    { status: 500 }
  );
}
```

### 4.2 エラーモニタリング
将来的な改善として、エラーモニタリングツールの導入を検討できます。

- Sentry
- LogRocket
- New Relic

## 更新履歴

| 日付 | バージョン | 更新者 | 内容 |
|------|------------|--------|------|
| 2025-05-29 | 0.1 | Devin | 初期ドキュメント作成 |
