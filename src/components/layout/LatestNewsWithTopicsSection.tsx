import { useNavigate } from "react-router-dom";
import { NewsHeaderSection } from "./LatestNewsSection";
import { TopicList } from "../ui/TopicList";
import type { DiscourseTopic } from "../../types/discourse";
import { useFilteredTopicsByCategory } from "../../api/hooks/use-filtered-topics-by-category";

interface LatestNewsWithTopicsSectionProps {
  className?: string;
}

export function LatestNewsWithTopicsSection({
  className = "",
}: LatestNewsWithTopicsSectionProps) {
  const navigate = useNavigate();

  // دریافت پست‌های کتگوری aliasys-explore (ID: 14) با تگ news
  const {
    topics: newsTopics,
    loading,
    error,
    refetch,
  } = useFilteredTopicsByCategory({
    categoryIds: [14],
    categories: [{ slug: "aliasys-explore", id: 14 }],
    tags: ["news"],
  });

  const handleTopicClick = (topic: DiscourseTopic) => {
    navigate(`/topic/${topic.id}`);
  };

  const handleRetry = () => {
    refetch();
  };

  return (
    <div className={className}>
      <NewsHeaderSection />
      <TopicList
        topics={newsTopics.slice(-3)}
        limit={3}
        loading={loading}
        error={error}
        onTopicClick={handleTopicClick}
        onRetry={handleRetry}
        emptyMessage="محتوایی برای نمایش وجود ندارد."
        styleMode={1}
      />
    </div>
  );
}
