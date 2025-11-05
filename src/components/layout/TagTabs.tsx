import { Tab } from "../ui/Tab";
import { TabList } from "../ui/TabList";
import type { DiscourseTag } from "../../types/discourse";

interface TagTabsProps {
  tags: DiscourseTag[];
  activeTagName: string | null;
  onTagChange: (tagName: string | null) => void;
  loading?: boolean;
}

export function TagTabs({
  tags,
  activeTagName,
  onTagChange,
  loading = false,
}: TagTabsProps) {
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
          label="همه"
          isActive={activeTagName === null}
          onClick={() => onTagChange(null)}
        />
        {tags.map((tag) => (
          <Tab
            key={tag.id}
            id={tag.id}
            label={tag.text}
            isActive={activeTagName === tag.name}
            onClick={() => {
              if (activeTagName === tag.name) {
                onTagChange(null);
              } else {
                onTagChange(tag.name);
              }
            }}
          />
        ))}
      </TabList>
    </div>
  );
}
