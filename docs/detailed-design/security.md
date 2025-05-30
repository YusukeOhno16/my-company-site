# セキュリティ対策

このドキュメントでは、システムのセキュリティ対策について説明します。

## 1. 入力データの検証

### 1.1 クライアントサイドバリデーション
React Hook FormとZodを使用した入力データの検証を実装しています。

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
```

### 1.2 サーバーサイドバリデーション
APIエンドポイントでも同じZodスキーマを使用して、入力データを検証しています。

```typescript
// src/app/api/contact/route.ts
import { contactSchema } from "@/schema/contact";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // サーバーサイドバリデーション
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
    
    // ...
  }
}
```

## 2. 環境変数の保護

### 2.1 環境変数の管理
機密情報（SMTPサーバーの認証情報など）は環境変数として管理し、ソースコードに直接記述しないようにしています。

```typescript
// 環境変数の使用例
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});
```

### 2.2 環境変数ファイルの保護
`.env.local` ファイルは `.gitignore` に追加し、リポジトリにコミットされないようにしています。

```
# .gitignore
.env.local
.env.*.local
```

### 2.3 本番環境での環境変数管理
本番環境（Vercel）では、環境変数をVercelの管理画面から設定し、GitHub Secretsを使用してCI/CDパイプラインでも利用できるようにしています。

## 3. XSS対策

### 3.1 React のエスケープ機能
Reactは、デフォルトでJSXに挿入される変数の値をエスケープするため、基本的なXSS攻撃から保護されています。

```tsx
// 安全なレンダリング
<p>{userInput}</p> // userInputの値は自動的にエスケープされる
```

### 3.2 dangerouslySetInnerHTML の回避
危険な `dangerouslySetInnerHTML` プロパティの使用を避け、必要な場合は適切なサニタイズを行います。

```tsx
// 避けるべき使用法
<div dangerouslySetInnerHTML={{ __html: userInput }} />

// 代わりに、サニタイズライブラリを使用
import DOMPurify from 'dompurify';

<div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(userInput) }} />
```

### 3.3 メール本文のサニタイズ
メール本文に含まれるユーザー入力は、適切にエスケープしています。

```typescript
// 改行の処理
html: `
  <h2>新しいお問い合わせ</h2>
  <p><strong>お名前:</strong> ${validatedData.name}</p>
  <p><strong>メールアドレス:</strong> ${validatedData.email}</p>
  <p><strong>お問い合わせ内容:</strong></p>
  <p>${validatedData.message.replace(/\n/g, '<br>')}</p>
`,
```

## 4. CSRF対策

### 4.1 SameSite Cookie
Next.jsはデフォルトで `SameSite=Lax` 属性を持つCookieを使用し、クロスサイトリクエストからの保護を提供します。

### 4.2 Content-Type の検証
APIエンドポイントでは、リクエストの `Content-Type` ヘッダーを検証することで、不正なリクエストを防止できます。

```typescript
// Content-Typeの検証例
if (request.headers.get("Content-Type") !== "application/json") {
  return NextResponse.json(
    { message: "不正なリクエスト形式です。" },
    { status: 400 }
  );
}
```

## 5. レート制限

### 5.1 将来的な実装
将来的に、以下のようなレート制限の実装を検討できます。

```typescript
// レート制限の実装例（将来的な実装）
import { rateLimit } from 'some-rate-limit-library';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15分
  max: 5, // IPアドレスごとに15分間で5回まで
});

export async function POST(request: NextRequest) {
  // IPアドレスの取得
  const ip = request.headers.get('x-forwarded-for') || 'unknown';
  
  // レート制限のチェック
  const { success, limit, remaining, reset } = await limiter.check(ip);
  
  if (!success) {
    return NextResponse.json(
      { message: "リクエスト回数の制限を超えました。しばらく経ってから再試行してください。" },
      { 
        status: 429,
        headers: {
          'X-RateLimit-Limit': limit.toString(),
          'X-RateLimit-Remaining': remaining.toString(),
          'X-RateLimit-Reset': reset.toString(),
        }
      }
    );
  }
  
  // 通常の処理を続行
  // ...
}
```

## 6. セキュリティヘッダー

### 6.1 将来的な実装
将来的に、以下のようなセキュリティヘッダーの実装を検討できます。

```typescript
// next.config.js
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:;",
          },
        ],
      },
    ];
  },
};
```

## 更新履歴

| 日付 | バージョン | 更新者 | 内容 |
|------|------------|--------|------|
| 2025-05-29 | 0.1 | Devin | 初期ドキュメント作成 |
