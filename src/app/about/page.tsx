export default function AboutPage() {
    return (
      <main className="min-h-screen px-4 py-12 sm:py-24 bg-white">
        {/* セクション全体を中央寄せ＆余白付きで表示 */}
        <section className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold text-center mb-8 text-gray-800">
            会社概要
          </h1>
  
          {/* 会社情報のリスト */}
          <dl className="space-y-4 text-sm text-gray-700">
            <div>
              <dt className="font-semibold">会社名</dt>
              <dd>株式会社MyTechCompany</dd>
            </div>
            <div>
              <dt className="font-semibold">代表者</dt>
              <dd>大野 雄亮</dd>
            </div>
            <div>
              <dt className="font-semibold">設立</dt>
              <dd>2021年3月15日</dd> {/* ← 令和から西暦に変更済み */}
            </div>
            <div>
              <dt className="font-semibold">所在地</dt>
              <dd>東京都</dd>
            </div>
            <div>
              <dt className="font-semibold">事業内容</dt>
              <dd>システム開発、Web制作、紙媒体デザイン</dd>
            </div>
          </dl>
        </section>
      </main>
    );
  }