import { useNavigate } from "react-router-dom";
import { SectionHeader } from "./SectionHeader";
import { TopicList } from "../ui/TopicList";
import type { DiscourseTopic } from "../../types/discourse";
import { DateBannerSection } from "./DateBannerSection";
import { useFilteredTopicsByTag } from "../../api/hooks/use-filtered-topics-by-tag";

interface IndustrySLATopicsSectionProps {
  className?: string;
}

export function IndustrySLATopicsSection({
  className = "",
}: IndustrySLATopicsSectionProps) {
  const navigate = useNavigate();

  // دریافت پست‌های تگ industry-slas
  const { topics, loading, error, refetch } = useFilteredTopicsByTag({
    tags: ["industry-slas"],
  });

  const handleTopicClick = (topic: DiscourseTopic) => {
    navigate(`/topic/${topic.id}`);
  };

  const handleRetry = () => {
    refetch();
  };

  return (
    <div className={className}>
      <SectionHeader
        title="برترین SLA های صنعتی ما"
        subtitle="از برترین مدیران تکنوکرات ما"
        blockId="top-industry-slas-section"
        extraPadding={true}
      />

      <TopicList
        topics={topics}
        loading={loading}
        error={error}
        onTopicClick={handleTopicClick}
        onRetry={handleRetry}
        emptyMessage="هیچ پستی یافت نشد."
        styleMode={5}
      />
      <DateBannerSection />
    </div>
  );
}
