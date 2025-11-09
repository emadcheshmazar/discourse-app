import { useNavigate } from "react-router-dom";
import { TopicList } from "../ui/TopicList";
import type { DiscourseTopic } from "../../types/discourse";
import { useFilteredTopicsByCategory } from "../../api/hooks/use-filtered-topics-by-category";

interface LatestServicesTopicsSectionProps {
  className?: string;
}

export function LatestServicesTopicsSection({
  className = "",
}: LatestServicesTopicsSectionProps) {
  const navigate = useNavigate();

  // دریافت پست‌های کتگوری datacenter-products (ID: 11) با تگ news
  const {
    topics: newsTopics,
    loading,
    error,
    refetch,
  } = useFilteredTopicsByCategory({
    categoryIds: [11],
    categories: [{ slug: "datacenter-products", id: 11 }],
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
      <TopicList
        topics={newsTopics.slice(-3)}
        limit={3}
        loading={loading}
        error={error}
        onTopicClick={handleTopicClick}
        onRetry={handleRetry}
        emptyMessage="هیچ پستی در این کتگوری یافت نشد."
        styleMode={1}
      />
    </div>
  );
}
