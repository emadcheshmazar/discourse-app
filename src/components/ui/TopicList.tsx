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
  layoutMode?: "scroll" | "grid"; // حالت نمایش: scroll (پیش‌فرض) یا grid
}

export function TopicList({
  topics,
  loading,
  error,
  onTopicClick,
  onRetry,
  emptyMessage = "هیچ پستی یافت نشد.",
  limit,
  offset,
  styleMode = 1, // پیش‌فرض: استایل مود 1
  layoutMode = "scroll", // پیش‌فرض: اسکرول افقی
}: TopicListProps) {
  if (loading) {
    const displayCount = limit || 6;

    // اگر layoutMode برابر scroll باشد، اسکلت افقی با اسکرول
    if (layoutMode === "scroll") {
      return (
        <div className="horizontal-topic-list-wrapper">
          <div className="horizontal-topic-list-container">
            <TopicCardSkeleton styleMode={styleMode} count={displayCount} />
          </div>
        </div>
      );
    }

    // اگر layoutMode برابر grid باشد، از گرید ریسپانسیو استفاده می‌شود
    return (
      <div className="topic-list-grid">
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

  // اگر layoutMode برابر scroll باشد، نمایش افقی با اسکرول
  if (layoutMode === "scroll") {
    return (
      <div className="horizontal-topic-list-wrapper">
        <div className="horizontal-topic-list-container">
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

  // اگر layoutMode برابر grid باشد، از گرید ریسپانسیو استفاده می‌شود
  return (
    <div className="topic-list-grid">
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
