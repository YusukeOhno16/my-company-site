# コンポーネント設計

このドキュメントでは、システムのコンポーネント設計について説明します。

## 1. コンポーネント構成

### 1.1 コンポーネント階層
```
App
├── RootLayout
│   ├── Header
│   ├── {children} (ページコンテンツ)
│   └── Footer
├── HomePage
│   ├── HeroSection
│   └── ContactForm
├── AboutPage
└── ContactPage
    └── ContactForm
```

### 1.2 コンポーネントの責務分離
- **ページコンポーネント**: ルーティングとレイアウト構成
- **UIコンポーネント**: 再利用可能なUI要素
- **フォームコンポーネント**: ユーザー入力とバリデーション
- **レイアウトコンポーネント**: 共通のページ構造

## 2. 主要コンポーネント詳細

### 2.1 ContactForm コンポーネント
お問い合わせフォームを実装するコンポーネントです。

```typescript
// src/components/ContactForm.tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, ContactFormData } from "@/schema/contact";
import { useState } from "react";

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema)
  });
  
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
  
  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">お問い合わせ</h2>
      
      {submitSuccess ? (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          お問い合わせを受け付けました。ありがとうございます。
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 mb-1">
              お名前 <span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              type="text"
              className={`w-full px-3 py-2 border rounded-md ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="山田 太郎"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>
          
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-1">
              メールアドレス <span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              type="email"
              className={`w-full px-3 py-2 border rounded-md ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="example@example.com"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>
          
          <div className="mb-4">
            <label htmlFor="message" className="block text-gray-700 mb-1">
              お問い合わせ内容 <span className="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              className={`w-full px-3 py-2 border rounded-md ${
                errors.message ? "border-red-500" : "border-gray-300"
              }`}
              rows={5}
              placeholder="お問い合わせ内容をご記入ください。"
              {...register("message")}
            ></textarea>
            {errors.message && (
              <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
            )}
          </div>
          
          {submitError && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {submitError}
            </div>
          )}
          
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md disabled:opacity-50"
          >
            {isSubmitting ? "送信中..." : "送信する"}
          </button>
        </form>
      )}
    </div>
  );
}
```

### 2.2 ContactSection コンポーネント
バリデーションなしのシンプルなお問い合わせセクションを実装するコンポーネントです。

```typescript
// src/components/ContactSection.tsx
export default function ContactSection() {
  return (
    <section className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">お問い合わせ</h2>
      
      <form action="/api/contact" method="post">
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 mb-1">
            お名前 <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="山田 太郎"
            required
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 mb-1">
            メールアドレス <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="example@example.com"
            required
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="message" className="block text-gray-700 mb-1">
            お問い合わせ内容 <span className="text-red-500">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            rows={5}
            placeholder="お問い合わせ内容をご記入ください。"
            required
          ></textarea>
        </div>
        
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md"
        >
          送信する
        </button>
      </form>
    </section>
  );
}
```

### 2.3 HeroSection コンポーネント
ホームページのヒーローセクションを実装するコンポーネントです。

```typescript
// src/components/HeroSection.tsx
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8 text-center">
      <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
        つくる力で、ビジネスを前に進める。
      </h1>
      <p className="text-xl text-gray-600 mb-8">
        私たちは、テクノロジーの力でビジネスの課題を解決し、
        お客様のビジョンを実現するパートナーです。
      </p>
      <Link
        href="/contact"
        className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-md transition duration-300"
      >
        お問い合わせ
      </Link>
    </section>
  );
}
```

## 3. コンポーネント間の相互作用

### 3.1 データフロー
- **ユーザー入力** → ContactForm
- **フォームデータ** → API Route
- **APIレスポンス** → ContactForm（成功/エラーメッセージ表示）

### 3.2 状態管理
- React Hooksを使用したローカル状態管理
- useStateによるフォーム送信状態の管理
- useFormによるフォーム状態の管理

## 4. コンポーネント設計の改善点

### 4.1 現在の問題点
- ContactSectionコンポーネントにはクライアントサイドバリデーションがない
- 重複するコード（ContactFormとContactSection）

### 4.2 改善策
- ContactSectionの代わりにContactFormを使用する
- コンポーネントの再利用性を高める
- 共通のフォームコンポーネントライブラリの作成を検討

## 更新履歴

| 日付 | バージョン | 更新者 | 内容 |
|------|------------|--------|------|
| 2025-05-29 | 0.1 | Devin | 初期ドキュメント作成 |
