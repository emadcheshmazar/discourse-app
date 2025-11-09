import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { TagTabs } from "./TagTabs";
import { TopicList } from "../ui/TopicList";
import type { DiscourseTopic, DiscourseTag } from "../../types/discourse";
import { useTags } from "../../api/hooks/use-tags";
import { useFilteredTopicsByTag } from "../../api/hooks/use-filtered-topics-by-tag";

interface TaggedTopicsSectionProps {
  styleMode?: number;
  emptyMessage?: string;
  layoutMode?: "scroll" | "grid";
}

// Whitelist پیش‌فرض برای تگ‌های مجاز

export function TaggedTopicsSection({
  styleMode = 4,
  emptyMessage = "هیچ پستی یافت نشد.",
  layoutMode = "scroll",
}: TaggedTopicsSectionProps) {
  const navigate = useNavigate();
  const [activeTagName, setActiveTagName] = useState<string | null>(null);
  const tagWhitelist = useMemo<string[]>(
    () => ["ذخیرهسازی", "پردازش", "شبکه", "امنیت"],
    []
  );
  // دریافت تگ‌ها
  const { tags, loading: tagsLoading } = useTags();

  // تعیین تگ‌هایی که باید برای فیلتر استفاده شوند
  const tagsForFilter = useMemo((): string[] => {
    // اگر تبی فعال است، فقط از آن تگ استفاده کن
    if (activeTagName) {
      return [activeTagName];
    }

    // اگر تبی فعال نیست و whitelist وجود دارد، از تمام تگ‌های whitelist استفاده کن
    if (tagWhitelist && tagWhitelist.length > 0) {
      return tagWhitelist;
    }

    // اگر whitelist وجود ندارد، از تمام تگ‌های موجود استفاده کن
    return tags.map((tag) => tag.name);
  }, [activeTagName, tagWhitelist, tags]);

  // دریافت topics بر اساس تگ‌ها
  const { topics, loading, error, refetch } = useFilteredTopicsByTag({
    tags: tagsForFilter,
    enabled: tags.length > 0, // فقط وقتی تگ‌ها لود شده‌اند
  });

  const handleTagChange = (tagName: string | null) => {
    setActiveTagName(tagName);
    // hook به صورت خودکار refetch می‌کند چون tagsForFilter تغییر می‌کند
  };

  const handleTopicClick = (topic: DiscourseTopic) => {
    navigate(`/topic/${topic.id}`);
  };

  const handleRetry = () => {
    refetch();
  };
  
  const getFilteredTags = (): DiscourseTag[] => {
    // اگر whitelist undefined یا خالی باشه، همه تگ‌ها رو برگردون
    if (tagWhitelist === undefined) {
      return tags;
    }
    const whitelist: string[] = tagWhitelist;
    if (whitelist.length === 0) {
      return tags;
    }
    return tags.filter((tag) => whitelist.includes(tag.name));
  };

  return (
    <>
      <TagTabs
        tags={getFilteredTags()}
        activeTagName={activeTagName}
        onTagChange={handleTagChange}
        loading={tagsLoading}
      />
      <TopicList
        topics={topics}
        loading={loading}
        error={error}
        onTopicClick={handleTopicClick}
        onRetry={handleRetry}
        emptyMessage={emptyMessage}
        styleMode={styleMode}
        layoutMode={layoutMode}
      />
    </>
  );
}
