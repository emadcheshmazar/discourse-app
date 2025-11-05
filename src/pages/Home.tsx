import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TagTabs } from "../components/layout/TagTabs";
import { TopicList } from "../components/ui/TopicList";
import { HorizontalTopicList } from "../components/ui/HorizontalTopicList";
import { HeroBanner } from "../components/layout/HeroBanner";
import { PostsSection } from "../components/layout/PostsSection";
import { SpaceHeader } from "../components/layout/SpaceHeader";
import { testApiWithNewConfig, testDirectFetch } from "../utils/api-test";
import type { DiscourseTopic, DiscourseTag } from "../types/discourse";
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
  const navigate = useNavigate();
  const [topics1, setTopics1] = useState<DiscourseTopic[]>([]); // تاپیک‌های بخش اول
  const [topics2, setTopics2] = useState<DiscourseTopic[]>([]); // تاپیک‌های بخش دوم
  const [tags, setTags] = useState<DiscourseTag[]>([]);

  const [activeTagName1, setActiveTagName1] = useState<string | null>(null);
  const [activeTagName2, setActiveTagName2] = useState<string | null>(null);

  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [tagsLoading, setTagsLoading] = useState(true);
  const [error1, setError1] = useState<string | null>(null);
  const [error2, setError2] = useState<string | null>(null);

  // Whitelist برای تگ‌های مجاز - اگه خالی یا undefined باشه، همه تگ‌ها نمایش داده میشن
  const tagWhitelist1: string[] | undefined = undefined; // بخش اول - اگه undefined باشه، همه تگ‌ها نشون داده میشن
  const tagWhitelist2: string[] | undefined = undefined; // بخش دوم - اگه undefined باشه، همه تگ‌ها نشون داده میشن

  const loadTags = async () => {
    try {
      setTagsLoading(true);

      const apiBase = import.meta.env.DEV
        ? "/api/discourse"
        : "https://aliasysdiscourse.ir";

      const response = await fetch(`${apiBase}/tags.json`, {
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
      const tagsArray = data.tags || [];

      console.log("🏷️ لیست کامل تگ‌ها:", tagsArray);
      tagsArray.forEach((tag: DiscourseTag, index: number) => {
        console.log(
          `${index + 1}. [ID: ${tag.id}] ${tag.text} (name: ${
            tag.name
          }, topics: ${tag.topic_count})`
        );
      });

      setTags(tagsArray);
    } catch (err) {
      console.error("❌ خطا در بارگذاری تگ‌ها:", err);
    } finally {
      setTagsLoading(false);
    }
  };

  const loadTopics = async (
    tagName: string | null = null,
    section: 1 | 2 = 1
  ) => {
    try {
      if (section === 1) {
        setLoading1(true);
        setError1(null);
      } else {
        setLoading2(true);
        setError2(null);
      }

      const apiBase = import.meta.env.DEV
        ? "/api/discourse"
        : "https://aliasysdiscourse.ir";

      let url: string;
      if (tagName) {
        // URL encode برای تگ‌هایی که ممکنه کاراکترهای خاص داشته باشن
        const encodedTagName = encodeURIComponent(tagName);
        url = `${apiBase}/tag/${encodedTagName}.json`;
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

      if (section === 1) {
        setTopics1(topicsArray);
      } else {
        setTopics2(topicsArray);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      console.error(
        `❌ Error loading topics for section ${section}:`,
        errorMessage
      );
      if (section === 1) {
        setError1(`خطا در بارگذاری تاپیک‌ها: ${errorMessage}`);
      } else {
        setError2(`خطا در بارگذاری تاپیک‌ها: ${errorMessage}`);
      }
    } finally {
      if (section === 1) {
        setLoading1(false);
      } else {
        setLoading2(false);
      }
    }
  };

  const handleTagChange1 = (tagName: string | null) => {
    setActiveTagName1(tagName);
    loadTopics(tagName, 1);
  };

  const handleTagChange2 = (tagName: string | null) => {
    setActiveTagName2(tagName);
    loadTopics(tagName, 2);
  };

  const getFilteredTags1 = (): DiscourseTag[] => {
    // اگر whitelist undefined یا خالی باشه، همه تگ‌ها رو برگردون
    if (tagWhitelist1 === undefined) {
      return tags;
    }
    const whitelist: string[] = tagWhitelist1;
    if (whitelist.length === 0) {
      return tags;
    }
    return tags.filter((tag) => whitelist.includes(tag.name));
  };

  const getFilteredTags2 = (): DiscourseTag[] => {
    // اگر whitelist undefined یا خالی باشه، همه تگ‌ها رو برگردون
    if (tagWhitelist2 === undefined) {
      return tags;
    }
    const whitelist: string[] = tagWhitelist2;
    if (whitelist.length === 0) {
      return tags;
    }
    return tags.filter((tag) => whitelist.includes(tag.name));
  };

  const handleTopicClick = (topic: DiscourseTopic) => {
    navigate(`/topic/${topic.id}`);
  };

  const handleRetry1 = () => {
    loadTopics(activeTagName1, 1);
  };

  const handleRetry2 = () => {
    loadTopics(activeTagName2, 2);
  };

  useEffect(() => {
    testApiWithNewConfig().then((success) => {
      if (success) {
        console.log("✅ API تست موفق - بارگذاری دیتا...");
        loadTags();
      } else {
        console.log("❌ API تست ناموفق - تست مستقیم...");
        testDirectFetch();
      }
    });
  }, []);

  useEffect(() => {
    if (tags.length > 0) {
      // بارگذاری اولیه برای بخش دوم
      loadTopics(activeTagName2, 2);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tags]);

  return (
    <div className="w-full max-w-[1400px] mx-auto px-2 md:px-4 lg:px-6">
      <HeroBanner />
      <PostsSection />
      <SpaceHeader />
      <TagTabs
        tags={getFilteredTags1()}
        activeTagName={activeTagName1}
        onTagChange={handleTagChange1}
        loading={tagsLoading}
      />
      <HorizontalTopicList
        topics={topics1}
        loading={loading1}
        error={error1}
        onTopicClick={handleTopicClick}
        onRetry={handleRetry1}
        emptyMessage="هیچ تاپیکی یافت نشد."
        styleMode={2}
      />
      <HorizontalImageCardsSection />
      <TopicList
        topics={topics2}
        limit={3}
        offset={3}
        loading={loading2}
        error={error2}
        onTopicClick={handleTopicClick}
        onRetry={handleRetry2}
        emptyMessage="هیچ تاپیکی در این کتگوری یافت نشد."
        styleMode={2}
      />
      <BusinessAssociatesSection />
      <BannerSection />
      <NewsHeaderSection />
      <TopicList
        topics={topics2}
        limit={3}
        offset={0}
        loading={loading2}
        error={error2}
        onTopicClick={handleTopicClick}
        onRetry={handleRetry2}
        emptyMessage="هیچ تاپیکی در این کتگوری یافت نشد."
        styleMode={2}
      />
      <SectionHeader />
      <TagTabs
        tags={getFilteredTags2()}
        activeTagName={activeTagName2}
        onTagChange={handleTagChange2}
        loading={tagsLoading}
      />
      <TopProductsCardsSection />
      <FooterBannerSection />
      <LatestServicesSection />
      <TopicList
        topics={topics2}
        limit={3}
        offset={3}
        loading={loading2}
        error={error2}
        onTopicClick={handleTopicClick}
        onRetry={handleRetry2}
        emptyMessage="هیچ تاپیکی در این کتگوری یافت نشد."
        styleMode={3}
      />
      <SectionHeader
        title="خدمات برتر ما"
        subtitle="از بهترین متخصصان در شهر آلیا"
        blockId="top-services-section"
      />
      <ServicesCardsSection />
      <LatestNewsAndContinuitySection />
      <TopicList
        topics={topics2}
        limit={3}
        offset={6}
        loading={loading2}
        error={error2}
        onTopicClick={handleTopicClick}
        onRetry={handleRetry2}
        emptyMessage="هیچ تاپیکی در این کتگوری یافت نشد."
        styleMode={4}
      />
      <SectionHeader
        title="برترین SLA های صنعتی ما"
        subtitle="از برترین مدیران تکنوکرات ما"
        blockId="top-industry-slas-section"
        extraPadding={true}
      />
      <IndustrySLACardsSection />
      <Footer />
    </div>
  );
}
