import { useNavigate } from "react-router-dom";
import { TopicList } from "../ui/TopicList";
import type { DiscourseTopic } from "../../types/discourse";
import { useFilteredTopicsByTag } from "../../api/hooks/use-filtered-topics-by-tag";

interface EmergingSLATopicsSectionProps {
  className?: string;
}

export function EmergingSLATopicsSection({
  className = "",
}: EmergingSLATopicsSectionProps) {
  const navigate = useNavigate();

  // دریافت پست‌های تگ emerging-sla
  const { topics, loading, error, refetch } = useFilteredTopicsByTag({
    tags: ["emerging-sla"],
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
        topics={topics}
        limit={3}
        loading={loading}
        error={error}
        onTopicClick={handleTopicClick}
        onRetry={handleRetry}
        emptyMessage="هیچ پستی یافت نشد."
        styleMode={1}
      />
    </div>
  );
}
