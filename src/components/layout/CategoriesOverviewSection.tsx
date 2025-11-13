import type { DiscourseCategory } from "../../types/discourse";
import { useCategories } from "../../api/hooks/use-categories";

interface CategoriesOverviewSectionProps {
  className?: string;
}

function sortCategories(list: DiscourseCategory[]): DiscourseCategory[] {
  return [...list].sort((a, b) => (a.position ?? 0) - (b.position ?? 0));
}

export function CategoriesOverviewSection({
  className = "",
}: CategoriesOverviewSectionProps) {
  const { categories, loading, error, refetch } = useCategories();

  const parentCategories = sortCategories(
    categories.filter((category) => !category.parent_category_id)
  );

  const subCategoriesByParent = categories.reduce<
    Record<number, DiscourseCategory[]>
  >((acc, category) => {
    if (category.parent_category_id) {
      if (!acc[category.parent_category_id]) {
        acc[category.parent_category_id] = [];
      }
      acc[category.parent_category_id].push(category);
    }
    return acc;
  }, {});

  Object.values(subCategoriesByParent).forEach((list) => {
    list.sort((a, b) => (a.position ?? 0) - (b.position ?? 0));
  });

  return (
    <section
      className={`rounded-base border border-dashed border-gray-300 bg-white/70 p-6 ${className}`}
    >
      <header className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            فهرست کتگوری‌ها و زیرکتگوری‌ها
          </h2>
          <p className="text-sm text-gray-600">
            این بخش فقط برای مشاهدهٔ ساختار کتگوری‌ها در محیط توسعه است.
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            void refetch();
          }}
          className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-700 shadow-sm transition hover:bg-gray-50"
        >
          بروزرسانی
        </button>
      </header>

      {loading && (
        <p className="text-sm text-gray-600">در حال بارگذاری کتگوری‌ها...</p>
      )}

      {error && (
        <div className="rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          خطا در دریافت کتگوری‌ها: {error}
        </div>
      )}

      {!loading && !error && parentCategories.length === 0 && (
        <p className="text-sm text-gray-600">
          کتگوری‌ای برای نمایش وجود ندارد.
        </p>
      )}

      {!loading && !error && parentCategories.length > 0 && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {parentCategories.map((parentCategory) => {
            const subCategories =
              subCategoriesByParent[parentCategory.id] ?? [];
            return (
              <article
                key={parentCategory.id}
                className="flex flex-col rounded-lg border border-gray-200 bg-white/90 p-4 shadow-sm transition hover:shadow-md"
              >
                <header className="mb-3">
                  <h3 className="text-base font-semibold text-gray-900">
                    {parentCategory.name}
                  </h3>
                  <div className="mt-1 text-xs text-gray-500 space-y-0.5">
                    <div>slug: {parentCategory.slug}</div>
                    <div>id: {parentCategory.id}</div>
                    <div>تعداد زیرکتگوری: {subCategories.length}</div>
                  </div>
                </header>
                <div className="flex-1">
                  {subCategories.length > 0 ? (
                    <ul className="space-y-2 text-sm text-gray-700">
                      {subCategories.map((subCategory) => (
                        <li
                          key={subCategory.id}
                          className="rounded-md bg-gray-50 px-3 py-2"
                        >
                          <div className="font-medium text-gray-900">
                            {subCategory.name}
                          </div>
                          <div className="text-xs text-gray-500">
                            slug: {subCategory.slug} | id: {subCategory.id}
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-500">
                      زیرکتگوری ثبت نشده است.
                    </p>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
