"use client"; // クライアント側で動作するコンポーネント（アニメーションや動的制御が可能）

// HeroSection はトップページに表示されるキャッチコピー＋CTAボタンを含むエリアです
export default function HeroSection() {
  return (
    <section className="bg-blue-50 py-20 text-center">
      {/* セクション全体：背景色（淡い青）・上下余白あり・中央揃えテキスト */}
      <div className="max-w-3xl mx-auto px-4">
        {/* 幅の最大値を制限して、横パディング（余白）を追加 */}

        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {/* メインの見出し：大きな太字テキスト */}
          小さくて強い、あなたのテクノロジーパートナー
        </h1>

        <p className="text-lg text-gray-700 mb-6">
          {/* 説明文：サービスの簡単な紹介。中央揃え */}
          システム開発 / Webサイト制作 / 紙媒体デザインなど、<br />
          あなたのビジネスを支える仕組みづくりをサポートします。
        </p>

        <a
          href="/contact"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition"
        >
          {/* CTA（Call to Action）ボタン：お問い合わせページへ誘導 */}
          お問い合わせはこちら
        </a>
      </div>
    </section>
  );
}