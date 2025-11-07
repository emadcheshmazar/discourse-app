import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TopicList } from "../ui/TopicList";
import type { DiscourseTopic } from "../../types/discourse";

interface BusinessAssociatesSectionProps {
  className?: string;
}

export function BusinessAssociatesSection({
  className = "",
}: BusinessAssociatesSectionProps) {
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

      // بارگذاری پست‌ها با تگ BusinessAssociates
      const encodedTagName = encodeURIComponent("businessassociates");
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
      console.error(
        "❌ خطا در بارگذاری پست‌های BusinessAssociates:",
        errorMessage
      );
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
    <section
      className={`grid w-full grid-cols-1 gap-3 sm:gap-3.5 md:gap-4 lg:gap-5 ${className}`}
      data-block-id="38NgpLHKTdfR3YwyCRAHI"
      data-block-name="section"
    >
      <div
        className="col-span-1 flex flex-col"
        data-block-id="633D8h4yuzk3LjD2lTFUo"
        data-block-name="column"
      >
        {/* Header */}
        <div
          className="@container block-space-header"
          data-block-id="fyXpsITueH0imkB-gld_A"
          data-block-name="space-header"
        >
          <div
            className="relative overflow-hidden screen-rounded-none screen-border-x-0 shadow-card border-base border-card rounded-base"
            style={{ backgroundColor: "rgb(255, 255, 255)" }}
          >
            <div className="w-full flex justify-between items-center relative inset-0 z-10 gap-3 flex-wrap text-content-on-background px-6 @3xl:px-10 @5xl:px-16 py-[1.5rem] @3xl:py-[2rem] @5xl:py-[2rem] text-black">
              <div className="flex items-center relative inset-0 z-10 gap-4 flex-wrap flex-1 max-w-full text-black text-center items-center justify-center">
                <div className="basis-full text-center items-center justify-center text-md opacity-95">
                  <article className="prose" style={{ color: "inherit" }}>
                    <h3 id="3911357e-ca67-4e55-b616-16bcf6377fd4">
                      همکاران تجاری ما
                    </h3>
                    <p>ما در تداوم همکاری می‌کنیم</p>
                  </article>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Posts Section */}
        <div
          className="block-posts"
          data-block-id="fqTC4ZjeYdpLf1sQurY0v"
          data-block-name="posts"
        >
          <div className="">
            <div className="hidden absolute inset-0 cursor-default z-50"></div>
            <div className="space-y-3 sm:space-y-3.5 md:space-y-4 lg:space-y-5">
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
                    styleMode={3}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
