import { useNavigate } from "react-router-dom";
import { TopicList } from "../ui/TopicList";
import type { DiscourseTopic } from "../../types/discourse";
import { useFilteredTopicsByCategory } from "../../api/hooks/use-filtered-topics-by-category";
import { DateBannerSection } from "./DateBannerSection";

export function ServicesCardsSection() {
  const navigate = useNavigate();

  // دریافت پست‌های کتگوری technocratic-services (ID: 9) با تگ services
  const { topics, loading, error, refetch } = useFilteredTopicsByCategory({
    categoryIds: [9],
    categories: [{ slug: "technocratic-services", id: 9 }],
    tags: ["services"],
  });

  const handleTopicClick = (topic: DiscourseTopic) => {
    navigate(`/topic/${topic.id}`);
  };

  const handleRetry = () => {
    refetch();
  };

  return (
    <div className="space-y-3 sm:space-y-3.5 md:space-y-4 lg:space-y-5 mt-1">
      <div className="relative">
        <div
          className="overflow-hidden"
          style={{
            marginInline: "-12px -1px",
            paddingInline: "12px 1px",
          }}
        >
          <TopicList
            topics={topics}
            loading={loading}
            error={error}
            onTopicClick={handleTopicClick}
            onRetry={handleRetry}
            emptyMessage="محتوایی برای نمایش وجود ندارد."
            styleMode={6}
            layoutMode="scroll"
          />
        </div>
        <DateBannerSection />
      </div>
    </div>
  );
}
