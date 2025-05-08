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

  const onSubmit = async (data: ContactFormData) => {
    console.log("送信データ:", data);
    // ★ここでAPIやメール送信処理を呼び出す
    setIsSent(true);
    reset(); // フォームを初期化
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
        />
        {errors.message && (
          <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
        )}
      </div>

      <div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          送信する
        </button>
      </div>

      {/* 送信後に表示されるメッセージ */}
      {isSent && (
        <p className="text-green-600 text-sm text-center">
          お問い合わせを送信しました。ありがとうございます！
        </p>
      )}
    </form>
  );
}