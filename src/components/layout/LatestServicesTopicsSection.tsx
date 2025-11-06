import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TopicList } from "../ui/TopicList";
import type { DiscourseTopic } from "../../types/discourse";

interface LatestServicesTopicsSectionProps {
  className?: string;
}

export function LatestServicesTopicsSection({
  className = "",
}: LatestServicesTopicsSectionProps) {
  const navigate = useNavigate();
  const [newsTopics, setNewsTopics] = useState<DiscourseTopic[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadNewsTopics = async () => {
    try {
      setLoading(true);
      setError(null);

      const apiBase = import.meta.env.DEV
        ? "/api/discourse"
        : "https://aliasysdiscourse.ir";

      // بارگذاری تاپیک‌ها با تگ news
      const encodedTagName = encodeURIComponent("news");
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
      setNewsTopics(topicsArray);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      console.error("❌ خطا در بارگذاری تاپیک‌های news:", errorMessage);
      setError(`خطا در بارگذاری تاپیک‌ها: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNewsTopics();
  }, []);

  const handleTopicClick = (topic: DiscourseTopic) => {
    navigate(`/topic/${topic.id}`);
  };

  const handleRetry = () => {
    loadNewsTopics();
  };

  return (
    <div className={className}>
      <TopicList
        topics={newsTopics.slice(-3)}
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
