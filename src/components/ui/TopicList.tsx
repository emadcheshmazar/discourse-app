import { TopicCard } from "./TopicCard";
import { TopicCardSkeleton } from "./TopicCardSkeleton";
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
  styleMode?: number; // استایل مود: 1, 2, 3, ...
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
  styleMode = 1, // پیش‌فرض: استایل مود 1
}: TopicListProps) {
  if (loading) {
    const displayCount = limit || 6;

    // برای styleMode 3، 4 و 5، اسکلت افقی با اسکرول
    if (styleMode === 3 || styleMode === 4 || styleMode === 5) {
      return (
        <div className="horizontal-topic-list-wrapper">
          <div
            className="horizontal-topic-list-container"
            style={{ gap: "4px" }}
          >
            <TopicCardSkeleton styleMode={styleMode} count={displayCount} />
          </div>
        </div>
      );
    }

    // کلاس‌های grid بر اساس styleMode
    const gridClasses =
      styleMode === 2
        ? "topic-list-style-2"
        : "grid w-full p-0 mt-1 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1";

    return (
      <div className={gridClasses}>
        <TopicCardSkeleton styleMode={styleMode} count={displayCount} />
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

  // برای styleMode 3، 4 و 5، نمایش افقی با اسکرول
  if (styleMode === 3 || styleMode === 4 || styleMode === 5) {
    return (
      <div className="horizontal-topic-list-wrapper">
        <div className="horizontal-topic-list-container" style={{ gap: "4px" }}>
          {displayTopics.map((topic) => (
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

  // کلاس‌های grid بر اساس styleMode
  const gridClasses =
    styleMode === 2
      ? "topic-list-style-2"
      : "grid w-full p-0 mt-1 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1";

  return (
    <div className={gridClasses}>
      {displayTopics.map((topic) => (
        <TopicCard
          key={topic.id}
          topic={topic}
          onClick={onTopicClick}
          styleMode={styleMode}
        />
      ))}
    </div>
  );
}
