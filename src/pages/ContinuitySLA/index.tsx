import { useNavigate } from "react-router-dom";
import { TrapezoidBackground } from "../../components/ui/TrapezoidBackground";
import { TopicList } from "../../components/ui/TopicList";
import type { DiscourseTopic } from "../../types/discourse";
import { useFilteredTopicsByCategory } from "../../api/hooks/use-filtered-topics-by-category";

const SLA_CATEGORY_ID = 10;
const SLA_CATEGORY_SLUG = "aliasys-sla";

export default function ContinuitySLA() {
  const navigate = useNavigate();

  const { topics, loading, error, refetch } = useFilteredTopicsByCategory({
    categoryIds: [SLA_CATEGORY_ID],
    categories: [{ id: SLA_CATEGORY_ID, slug: SLA_CATEGORY_SLUG }],
  });

  const handleTopicClick = (topic: DiscourseTopic) => {
    navigate(`/topic/${topic.id}`);
  };

  return (
    <div className="continuity-sla-container">
      <TrapezoidBackground className="min-h-[280px]">
        <div className="w-full flex flex-col items-start px-[4rem] pt-[5rem]">
          <h1 className="text-3xl font-bold text-[#fff]">SLA تداوم</h1>
          <p className="text-[#fff] text-lg">
            نمایش تمامی پست‌های کتگوری Aliasys SLA
          </p>
        </div>
      </TrapezoidBackground>

      <div className="w-full max-w-[1400px] mx-auto px-2 md:px-4 lg:px-6 py-6">
        <TopicList
          topics={topics}
          loading={loading}
          error={error}
          onTopicClick={handleTopicClick}
          onRetry={refetch}
          emptyMessage="هیچ پستی یافت نشد."
          styleMode={2}
          layoutMode="grid"
        />
      </div>
    </div>
  );
}
