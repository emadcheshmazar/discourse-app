import { Tab } from "../ui/Tab";
import { TabList } from "../ui/TabList";
import type { DiscourseCategory } from "../../types/discourse";

interface CategoryTabsProps {
  categories: DiscourseCategory[];
  activeCategoryId: number | null;
  onCategoryChange: (categoryId: number | null) => void;
  loading?: boolean;
}

export function CategoryTabs({
  categories,
  activeCategoryId,
  onCategoryChange,
  loading = false,
}: CategoryTabsProps) {
  if (loading) {
    return (
      <div className="mb-6">
        <TabList>
          <div className="px-4 py-2 text-gray-500">در حال بارگذاری...</div>
        </TabList>
      </div>
    );
  }

  return (
    <div className="mb-6 mt-1">
      <TabList>
        <Tab
          id="all"
          label="همه تاپیک‌ها"
          isActive={activeCategoryId === null}
          onClick={() => onCategoryChange(null)}
        />
        {categories.map((category) => (
          <Tab
            key={category.id}
            id={String(category.id)}
            label={category.name}
            isActive={activeCategoryId === category.id}
            onClick={() => onCategoryChange(category.id)}
          />
        ))}
      </TabList>
    </div>
  );
}
