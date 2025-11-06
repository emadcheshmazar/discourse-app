import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TopicList } from "../ui/TopicList";
import type { DiscourseTopic } from "../../types/discourse";

interface EmergingSLATopicsSectionProps {
  className?: string;
}

export function EmergingSLATopicsSection({
  className = "",
}: EmergingSLATopicsSectionProps) {
  const navigate = useNavigate();
  const [topics, setTopics] = useState<DiscourseTopic[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadTopics = async () => {
    try {
      setLoading(true);
      setError(null);

      const apiBase = import.meta.env.DEV
        ? "/api/discourse"
        : "https://aliasysdiscourse.ir";

      // بارگذاری تاپیک‌ها با تگ emerging-sla
      const encodedTagName = encodeURIComponent("emerging-sla");
      const url = `${apiBase}/tag/${encodedTagName}.json`;

      const response = await fetch(url, {
        method: "GET",
        mode: import.meta.env.DEV ? "same-origin" : "cors",
        credentials: "include",
        headers: {
          accept: "application/json, text/javascript, */*; q=0.01",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const topicsArray = data?.topic_list?.topics || [];
      setTopics(topicsArray);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      console.error("❌ خطا در بارگذاری تاپیک‌های emerging-sla:", errorMessage);
      setError(`خطا در بارگذاری تاپیک‌ها: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTopics();
  }, []);

  const handleTopicClick = (topic: DiscourseTopic) => {
    navigate(`/topic/${topic.id}`);
  };

  const handleRetry = () => {
    loadTopics();
  };

  return (
    <div className={className}>
      <TopicList
        topics={topics}
        limit={3}
        loading={loading}
        error={error}
        onTopicClick={handleTopicClick}
        onRetry={handleRetry}
        emptyMessage="هیچ تاپیکی در این کتگوری یافت نشد."
        styleMode={1}
      />
    </div>
  );
}
