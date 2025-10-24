import { TopicCard } from "./TopicCard";
import { LoadingSpinner } from "./LoadingSpinner";
import { ErrorMessage } from "./ErrorMessage";
import type { DiscourseTopic } from "../../types/discourse";

interface TopicListProps {
  topics: DiscourseTopic[];
  loading: boolean;
  error: string | null;
  onTopicClick?: (topic: DiscourseTopic) => void;
  onRetry?: () => void;
  emptyMessage?: string;
}

export function TopicList({
  topics,
  loading,
  error,
  onTopicClick,
  onRetry,
  emptyMessage = "هیچ تاپیکی یافت نشد.",
}: TopicListProps) {
  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <ErrorMessage
        message={error}
        onRetry={onRetry}
        className="mx-4"
      />
    );
  }

  if (topics.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {topics.map((topic) => (
        <TopicCard
          key={topic.id}
          topic={topic}
          onClick={onTopicClick}
        />
      ))}
    </div>
  );
}
