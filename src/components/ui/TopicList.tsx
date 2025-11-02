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
  limit?: number;
  offset?: number;
}

export function TopicList({
  topics,
  loading,
  error,
  onTopicClick,
  onRetry,
  emptyMessage = "هیچ تاپیکی یافت نشد.",
  limit,
  offset,
}: TopicListProps) {
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

  const displayTopics =
    limit && offset !== undefined
      ? topics.slice(offset, offset + limit)
      : topics;

  return (
    <ul className="grid w-full p-0 mt-1 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
      {displayTopics.map((topic) => (
        <TopicCard key={topic.id} topic={topic} onClick={onTopicClick} />
      ))}
    </ul>
  );
}
