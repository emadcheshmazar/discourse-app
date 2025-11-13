import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { TrapezoidBackground } from "../../components/ui/TrapezoidBackground";
import type { DiscourseCategory, DiscourseTopic } from "../../types/discourse";
import { TopicList } from "../../components/ui/TopicList";
import { useCategories } from "../../api/hooks/use-categories";
import { useFilteredTopicsBySubCategory } from "../../api/hooks/use-filtered-topics-by-subcategory";

const TECHONOCRATIC_PARENT_ID = 27;
const TECHONOCRATIC_PARENT_SLUG = "technocratic";
const SERVICES_SUBCATEGORY_ID = 29;

function sortCategories(list: DiscourseCategory[]): DiscourseCategory[] {
  return [...list].sort((a, b) => (a.position ?? 0) - (b.position ?? 0));
}

export default function TechnocraticServices() {
  const navigate = useNavigate();

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
          category.id === TECHONOCRATIC_PARENT_ID ||
          category.slug === TECHONOCRATIC_PARENT_SLUG
      ) ?? null
    );
  }, [categories]);

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

  const {
    topics,
    loading: topicsLoading,
    error: topicsError,
    refetch: refetchTopics,
  } = useFilteredTopicsBySubCategory({
    subCategoryIds: [SERVICES_SUBCATEGORY_ID],
    enabled: subCategories.length > 0,
  });

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
    <div className="technocratic-services-container">
      <TrapezoidBackground className="min-h-[280px]">
        <div className="w-full flex flex-col items-start px-[4rem] pt-[5rem]">
          <h1 className="text-3xl font-bold text-[#fff]">خدمات تکنوکراتیک</h1>
          <p className="text-[#fff] text-lg">
            آشنایی با خدمات و سرویس‌های ارائه شده در کتگوری تکنوکراتیک.
          </p>
        </div>
      </TrapezoidBackground>

      <div className="w-full max-w-[1400px] mx-auto px-2 md:px-4 lg:px-6 py-6">
        {categoriesLoading && (
          <div className="mb-6 rounded-md border border-gray-200 bg-white p-4 text-center text-gray-600 shadow-sm">
            در حال بارگذاری...
          </div>
        )}

        {!categoriesLoading && categoriesError && (
          <div className="mb-6 rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            خطا در دریافت کتگوری‌ها: {categoriesError}
          </div>
        )}

        {!categoriesLoading && !categoriesError && parentCategory === null && (
          <div className="mb-6 rounded-md border border-yellow-200 bg-yellow-50 p-4 text-sm text-yellow-700">
            کتگوری تکنوکراتیک یافت نشد.
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

        <TopicList
          topics={topics}
          loading={isLoading}
          error={combinedError ?? null}
          onTopicClick={handleTopicClick}
          onRetry={handleRetry}
          emptyMessage="هیچ پستی یافت نشد."
          styleMode={2}
          layoutMode="grid"
        />
      </div>
    </div>
  );
}
