import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SectionHeader } from "./SectionHeader";
import { TopicList } from "../ui/TopicList";
import type { DiscourseTopic } from "../../types/discourse";
import { DateBannerSection } from "./DateBannerSection";

interface IndustrySLATopicsSectionProps {
  className?: string;
}

export function IndustrySLATopicsSection({
  className = "",
}: IndustrySLATopicsSectionProps) {
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

      // بارگذاری پست‌ها با تگ industry-slas
      const encodedTagName = encodeURIComponent("industry-slas");
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
      console.error("❌ خطا در بارگذاری پست‌های industry-slas:", errorMessage);
      setError(`خطا در بارگذاری پست‌ها: ${errorMessage}`);
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
      <SectionHeader
        title="برترین SLA های صنعتی ما"
        subtitle="از برترین مدیران تکنوکرات ما"
        blockId="top-industry-slas-section"
        extraPadding={true}
      />
      <div className="mt-[-20px]">
        <TopicList
          topics={topics}
          loading={loading}
          error={error}
          onTopicClick={handleTopicClick}
          onRetry={handleRetry}
          emptyMessage="هیچ پستی در این کتگوری یافت نشد."
          styleMode={5}
        />
      </div>
      <div className="mt-[-20px]">
        <DateBannerSection />
      </div>
    </div>
  );
}
