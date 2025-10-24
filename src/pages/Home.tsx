import { useEffect, useState } from "react";
import { DiscourseService } from "../services/discourse-service";
import { CategoryTabs } from "../components/layout/CategoryTabs";
import { TopicList } from "../components/ui/TopicList";
import type { DiscourseTopic, DiscourseCategory } from "../types/discourse";

export default function Home() {
  const [topics, setTopics] = useState<DiscourseTopic[]>([]);
  const [categories, setCategories] = useState<DiscourseCategory[]>([]);
  const [activeCategoryId, setActiveCategoryId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const discourseService = new DiscourseService();

  const loadCategories = async () => {
    try {
      setCategoriesLoading(true);
      const data = await discourseService.getCategories();
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
          data = await discourseService.getCategoryTopics(
            category.slug,
            category.id
          );
        }
      } else {
        data = await discourseService.getLatestTopics();
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
    // اینجا می‌تونیم به صفحه جزئیات تاپیک بریم
  };

  const handleRetry = () => {
    loadTopics(activeCategoryId);
  };

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    if (categories.length > 0) {
      loadTopics();
    }
  }, [categories]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">🏠 صفحه اصلی</h1>
        <p className="text-gray-600">
          آخرین تاپیک‌های Discourse را اینجا مشاهده کنید
        </p>
      </div>

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
