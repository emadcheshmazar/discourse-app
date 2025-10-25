import { useEffect, useState } from "react";
import { DiscourseApi } from "../services/discourse-api";
import { CategoryTabs } from "../components/layout/CategoryTabs";
import { TopicList } from "../components/ui/TopicList";
import { HeroBanner } from "../components/layout/HeroBanner";
import { PostsSection } from "../components/layout/PostsSection";
import { SpaceHeader } from "../components/layout/SpaceHeader";
import { testApiWithNewConfig, testDirectFetch } from "../utils/api-test";
import type { DiscourseTopic, DiscourseCategory } from "../types/discourse";

export default function Home() {
  const [topics, setTopics] = useState<DiscourseTopic[]>([]);
  const [categories, setCategories] = useState<DiscourseCategory[]>([]);
  const [activeCategoryId, setActiveCategoryId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const discourseApi = new DiscourseApi();

  const loadCategories = async () => {
    try {
      setCategoriesLoading(true);
      const data = await discourseApi.getCategories();
      setCategories(data.category_list.categories);
    } catch (err) {
      console.error("خطا در بارگذاری کتگوری‌ها:", err);
    } finally {
      setCategoriesLoading(false);
    }
  };

  const loadTopics = async (categoryId: number | null = null) => {
    try {
      setLoading(true);
      setError(null);

      let data;
      if (categoryId) {
        const category = categories.find((c) => c.id === categoryId);
        if (category) {
          data = await discourseApi.getCategoryTopics(
            category.slug,
            category.id
          );
        }
      } else {
        data = await discourseApi.getLatestTopics();
      }

      setTopics(data?.topic_list.topics || []);
    } catch (err) {
      setError(
        "خطا در بارگذاری تاپیک‌ها. لطفاً دامنه Discourse را در فایل constants/api.ts تنظیم کنید."
      );
      console.error(err);
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
    <div className="max-w-4xl mx-auto p-0">
      <HeroBanner />
      <PostsSection />
      <SpaceHeader />

      <CategoryTabs
        categories={categories}
        activeCategoryId={activeCategoryId}
        onCategoryChange={handleCategoryChange}
        loading={categoriesLoading}
      />

      <TopicList
        topics={topics}
        loading={loading}
        error={error}
        onTopicClick={handleTopicClick}
        onRetry={handleRetry}
        emptyMessage="هیچ تاپیکی در این کتگوری یافت نشد."
      />
    </div>
  );
}
