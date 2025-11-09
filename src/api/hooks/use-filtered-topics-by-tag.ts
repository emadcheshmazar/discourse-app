/**
 * Hook برای فیلتر کردن topics بر اساس تگ
 * ساده و تمیز - فقط برای تگ
 */

import { useEffect, useState } from "react";
import type { DiscourseTopic } from "../../types/discourse";
import { getTopicsByTag } from "../endpoints/topics";
import type { TopicsParams } from "../endpoints/topics";

export interface UseFilteredTopicsByTagOptions {
  tags?: string[];
  params?: TopicsParams;
  enabled?: boolean;
}

export interface UseFilteredTopicsByTagResult {
  topics: DiscourseTopic[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

/**
 * Hook برای فیلتر کردن topics بر اساس تگ‌ها
 */
export function useFilteredTopicsByTag(
  options: UseFilteredTopicsByTagOptions = {}
): UseFilteredTopicsByTagResult {
  const { tags = [], params, enabled = true } = options;

  const [topics, setTopics] = useState<DiscourseTopic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled || tags.length === 0) {
      setLoading(false);
      return;
    }

    let cancelled = false;

    const fetchTopics = async () => {
      setLoading(true);
      setError(null);

      try {
        // برای هر تگ یک request بزن
        const promises = tags.map((tag) => getTopicsByTag(tag, params));
        const results = await Promise.all(promises);

        if (cancelled) return;

        // بررسی خطا
        const hasError = results.some((r) => r.error);
        if (hasError) {
          const errorResult = results.find((r) => r.error);
          throw new Error(errorResult?.error || "خطا در بارگذاری پست‌ها");
        }

        // ترکیب کردن نتایج و حذف duplicate ها
        const allTopics = results.flatMap(
          (r) => r.data?.topic_list?.topics || []
        );
        const uniqueTopicsMap = new Map<number, DiscourseTopic>();
        allTopics.forEach((topic) => {
          if (!uniqueTopicsMap.has(topic.id)) {
            uniqueTopicsMap.set(topic.id, topic);
          }
        });

        setTopics(Array.from(uniqueTopicsMap.values()));
        setError(null);
      } catch (err) {
        if (cancelled) return;
        const errorMessage =
          err instanceof Error
            ? err.message
            : "خطای ناشناخته در بارگذاری پست‌ها";
        setError(errorMessage);
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchTopics();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tags.join(","), JSON.stringify(params), enabled]);

  const refetch = () => {
    // Force re-fetch by updating a dummy state
    setLoading(true);
  };

  return {
    topics,
    loading,
    error,
    refetch,
  };
}
