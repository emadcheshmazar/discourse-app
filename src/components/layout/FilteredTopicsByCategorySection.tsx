import { useNavigate } from "react-router-dom";
import { CategoryTabs } from "./CategoryTabs";
import { TagTabs } from "./TagTabs";
import { HorizontalTopicList } from "../ui/HorizontalTopicList";
import type { DiscourseTopic } from "../../types/discourse";
import { useFilteredTopicsByCategory } from "../../api/hooks/use-filtered-topics-by-category";
import { useCategories } from "../../api/hooks/use-categories";
import { useTags } from "../../api/hooks/use-tags";
import { useState, useMemo } from "react";

interface FilteredTopicsByCategorySectionProps {
  className?: string;
  categoryWhitelist?: number[]; // لیست ID های کتگوری‌های مجاز
  styleMode?: number;
  emptyMessage?: string;
}

export function FilteredTopicsByCategorySection({
  className = "",
  categoryWhitelist = undefined,
  styleMode = 2,
  emptyMessage = "هیچ پستی یافت نشد.",
}: FilteredTopicsByCategorySectionProps) {
  const navigate = useNavigate();
  const [activeCategoryId, setActiveCategoryId] = useState<number | null>(null);
  const [activeTagName, setActiveTagName] = useState<string | null>(null);

  // استفاده از hook برای دریافت کتگوری‌ها
  const { categories, loading: categoriesLoading } = useCategories();

  // استفاده از hook برای دریافت تگ‌ها
  const { tags, loading: tagsLoading } = useTags();

  // تعیین کتگوری‌هایی که باید برای فیلتر استفاده شوند
  // استفاده از useMemo برای جلوگیری از re-render های غیرضروری
  const categoryIdsForFilter = useMemo((): number[] | undefined => {
    // اگر کتگوری خاصی فعال است، فقط از آن کتگوری استفاده کن
    if (activeCategoryId) {
      return [activeCategoryId];
    }

    // اگر هیچ کتگوری فعال نیست، undefined برگردان تا همه topics بیاید
    return undefined;
  }, [activeCategoryId]);

  // تعیین تگ‌هایی که باید برای فیلتر استفاده شوند
  const tagsForFilter = useMemo((): string[] | undefined => {
    // اگر تگی انتخاب شده، فقط از آن تگ استفاده کن
    if (activeTagName) {
      return [activeTagName];
    }
    // اگر تگی انتخاب نشده، undefined برگردان تا همه topics بیاید
    return undefined;
  }, [activeTagName]);

  // استفاده از hook برای فیلتر کردن topics
  // ارسال categories هم برای استفاده از slug در صورت نیاز
  const { topics, loading, error, refetch } = useFilteredTopicsByCategory({
    categoryIds: categoryIdsForFilter,
    categories: activeCategoryId
      ? categories.filter((c) => c.id === activeCategoryId)
      : undefined,
    tags: tagsForFilter, // اضافه کردن فیلتر تگ
    enabled: categories.length > 0, // فقط وقتی کتگوری‌ها لود شده‌اند
  });

  const handleCategoryChange = (categoryId: number | null) => {
    setActiveCategoryId(categoryId);
    // وقتی کتگوری تغییر می‌کند، تگ فعال را reset کن
    setActiveTagName(null);
    // hook به صورت خودکار refetch می‌کند چون categoryIds تغییر می‌کند
  };

  const handleTagChange = (tagName: string | null) => {
    setActiveTagName(tagName);
    // hook به صورت خودکار refetch می‌کند چون tags تغییر می‌کند
  };

  const handleTopicClick = (topic: DiscourseTopic) => {
    navigate(`/topic/${topic.id}`);
  };

  const handleRetry = () => {
    refetch();
  };

  const getFilteredCategories = () => {
    // اگر whitelist undefined یا خالی باشه، همه کتگوری‌ها رو برگردون
    if (categoryWhitelist === undefined) {
      return categories;
    }
    const whitelist: number[] = categoryWhitelist;
    if (whitelist.length === 0) {
      return categories;
    }
    return categories.filter((category) => whitelist.includes(category.id));
  };

  return (
    <div className={className}>
      <CategoryTabs
        categories={getFilteredCategories()}
        activeCategoryId={activeCategoryId}
        onCategoryChange={handleCategoryChange}
        loading={categoriesLoading}
      />
      {/* نمایش تب‌های تگ فقط وقتی یک کتگوری فعال است */}
      {activeCategoryId && (
        <TagTabs
          tags={tags}
          activeTagName={activeTagName}
          onTagChange={handleTagChange}
          loading={tagsLoading}
        />
      )}
      <HorizontalTopicList
        topics={topics}
        loading={loading}
        error={error}
        onTopicClick={handleTopicClick}
        onRetry={handleRetry}
        emptyMessage={emptyMessage}
        styleMode={styleMode}
      />
    </div>
  );
}
