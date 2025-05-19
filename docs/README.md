# MyTechCompany ウェブサイト

## プロジェクト概要

このプロジェクトは、株式会社MyTechCompanyの企業ウェブサイトです。システム開発、Web制作、紙媒体デザインを提供する日本の技術企業のオンラインプレゼンスとして機能します。

サイトのコアバリュープロポジションは、ヒーローセクションのメインメッセージ「つくる力で、ビジネスを前に進める。」に集約されており、カスタムデジタルソリューションを通じてビジネスを前進させる技術パートナーとして会社を位置づけています。

## 技術スタック

- **フレームワーク**: Next.js 15.3.2（App Routerパターンを使用）
- **言語**: TypeScript 5.x
- **スタイリング**: Tailwind CSS 4.x
- **フォーム管理**: React Hook Form 7.56.3 + Zod 3.24.4（バリデーション）
- **テスト**: Jest 29.7.0 + Testing Library

## プロジェクト構成

### メインディレクトリ

```
src/
├── app/                      # Next.js App Routerページ
│   ├── layout.tsx            # ルートレイアウト（全ページに適用）
│   ├── page.tsx              # ホームページ
│   ├── about/                # 会社概要ページディレクトリ
│   │   └── page.tsx          # 会社概要ページコンポーネント
│   └── contact/              # お問い合わせページディレクトリ
│       └── page.tsx          # お問い合わせページコンポーネント
│   
├── components/               # 再利用可能なReactコンポーネント
│   ├── Header.tsx            # ナビゲーションヘッダーコンポーネント
│   ├── Footer.tsx            # ページフッターコンポーネント
│   ├── HeroSection.tsx       # ホームページのヒーローセクション
│   ├── ContactSection.tsx    # お問い合わせ情報セクション
│   └── ContactForm.tsx       # お問い合わせページのフォームコンポーネント
```

### 主要コンポーネントと機能

1. **`RootLayout`** (`src/app/layout.tsx`): 全ページをラップする基本レイアウト。HeaderとFooterコンポーネントを含み、グローバルメタデータとフォントを設定。

2. **`Header`** (`src/components/Header.tsx`): ウェブサイトの異なるセクションへのリンクを提供し、レスポンシブデザインを実装したナビゲーションコンポーネント。

3. **`HeroSection`** (`src/components/HeroSection.tsx`): ホームページの主要な紹介セクション。会社の価値提案とCTAボタンを表示。

4. **`ContactSection`** (`src/components/ContactSection.tsx`): 連絡先情報とフォームを表示するコンポーネント。

5. **`ContactForm`** (`src/components/ContactForm.tsx`): react-hook-formとzodを使用してバリデーション付きのユーザー入力を収集するフォームコンポーネント。

6. **`Home`** (`src/app/page.tsx`): HeroSectionとContactSectionを構成するメインページコンポーネント。

7. **`AboutPage`** (`src/app/about/page.tsx`): 会社情報を表示する会社概要ページコンポーネント。

8. **`ContactPage`** (`src/app/contact/page.tsx`): お問い合わせページのコンポーネント。

9. **`Footer`** (`src/components/Footer.tsx`): すべてのページの下部に著作権情報とリンクを表示するコンポーネント。

## 特徴

- **日本語UI**: すべてのユーザーインターフェースは日本語で提供
- **レスポンシブデザイン**: モバイルからデスクトップまでのすべてのデバイスに対応
- **フォームバリデーション**: Zodスキーマを使用した堅牢なフォーム検証
- **モダンなデザイン**: Tailwind CSSを使用したクリーンでモダンなデザイン
- **SEO対応**: Next.jsのメタデータ機能を活用したSEO最適化

## 開発環境のセットアップ

```bash
# リポジトリのクローン
git clone https://github.com/YusukeOhno16/my-company-site.git
cd my-company-site

# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev
```

開発サーバーが起動したら、ブラウザで [http://localhost:3000](http://localhost:3000) を開いて結果を確認できます。

## テスト

```bash
# テストの実行
npm test
```
