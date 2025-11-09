import { useNavigate } from "react-router-dom";
import { TagTabs } from "./TagTabs";
import { HorizontalTopicList } from "../ui/HorizontalTopicList";
import type { DiscourseTag, DiscourseTopic } from "../../types/discourse";
import { useFilteredTopicsByTag } from "../../api/hooks/use-filtered-topics-by-tag";
import { useTags } from "../../api/hooks/use-tags";
import { useState, useMemo } from "react";

interface FilteredTopicsSectionProps {
  className?: string;
  styleMode?: number;
  emptyMessage?: string;
}

export function FilteredTopicsSection({
  className = "",
  styleMode = 2,
  emptyMessage = "هیچ پستی یافت نشد.",
}: FilteredTopicsSectionProps) {
  const navigate = useNavigate();
  const [activeTagName, setActiveTagName] = useState<string | null>(null);
  const tagWhitelist = useMemo<string[]>(
    () => ["data-storage", "زیرساخت-محاسباتی", "شبکه-سازمانی", "امنیت-سایبری"],
    []
  );

  // استفاده از hook برای دریافت تگ‌ها
  const { tags, loading: tagsLoading } = useTags();

  // تعیین تگ‌هایی که باید برای فیلتر استفاده شوند
  // استفاده از useMemo برای جلوگیری از re-render های غیرضروری
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

  // استفاده از hook برای فیلتر کردن topics
  const { topics, loading, error, refetch } = useFilteredTopicsByTag({
    tags: tagsForFilter,
    enabled: tags.length > 0, // فقط وقتی تگ‌ها لود شده‌اند
  });

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
    <div className={className}>
      <TagTabs
        tags={getFilteredTags()}
        activeTagName={activeTagName}
        onTagChange={handleTagChange}
        loading={tagsLoading}
      />
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
