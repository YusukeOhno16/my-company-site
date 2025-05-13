// src/components/Footer.tsx

export default function Footer() {
  return (
    <footer className="bg-gray-100 py-6 text-sm text-center text-gray-500 mt-12">
      {/* 背景を薄いグレーに設定し、上下に余白を持たせたフッター */}
      <p>
        © {new Date().getFullYear()} MyTechCompany Inc. All rights reserved.
        {/* 会社名やコピーライト表示。必要に応じて変更可 */}
      </p>
    </footer>
  );
}
