"use client"; // クライアントコンポーネントとして指定（useStateやフォーム動作に必要）

import { useForm } from "react-hook-form"; // フォーム管理ライブラリ
import { zodResolver } from "@hookform/resolvers/zod"; // バリデーションと連携するためのアダプター
import * as z from "zod"; // スキーマベースのバリデーションライブラリ
import { useState } from "react";

// バリデーションルールの定義（Zod）
const contactSchema = z.object({
  name: z.string().min(1, "お名前は必須です"),
  email: z.string().email("有効なメールアドレスを入力してください"),
  message: z.string().min(1, "お問い合わせ内容を入力してください"),
});

type ContactFormData = z.infer<typeof contactSchema>; // 型定義をスキーマから自動生成

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema), // Zodでバリデーション
  });

  const [isSent, setIsSent] = useState(false); // 送信完了表示のための状態
  const [isSubmitting, setIsSubmitting] = useState(false); // 送信中の状態
  const [submitError, setSubmitError] = useState<string | null>(null); // エラーメッセージの状態

  const onSubmit = async (data: ContactFormData) => {
    console.log("送信データ:", data);
    
    // 送信中の状態を設定
    setIsSubmitting(true);
    setSubmitError(null);
    
    try {
      // APIエンドポイントにPOSTリクエストを送信
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      // レスポンスの処理
      if (response.ok) {
        // 成功時の処理
        setIsSent(true);
        reset(); // フォームを初期化
      } else {
        // エラーレスポンスの処理
        const errorData = await response.json();
        setSubmitError(errorData.error || 'お問い合わせの送信に失敗しました。後でもう一度お試しください。');
      }
    } catch (error) {
      // ネットワークエラーなどの例外処理
      console.error('送信エラー:', error);
      setSubmitError('通信エラーが発生しました。インターネット接続を確認してください。');
    } finally {
      // 送信中の状態を解除
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 bg-white p-6 rounded-xl shadow-md"
    >
      <div>
        <label className="block text-sm font-medium text-gray-700">
          お名前
        </label>
        <input
          type="text"
          {...register("name")}
          className="mt-1 w-full border rounded p-2"
          disabled={isSubmitting}
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          メールアドレス
        </label>
        <input
          type="email"
          {...register("email")}
          className="mt-1 w-full border rounded p-2"
          disabled={isSubmitting}
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          お問い合わせ内容
        </label>
        <textarea
          rows={4}
          {...register("message")}
          className="mt-1 w-full border rounded p-2"
          disabled={isSubmitting}
        />
        {errors.message && (
          <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
        )}
      </div>

      <div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          disabled={isSubmitting}
        >
          {isSubmitting ? '送信中...' : '送信する'}
        </button>
      </div>

      {/* エラーメッセージ */}
      {submitError && (
        <p className="text-red-600 text-sm text-center">
          {submitError}
        </p>
      )}

      {/* 送信後に表示されるメッセージ */}
      {isSent && (
        <p className="text-green-600 text-sm text-center">
          お問い合わせを送信しました。ありがとうございます！
        </p>
      )}
    </form>
  );
}
