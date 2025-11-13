import { useNavigate } from "react-router-dom";
import { NewsHeaderSection } from "./LatestNewsSection";
import { TopicList } from "../ui/TopicList";
import type { DiscourseTopic } from "../../types/discourse";
import { useFilteredTopicsBySubCategory } from "../../api/hooks/use-filtered-topics-by-subcategory";

interface LatestExploreNewsSubCategorySectionProps {
  className?: string;
  limit?: number;
  subCategoryId?: number;
}

const DEFAULT_SUBCATEGORY_ID = 38; // News sub-category under Aliasys Explore
const DEFAULT_LIMIT = 3;

export function LatestExploreNewsSubCategorySection({
  className = "",
  limit = DEFAULT_LIMIT,
  subCategoryId = DEFAULT_SUBCATEGORY_ID,
}: LatestExploreNewsSubCategorySectionProps) {
  const navigate = useNavigate();

  const { topics, loading, error, refetch } = useFilteredTopicsBySubCategory({
    subCategoryIds: [subCategoryId],
  });

  const handleTopicClick = (topic: DiscourseTopic) => {
    navigate(`/topic/${topic.id}`);
  };

  const handleRetry = () => {
    refetch();
  };

  const displayedTopics =
    limit && limit > 0 ? topics.slice(-limit) : topics.slice(-DEFAULT_LIMIT);

  return (
    <div className={className}>
      <NewsHeaderSection />
      <TopicList
        topics={displayedTopics}
        limit={limit}
        loading={loading}
        error={error}
        onTopicClick={handleTopicClick}
        onRetry={handleRetry}
        emptyMessage="محتوایی برای نمایش وجود ندارد."
        styleMode={1}
      />
    </div>
  );
}
