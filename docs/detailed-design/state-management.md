# 状態管理

このドキュメントでは、システムの状態管理について説明します。

## 1. フォーム状態管理

### 1.1 React Hook Form
お問い合わせフォームの状態管理には、React Hook Formを使用しています。

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
  
  // ...
}
```

### 1.2 フォーム送信状態
フォーム送信の状態管理には、React の useState フックを使用しています。

```typescript
const [isSubmitting, setIsSubmitting] = useState(false);
const [submitSuccess, setSubmitSuccess] = useState(false);
const [submitError, setSubmitError] = useState("");
```

### 1.3 状態の種類
- **isSubmitting**: フォーム送信中かどうかを示す真偽値
- **submitSuccess**: フォーム送信が成功したかどうかを示す真偽値
- **submitError**: フォーム送信時のエラーメッセージを格納する文字列
- **errors**: フォームのバリデーションエラーを格納するオブジェクト

## 2. 状態管理パターン

### 2.1 ローカル状態管理
各コンポーネントは、自身の責務に関連する状態のみを管理します。

- **ContactForm**: フォームの入力値、バリデーション状態、送信状態
- **Header**: モバイルメニューの開閉状態（必要に応じて）

### 2.2 状態の更新パターン
状態の更新は、イベントハンドラを通じて行われます。

```typescript
// フォーム送信時の状態更新
const onSubmit = async (data: ContactFormData) => {
  setIsSubmitting(true);
  setSubmitError("");
  
  try {
    // APIリクエスト処理
    
    setSubmitSuccess(true);
    reset();
  } catch (error) {
    setSubmitError(error instanceof Error ? error.message : "送信に失敗しました。");
  } finally {
    setIsSubmitting(false);
  }
};
```

## 3. サーバーサイド状態

### 3.1 API処理中の状態
API処理中の状態は、サーバーサイドで管理されます。

```typescript
// src/app/api/contact/route.ts
export async function POST(request: NextRequest) {
  try {
    // リクエスト処理
    // ...
    
    return NextResponse.json(
      { message: "お問い合わせを受け付けました。" },
      { status: 200 }
    );
  } catch (error) {
    // エラーハンドリング
    // ...
  }
}
```

### 3.2 サーバーサイド状態とクライアントサイド状態の連携
サーバーサイドの処理結果は、APIレスポンスを通じてクライアントサイドに伝達されます。

```typescript
// クライアントサイドでのAPIレスポンス処理
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
```

## 4. 将来の拡張性

### 4.1 グローバル状態管理
将来的に機能が拡張された場合、以下のような状態管理ライブラリの導入を検討できます。

- **React Context**: 小〜中規模のアプリケーション向け
- **Redux**: 大規模なアプリケーション向け
- **Zustand**: シンプルで使いやすい状態管理ライブラリ

### 4.2 サーバーサイド状態管理
Next.jsのServer Componentsを活用した状態管理も検討できます。

- **Server Components**: サーバーサイドでのデータ取得と状態管理
- **React Server Actions**: フォーム送信などのサーバーサイドアクション

## 更新履歴

| 日付 | バージョン | 更新者 | 内容 |
|------|------------|--------|------|
| 2025-05-29 | 0.1 | Devin | 初期ドキュメント作成 |
