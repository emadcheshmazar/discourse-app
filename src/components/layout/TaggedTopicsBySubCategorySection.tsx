import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { DiscourseCategory, DiscourseTopic } from "../../types/discourse";
import { TopicList } from "../ui/TopicList";
import { useCategories } from "../../api/hooks/use-categories";
import { useFilteredTopicsBySubCategory } from "../../api/hooks/use-filtered-topics-by-subcategory";
import { TabList } from "../ui/TabList";
import { Tab } from "../ui/Tab";

interface TaggedTopicsBySubCategorySectionProps {
  className?: string;
  styleMode?: number;
  emptyMessage?: string;
  layoutMode?: "scroll" | "grid";
  parentCategoryId?: number;
  parentCategorySlug?: string;
}

const DEFAULT_PARENT_CATEGORY_ID = 11; // Datacenter Products
const DEFAULT_PARENT_CATEGORY_SLUG = "datacenter-products";

function sortCategories(list: DiscourseCategory[]): DiscourseCategory[] {
  return [...list].sort((a, b) => (a.position ?? 0) - (b.position ?? 0));
}

export function TaggedTopicsBySubCategorySection({
  styleMode = 4,
  emptyMessage = "هیچ پستی یافت نشد.",
  layoutMode = "scroll",
  parentCategoryId = DEFAULT_PARENT_CATEGORY_ID,
  parentCategorySlug = DEFAULT_PARENT_CATEGORY_SLUG,
}: TaggedTopicsBySubCategorySectionProps) {
  const navigate = useNavigate();
  const [activeSubCategoryId, setActiveSubCategoryId] = useState<number | null>(
    null
  );

  const {
    categories,
    loading: categoriesLoading,
    error: categoriesError,
    refetch: refetchCategories,
  } = useCategories();

  const parentCategory = useMemo(() => {
    return (
      categories.find(
        (category) =>
          category.id === parentCategoryId ||
          category.slug === parentCategorySlug
      ) ?? null
    );
  }, [categories, parentCategoryId, parentCategorySlug]);

  const subCategories = useMemo(() => {
    if (!parentCategory) {
      return [] as DiscourseCategory[];
    }
    return sortCategories(
      categories.filter(
        (category) => category.parent_category_id === parentCategory.id
      )
    );
  }, [categories, parentCategory]);

  const subCategoryIds = useMemo(
    () => subCategories.map((category) => category.id),
    [subCategories]
  );

  useEffect(() => {
    if (
      activeSubCategoryId !== null &&
      !subCategoryIds.includes(activeSubCategoryId)
    ) {
      setActiveSubCategoryId(null);
    }
  }, [activeSubCategoryId, subCategoryIds]);

  const subCategoryIdsForFilter = useMemo(() => {
    if (activeSubCategoryId !== null) {
      return [activeSubCategoryId];
    }
    return subCategoryIds;
  }, [activeSubCategoryId, subCategoryIds]);

  const {
    topics,
    loading: topicsLoading,
    error: topicsError,
    refetch: refetchTopics,
  } = useFilteredTopicsBySubCategory({
    subCategoryIds: subCategoryIdsForFilter,
    enabled: subCategoryIds.length > 0,
  });

  const handleTabClick = (id: string) => {
    if (id === "all") {
      setActiveSubCategoryId(null);
      return;
    }

    const numericId = Number(id);
    setActiveSubCategoryId((prev) => (prev === numericId ? null : numericId));
  };

  const handleTopicClick = (topic: DiscourseTopic) => {
    navigate(`/topic/${topic.id}`);
  };

  const handleRetry = () => {
    if (categoriesError) {
      void refetchCategories();
    } else {
      refetchTopics();
    }
  };

  const isLoading = categoriesLoading || topicsLoading;
  const combinedError = categoriesError ?? topicsError;

  return (
    <div className="mt-[4px]">
      {categoriesLoading && (
        <div className="mb-6">
          <TabList>
            <div className="px-4 py-2 text-gray-500">در حال بارگذاری...</div>
          </TabList>
        </div>
      )}

      {!categoriesLoading && categoriesError && (
        <div className="mb-6 rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          خطا در دریافت کتگوری‌ها: {categoriesError}
        </div>
      )}

      {!categoriesLoading && !categoriesError && parentCategory === null && (
        <div className="mb-6 rounded-md border border-yellow-200 bg-yellow-50 p-4 text-sm text-yellow-700">
          کتگوری مورد نظر یافت نشد.
        </div>
      )}

      {!categoriesLoading &&
        !categoriesError &&
        parentCategory !== null &&
        subCategories.length === 0 && (
          <div className="mb-6 rounded-md border border-yellow-200 bg-yellow-50 p-4 text-sm text-yellow-700">
            برای این کتگوری زیرکتگوری ثبت نشده است.
          </div>
        )}

      {!categoriesLoading && !categoriesError && subCategories.length > 0 && (
        <TabList>
          {subCategories.map((subCategory) => (
            <Tab
              key={subCategory.id}
              id={String(subCategory.id)}
              label={subCategory.name}
              isActive={activeSubCategoryId === subCategory.id}
              onClick={handleTabClick}
            />
          ))}
        </TabList>
      )}

      <TopicList
        topics={topics}
        loading={isLoading}
        error={combinedError ?? null}
        onTopicClick={handleTopicClick}
        onRetry={handleRetry}
        emptyMessage={
          subCategories.length === 0
            ? "زیرکتگوری فعالی برای نمایش وجود ندارد."
            : emptyMessage
        }
        styleMode={styleMode}
        layoutMode={layoutMode}
      />
    </div>
  );
}
