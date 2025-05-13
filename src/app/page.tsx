import HeroSection from "@/components/HeroSection"; // Heroセクションをインポート
// お問い合わせセクションをインポート
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
    <main className="min-h-screen px-4 py-12 sm:py-24 bg-white">
      {/* トップページにHeroセクションを表示 */}
      <HeroSection />
      {/* お問い合わせセクションを表示 */}
      <ContactSection />
    </main>
  );
}
