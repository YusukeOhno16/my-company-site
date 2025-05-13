import React from "react";

export default function ContactSection() {
  return (
    <section className="bg-gray-50 py-16 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-semibold text-gray-900 mb-4">
          お問い合わせ
        </h2>
        <p className="text-gray-600 mb-8">
          ご相談・ご依頼・ご質問などお気軽にご連絡ください。
        </p>
        <form className="space-y-6">
          <input
            type="text"
            placeholder="お名前"
            className="w-full border border-gray-300 rounded px-4 py-2"
          />
          <input
            type="email"
            placeholder="メールアドレス"
            className="w-full border border-gray-300 rounded px-4 py-2"
          />
          <textarea
            rows={5}
            placeholder="お問い合わせ内容"
            className="w-full border border-gray-300 rounded px-4 py-2"
          />
          <button
            type="submit"
            className="bg-black text-white px-6 py-2 rounded hover:opacity-90"
          >
            送信する
          </button>
        </form>
      </div>
    </section>
  );
}