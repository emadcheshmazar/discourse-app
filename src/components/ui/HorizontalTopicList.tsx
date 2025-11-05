import { TopicCard } from "./TopicCard";
import { LoadingSpinner } from "./LoadingSpinner";
import { ErrorMessage } from "./ErrorMessage";
import type { DiscourseTopic } from "../../types/discourse";

interface HorizontalTopicListProps {
  topics: DiscourseTopic[];
  loading: boolean;
  error: string | null;
  onTopicClick?: (topic: DiscourseTopic) => void;
  onRetry?: () => void;
  emptyMessage?: string;
  styleMode?: number;
}

export function HorizontalTopicList({
  topics,
  loading,
  error,
  onTopicClick,
  onRetry,
  emptyMessage = "هیچ تاپیکی یافت نشد.",
  styleMode = 1,
}: HorizontalTopicListProps) {
  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={onRetry} className="mx-4" />;
  }

  if (topics.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="horizontal-topic-list-wrapper">
      <div className="horizontal-topic-list-container">
        {topics.map((topic) => (
          <TopicCard
            key={topic.id}
            topic={topic}
            onClick={onTopicClick}
            styleMode={styleMode}
          />
        ))}
      </div>
    </div>
  );
}
