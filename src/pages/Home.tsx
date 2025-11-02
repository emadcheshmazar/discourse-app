import { useEffect, useState } from "react";
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
