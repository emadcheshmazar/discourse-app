import { Card } from "./Card";
import type { DiscourseTopic } from "../../types/discourse";

interface TopicCardProps {
  topic: DiscourseTopic;
  onClick?: (topic: DiscourseTopic) => void;
}

export function TopicCard({ topic, onClick }: TopicCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fa-IR", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <Card onClick={() => onClick?.(topic)}>
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
          {topic.title}
        </h3>
        
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <span className="flex items-center">
            📝 {topic.posts_count} پست
          </span>
          <span className="flex items-center">
            👁️ {topic.views} بازدید
          </span>
          {topic.like_count > 0 && (
            <span className="flex items-center">
              ❤️ {topic.like_count} لایک
            </span>
          )}
        </div>

        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>آخرین فعالیت: {formatDate(topic.last_posted_at)}</span>
          {topic.pinned && (
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
              📌 سنجاق شده
            </span>
          )}
        </div>

        {topic.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {topic.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs"
              >
                #{tag}
              </span>
            ))}
            {topic.tags.length > 3 && (
              <span className="text-gray-500 text-xs">
                +{topic.tags.length - 3} تگ دیگر
              </span>
            )}
          </div>
        )}
      </div>
    </Card>
  );
}
