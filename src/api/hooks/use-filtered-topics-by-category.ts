/**
 * Hook برای فیلتر کردن topics بر اساس کتگوری
 * ساده و تمیز - فقط برای کتگوری
 */

import { useEffect, useState } from "react";
import type { DiscourseTopic } from "../../types/discourse";
import { getTopicsByCategory, getLatestTopics } from "../endpoints/topics";
import type { TopicsParams } from "../endpoints/topics";

export interface UseFilteredTopicsByCategoryOptions {
  categoryIds?: number[];
  categories?: Array<{ slug?: string; id: number }>;
  tags?: string[]; // برای فیلتر کردن بر اساس تگ در کتگوری
  params?: TopicsParams;
  enabled?: boolean;
}

export interface UseFilteredTopicsByCategoryResult {
  topics: DiscourseTopic[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

/**
 * Hook برای فیلتر کردن topics بر اساس کتگوری
 * اگر categoryIds یا categories مشخص نشود، همه topics را برمی‌گرداند
 */
export function useFilteredTopicsByCategory(
  options: UseFilteredTopicsByCategoryOptions = {}
): UseFilteredTopicsByCategoryResult {
  const { categoryIds, categories, tags, params, enabled = true } = options;

  const [topics, setTopics] = useState<DiscourseTopic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) {
      setLoading(false);
      return;
    }

    let cancelled = false;

    const fetchTopics = async () => {
      setLoading(true);
      setError(null);

      try {
        let topicsArray: DiscourseTopic[] = [];

        // اگر کتگوری مشخص شده باشد
        if (categoryIds && categoryIds.length > 0) {
          // ترکیب tags با params
          const finalParams = tags ? { ...params, tags } : params;

          // برای هر categoryId یک request بزن
          const promises = categoryIds.map(async (categoryId) => {
            // اگر categories موجود است، سعی کن slug را پیدا کن
            if (categories && categories.length > 0) {
              const category = categories.find((c) => c.id === categoryId);
              if (category && category.slug) {
                return getTopicsByCategory(
                  category.slug,
                  categoryId,
                  finalParams
                );
              }
            }
            // در غیر این صورت فقط با ID
            return getTopicsByCategory(categoryId, finalParams);
          });

          const results = await Promise.all(promises);

          if (cancelled) return;

          // بررسی خطا
          const hasError = results.some((r) => r.error);
          if (hasError) {
            const errorResult = results.find((r) => r.error);
            throw new Error(errorResult?.error || "خطا در بارگذاری پست‌ها");
          }

          // ترکیب کردن نتایج
          topicsArray = results.flatMap(
            (r) => r.data?.topic_list?.topics || []
          );
        }
        // اگر categories با slug مشخص شده باشد
        else if (categories && categories.length > 0) {
          // ترکیب tags با params
          const finalParams = tags ? { ...params, tags } : params;

          const promises = categories.map((category) => {
            if (category.slug) {
              return getTopicsByCategory(
                category.slug,
                category.id,
                finalParams
              );
            }
            return getTopicsByCategory(category.id, finalParams);
          });

          const results = await Promise.all(promises);

          if (cancelled) return;

          // بررسی خطا
          const hasError = results.some((r) => r.error);
          if (hasError) {
            const errorResult = results.find((r) => r.error);
            throw new Error(errorResult?.error || "خطا در بارگذاری پست‌ها");
          }

          // ترکیب کردن نتایج
          topicsArray = results.flatMap(
            (r) => r.data?.topic_list?.topics || []
          );
        }
        // اگر هیچ کتگوری مشخص نشده، همه topics را بگیر
        else {
          const response = await getLatestTopics(params);

          if (cancelled) return;

          if (response.error) {
            throw new Error(response.error);
          }

          topicsArray = response.data?.topic_list?.topics || [];
        }

        // حذف duplicate ها
        const uniqueTopicsMap = new Map<number, DiscourseTopic>();
        topicsArray.forEach((topic) => {
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
  }, [
    categoryIds?.join(","),
    categories?.map((c) => `${c.slug || ""}-${c.id}`).join(","),
    tags?.join(","),
    JSON.stringify(params),
    enabled,
  ]);

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
