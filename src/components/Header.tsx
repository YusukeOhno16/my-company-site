"use client"; // クライアントコンポーネントとして明示（useState使用のため）

import Link from "next/link"; // ルーティング用のLinkコンポーネント
import { useState } from "react"; // メニュー開閉の状態管理に使用

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false); // モバイル用メニューの開閉状態を管理

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      {/* 背景：白／影付き／上部固定（スクロールしても表示） */}
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* コンテンツを中央寄せ・左右に分割配置 */}

        {/* 左側：ロゴまたは会社名 */}
        <div className="text-xl font-bold text-blue-700">
          <Link href="/">MyTechCompany</Link>
        </div>

        {/* PC表示：ナビゲーション（md以上で表示） */}
        <nav className="hidden md:flex space-x-6">
          <Link href="/" className="text-gray-700 hover:text-blue-600">トップ</Link>
          <Link href="/about" className="text-gray-700 hover:text-blue-600">会社概要</Link>
          <Link href="/contact" className="text-gray-700 hover:text-blue-600">お問い合わせ</Link>
        </nav>

        {/* SP表示：ハンバーガーメニュー（md未満で表示） */}
        <button
          className="md:hidden flex flex-col space-y-1"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="メニューを開く"
        >
          {/* 三本線アイコン（シンプルな実装） */}
          <span className="w-6 h-0.5 bg-gray-700"></span>
          <span className="w-6 h-0.5 bg-gray-700"></span>
          <span className="w-6 h-0.5 bg-gray-700"></span>
        </button>
      </div>

      {/* SP表示時：メニュー展開部分 */}
      {menuOpen && (
        <nav className="md:hidden bg-white shadow-md border-t">
          <ul className="flex flex-col items-start p-4 space-y-2">
            <li>
              <Link href="/" className="text-gray-700 hover:text-blue-600" onClick={() => setMenuOpen(false)}>トップ</Link>
            </li>
            <li>
              <Link href="/about" className="text-gray-700 hover:text-blue-600" onClick={() => setMenuOpen(false)}>会社概要</Link>
            </li>
            <li>
              <Link href="/contact" className="text-gray-700 hover:text-blue-600" onClick={() => setMenuOpen(false)}>お問い合わせ</Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}