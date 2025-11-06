import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TagTabs } from "../components/layout/TagTabs";
import { TopicList } from "../components/ui/TopicList";
import type { DiscourseTopic, DiscourseTag } from "../types/discourse";
import { AliasysExploreBannerSection } from "../components/layout/AliasysExploreBannerSection";

// Whitelist برای تگ‌های مجاز
const tagWhitelist: string[] = [
  "راه-حل-های-دیتاسنتر",
  "محصولات",
  "خدمات",
  "sla",
];

export default function AliasysExplore() {
  const navigate = useNavigate();
  const [topics, setTopics] = useState<DiscourseTopic[]>([]);
  const [tags, setTags] = useState<DiscourseTag[]>([]);
  const [activeTagName, setActiveTagName] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [tagsLoading, setTagsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [memberCount, setMemberCount] = useState<number>(0);
  const [postCount, setPostCount] = useState<number>(0);

  const loadTags = async () => {
    try {
      setTagsLoading(true);

      const apiBase = import.meta.env.DEV
        ? "/api/discourse"
        : "https://aliasysdiscourse.ir";

      const response = await fetch(`${apiBase}/tags.json`, {
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
      const tagsArray = data.tags || [];
      setTags(tagsArray);
    } catch (err) {
      console.error("❌ خطا در بارگذاری تگ‌ها:", err);
    } finally {
      setTagsLoading(false);
    }
  };

  const loadTopics = async (tagName: string | null = null) => {
    try {
      setLoading(true);
      setError(null);

      const apiBase = import.meta.env.DEV
        ? "/api/discourse"
        : "https://aliasysdiscourse.ir";

      let topicsArray: DiscourseTopic[] = [];

      if (tagName) {
        // اگر تگ خاصی انتخاب شده، فقط آن تگ را fetch کن
        const encodedTagName = encodeURIComponent(tagName);
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
        topicsArray = data?.topic_list?.topics || [];
      } else {
        // اگر تگی انتخاب نشده، همه تگ‌های whitelist را fetch کن
        if (tagWhitelist && tagWhitelist.length > 0) {
          // برای هر تگ در whitelist یک request بزن
          const promises = tagWhitelist.map(async (tag) => {
            const encodedTagName = encodeURIComponent(tag);
            const url = `${apiBase}/tag/${encodedTagName}.json`;
            try {
              const response = await fetch(url, {
                method: "GET",
                mode: import.meta.env.DEV ? "same-origin" : "cors",
                credentials: "include",
                headers: {
                  accept: "application/json, text/javascript, */*; q=0.01",
                },
              });

              if (!response.ok) {
                console.warn(`⚠️ خطا در بارگذاری تگ ${tag}`);
                return [];
              }

              const data = await response.json();
              return data?.topic_list?.topics || [];
            } catch (err) {
              console.warn(`⚠️ خطا در بارگذاری تگ ${tag}:`, err);
              return [];
            }
          });

          const results = await Promise.all(promises);

          // همه پست‌ها را combine کن و duplicate ها را حذف کن (بر اساس id)
          const allTopics = results.flat();
          const uniqueTopicsMap = new Map<number, DiscourseTopic>();
          allTopics.forEach((topic) => {
            if (!uniqueTopicsMap.has(topic.id)) {
              uniqueTopicsMap.set(topic.id, topic);
            }
          });
          topicsArray = Array.from(uniqueTopicsMap.values());
        }
      }

      setTopics(topicsArray);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      console.error("❌ خطا در بارگذاری پست‌ها:", errorMessage);
      setError(`خطا در بارگذاری پست‌ها: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  const handleTagChange = (tagName: string | null) => {
    setActiveTagName(tagName);
    loadTopics(tagName);
  };

  const handleTopicClick = (topic: DiscourseTopic) => {
    navigate(`/topic/${topic.id}`);
  };

  const handleRetry = () => {
    loadTopics(activeTagName);
  };

  const loadSiteStats = async () => {
    try {
      const apiBase = import.meta.env.DEV
        ? "/api/discourse"
        : "https://aliasysdiscourse.ir";

      const response = await fetch(`${apiBase}/site.json`, {
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
      // Discourse site.json typically has stats in different places
      // Try common locations: about.stats, stats, or direct properties
      const stats = data.about?.stats || data.stats || {};
      setMemberCount(
        stats.users || data.users || data.about?.users || data.user_count || 0
      );
      setPostCount(
        stats.posts || data.posts || data.about?.posts || data.post_count || 0
      );
    } catch (err) {
      console.error("❌ خطا در بارگذاری آمار سایت:", err);
      // Keep default values (0) on error
    }
  };

  const getFilteredTags = (): DiscourseTag[] => {
    if (!tagWhitelist || tagWhitelist.length === 0) {
      return tags;
    }
    return tags.filter((tag) => tagWhitelist.includes(tag.name));
  };

  useEffect(() => {
    loadTags();
    loadSiteStats();
  }, []);

  useEffect(() => {
    if (tags.length > 0) {
      loadTopics(activeTagName);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tags]);

  return (
    <div className="w-full max-w-[1400px] mx-auto px-2 md:px-4 lg:px-6 py-6">
      <AliasysExploreBannerSection
        memberCount={memberCount}
        postCount={postCount}
      />
      <TagTabs
        tags={getFilteredTags()}
        activeTagName={activeTagName}
        onTagChange={handleTagChange}
        loading={tagsLoading}
      />
      <TopicList
        topics={topics}
        loading={loading}
        error={error}
        onTopicClick={handleTopicClick}
        onRetry={handleRetry}
        emptyMessage="هیچ پستی یافت نشد."
        styleMode={1}
      />
    </div>
  );
}
