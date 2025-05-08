import HeroSection from "@/components/HeroSection"; // Heroセクションをインポート

export default function Home() {
  return (
    <main className="min-h-screen px-4 py-12 sm:py-24 bg-white">
      {/* トップページにHeroセクションを表示 */}
      <HeroSection />
    </main>
  );
}
