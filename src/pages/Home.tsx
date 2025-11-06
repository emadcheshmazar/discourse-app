import { useEffect } from "react";
import { HeroBanner } from "../components/layout/HeroBanner";
import { PostsSection } from "../components/layout/PostsSection";
import { SpaceHeader } from "../components/layout/SpaceHeader";
import { testApiWithNewConfig, testDirectFetch } from "../utils/api-test";
import { BusinessAssociatesSection } from "../components/layout/BusinessAssociatesSection";
import { BannerSection } from "../components/layout/BannerSection";
import { LatestNewsWithTopicsSection } from "../components/layout/LatestNewsWithTopicsSection";
import { SectionHeader } from "../components/layout/SectionHeader";
import { FooterBannerSection } from "../components/layout/FooterBannerSection";
import { LatestServicesSection } from "../components/layout/LatestServicesSection";
import { ServicesCardsSection } from "../components/layout/ServicesCardsSection";
import { LatestNewsAndContinuitySection } from "../components/layout/LatestNewsAndContinuitySection";
import { Footer } from "../components/layout/Footer";
import { TaggedTopicsSection } from "../components/layout/TaggedTopicsSection";
import { LatestServicesTopicsSection } from "../components/layout/LatestServicesTopicsSection";
import { EmergingSLATopicsSection } from "../components/layout/EmergingSLATopicsSection";
import { IndustrySLATopicsSection } from "../components/layout/IndustrySLATopicsSection";
import { FilteredTopicsSection } from "../components/layout/FilteredTopicsSection";

export default function Home() {
  // Whitelist برای تگ‌های مجاز - اگه خالی یا undefined باشه، همه تگ‌ها نمایش داده میشن
  const tagWhitelist1: string[] = [
    "data-storage",
    "زیرساخت-محاسباتی",
    "شبکه-سازمانی",
    "امنیت-سایبری",
  ]; // بخش اول - فقط این تگ‌ها نمایش داده می‌شوند

  useEffect(() => {
    testApiWithNewConfig().then((success) => {
      if (success) {
        console.log("✅ API تست موفق");
      } else {
        console.log("❌ API تست ناموفق - تست مستقیم...");
        testDirectFetch();
      }
    });
  }, []);

  return (
    <div className="w-full max-w-[1400px] mx-auto px-2 md:px-4 lg:px-6">
      <HeroBanner />
      <PostsSection />
      <SpaceHeader />
      <FilteredTopicsSection
        tagWhitelist={tagWhitelist1}
        styleMode={2}
        emptyMessage="هیچ پستی یافت نشد."
      />
      <BusinessAssociatesSection />
      <BannerSection />
      <LatestNewsWithTopicsSection />
      <TaggedTopicsSection styleMode={4} />
      {/* <TopProductsCardsSection /> */}
      <FooterBannerSection />
      <LatestServicesSection />
      <LatestServicesTopicsSection />
      <SectionHeader
        title="خدمات برتر ما"
        subtitle="از بهترین متخصصان در شهر آلیا"
        blockId="top-services-section"
      />
      <ServicesCardsSection />
      <LatestNewsAndContinuitySection />
      <EmergingSLATopicsSection />
      <IndustrySLATopicsSection />

      <Footer />
    </div>
  );
}
