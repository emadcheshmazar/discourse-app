import { useEffect, useState } from "react";
import { CategoryTabs } from "../components/layout/CategoryTabs";
import { TopicList } from "../components/ui/TopicList";
import { HeroBanner } from "../components/layout/HeroBanner";
import { PostsSection } from "../components/layout/PostsSection";
import { SpaceHeader } from "../components/layout/SpaceHeader";
import { testApiWithNewConfig, testDirectFetch } from "../utils/api-test";
import type { DiscourseTopic, DiscourseCategory } from "../types/discourse";
import { HorizontalImageCardsSection } from "../components/layout/HorizontalImageCardsSection";
import { BusinessAssociatesSection } from "../components/layout/BusinessAssociatesSection";
import { BannerSection } from "../components/layout/BannerSection";
import { NewsHeaderSection } from "../components/layout/LatestNewsSection";
import { SectionHeader } from "../components/layout/SectionHeader";
import { TopProductsCardsSection } from "../components/layout/TopProductsCardsSection";
import { FooterBannerSection } from "../components/layout/FooterBannerSection";
import { LatestServicesSection } from "../components/layout/LatestServicesSection";
import { ServicesCardsSection } from "../components/layout/ServicesCardsSection";
import { LatestNewsAndContinuitySection } from "../components/layout/LatestNewsAndContinuitySection";
import { IndustrySLACardsSection } from "../components/layout/IndustrySLACardsSection";
import { Footer } from "../components/layout/Footer";

export default function Home() {
  const [topics, setTopics] = useState<DiscourseTopic[]>([]);
  const [categories, setCategories] = useState<DiscourseCategory[]>([]);
  const [activeCategoryId, setActiveCategoryId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadCategories = async () => {
    try {
      setCategoriesLoading(true);

      // استفاده از همان متدی که در api-test.ts کار می‌کند
      const apiBase = import.meta.env.DEV
        ? "/api/discourse"
        : "https://aliasysdiscourse.ir";

      const response = await fetch(`${apiBase}/categories.json`, {
        method: "GET",
        mode: import.meta.env.DEV ? "same-origin" : "cors",
        credentials: "include",
        headers: {
          accept: "application/json, text/javascript, */*; q=0.01",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const categoriesArray = data.category_list?.categories || [];

      console.log("📋 لیست کامل کتگوری‌ها:", categoriesArray);
      categoriesArray.forEach((category: DiscourseCategory, index: number) => {
        console.log(
          `${index + 1}. [ID: ${category.id}] ${category.name} (slug: ${
            category.slug
          }, topics: ${category.topic_count})`
        );
      });

      setCategories(categoriesArray);
    } catch (err) {
      console.error("❌ خطا در بارگذاری کتگوری‌ها:", err);
    } finally {
      setCategoriesLoading(false);
    }
  };

  const loadTopics = async (categoryId: number | null = null) => {
    try {
      setLoading(true);
      setError(null);

      const apiBase = import.meta.env.DEV
        ? "/api/discourse"
        : "https://aliasysdiscourse.ir";

      let url: string;
      if (categoryId) {
        const category = categories.find((c) => c.id === categoryId);
        if (category) {
          url = `${apiBase}/c/${category.slug}/${category.id}/l/latest.json?filter=default`;
        } else {
          console.warn(`⚠️ Category not found: ${categoryId}`);
          setLoading(false);
          return;
        }
      } else {
        url = `${apiBase}/latest.json`;
      }

      const response = await fetch(url, {
        method: "GET",
        mode: import.meta.env.DEV ? "same-origin" : "cors",
        credentials: "include",
        headers: {
          accept: "application/json, text/javascript, */*; q=0.01",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const topicsArray = data?.topic_list?.topics || [];
      setTopics(topicsArray);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      console.error("❌ Error loading topics:", errorMessage);
      setError(`خطا در بارگذاری تاپیک‌ها: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (categoryId: number | null) => {
    setActiveCategoryId(categoryId);
    loadTopics(categoryId);
  };

  const handleTopicClick = (topic: DiscourseTopic) => {
    console.log("تاپیک انتخاب شد:", topic);
  };

  const handleRetry = () => {
    loadTopics(activeCategoryId);
  };

  useEffect(() => {
    testApiWithNewConfig().then((success) => {
      if (success) {
        console.log("✅ API تست موفق - بارگذاری دیتا...");
        loadCategories();
      } else {
        console.log("❌ API تست ناموفق - تست مستقیم...");
        testDirectFetch();
      }
    });
  }, []);

  useEffect(() => {
    if (categories.length > 0) {
      loadTopics();
    }
  }, [categories]);

  return (
    <div className="w-full max-w-[1400px] mx-auto px-2 md:px-4 lg:px-6">
      <HeroBanner />
      <PostsSection />
      <SpaceHeader />
      <CategoryTabs
        categories={categories}
        activeCategoryId={activeCategoryId}
        onCategoryChange={handleCategoryChange}
        loading={categoriesLoading}
      />
      <HorizontalImageCardsSection />
      <BusinessAssociatesSection />
      <BannerSection />
      <NewsHeaderSection />
      <TopicList
        topics={topics}
        limit={3}
        offset={0}
        loading={loading}
        error={error}
        onTopicClick={handleTopicClick}
        onRetry={handleRetry}
        emptyMessage="هیچ تاپیکی در این کتگوری یافت نشد."
      />
      <SectionHeader />
      <CategoryTabs
        categories={categories}
        activeCategoryId={activeCategoryId}
        onCategoryChange={handleCategoryChange}
        loading={categoriesLoading}
      />
      <TopProductsCardsSection />
      <FooterBannerSection />
      <LatestServicesSection />
      <TopicList
        topics={topics}
        limit={3}
        offset={3}
        loading={loading}
        error={error}
        onTopicClick={handleTopicClick}
        onRetry={handleRetry}
        emptyMessage="هیچ تاپیکی در این کتگوری یافت نشد."
      />
      <SectionHeader
        title="خدمات برتر ما"
        subtitle="از بهترین متخصصان در شهر آلیا"
        blockId="top-services-section"
      />
      <ServicesCardsSection />
      <LatestNewsAndContinuitySection />
      <TopicList
        topics={topics}
        limit={3}
        offset={6}
        loading={loading}
        error={error}
        onTopicClick={handleTopicClick}
        onRetry={handleRetry}
        emptyMessage="هیچ تاپیکی در این کتگوری یافت نشد."
      />
      <SectionHeader
        title="برترین SLA های صنعتی ما"
        subtitle="از برترین مدیران تکنوکرات ما"
        blockId="top-industry-slas-section"
        extraPadding={true}
      />
      <IndustrySLACardsSection />
      <Footer />
      this is test
    </div>
  );
}
