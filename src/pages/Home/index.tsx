import { HeroBanner } from "../../components/layout/HeroBanner";
import { PostsSection } from "../../components/layout/PostsSection";
import { SpaceHeader } from "../../components/layout/SpaceHeader";
import { BusinessAssociatesSection } from "../../components/layout/BusinessAssociatesSection";
import { BannerSection } from "../../components/layout/BannerSection";
// import { LatestNewsWithTopicsSection } from "../../components/layout/LatestNewsWithTopicsSection";
import { SectionHeader } from "../../components/layout/SectionHeader";
import { FooterBannerSection } from "../../components/layout/FooterBannerSection";
import { LatestServicesSection } from "../../components/layout/LatestServicesSection";
// import { ServicesCardsSection } from "../../components/layout/ServicesCardsSection";
import { LatestNewsAndContinuitySection } from "../../components/layout/LatestNewsAndContinuitySection";
import { Footer } from "../../components/layout/Footer";
// import { TaggedTopicsSection } from "../../components/layout/TaggedTopicsSection";
import { LatestServicesTopicsSection } from "../../components/layout/LatestServicesTopicsSection";
import { EmergingSLATopicsSection } from "../../components/layout/EmergingSLATopicsSection";
import { IndustrySLATopicsSection } from "../../components/layout/IndustrySLATopicsSection";
// import { FilteredTopicsSection } from "../../components/layout/FilteredTopicsSection";
// import { FilteredTopicsByCategorySection } from "../../components/layout/FilteredTopicsByCategorySection";
import { ContinuityManagementSection } from "../../components/layout/ContinuityManagementSection";
// import { CategoriesOverviewSection } from "../../components/layout/CategoriesOverviewSection";
import { FilteredTopicsBySubCategorySection } from "../../components/layout/FilteredTopicsBySubCategorySection";
import { LatestExploreNewsSubCategorySection } from "../../components/layout/LatestExploreNewsSubCategorySection";
import { TaggedTopicsBySubCategorySection } from "../../components/layout/TaggedTopicsBySubCategorySection";

export default function Home() {
  return (
    <div className="home-container">
      {/* <CategoriesOverviewSection /> */}
      <HeroBanner />
      <PostsSection />
      <SpaceHeader />
      <FilteredTopicsBySubCategorySection />
      <BusinessAssociatesSection />

      <BannerSection />
      {/* <LatestNewsWithTopicsSection /> */}
      <LatestExploreNewsSubCategorySection />
      <SectionHeader
        title="محصولات برتر ما"
        subtitle="از برترین شرکای ما در سراسر جهان"
      />
      {/* <TaggedTopicsSection /> */}
      <TaggedTopicsBySubCategorySection />
      <FooterBannerSection />
      <LatestServicesSection />
      <LatestServicesTopicsSection />
      <SectionHeader
        title="خدمات برتر ما"
        subtitle="از بهترین متخصصان در شهر آلیا"
        blockId="top-services-section"
      />
      {/* <ServicesCardsSection /> */}
      <LatestNewsAndContinuitySection />
      <EmergingSLATopicsSection />
      <IndustrySLATopicsSection />
      <ContinuityManagementSection />

      <Footer />
    </div>
  );
}
