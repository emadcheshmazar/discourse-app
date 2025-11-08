/**
 * Hook for filtering topics by tags or categories
 * پشتیبانی از چندین instance جداگانه در یک صفحه
 */

import { useEffect, useState, useRef, useCallback } from "react";
import type { DiscourseTopic } from "../../types/discourse";
import {
  getLatestTopics,
  getTopicsByTag,
  getTopicsByCategory,
} from "../endpoints/topics";
import type { TopicsParams } from "../endpoints/topics";

export interface UseFilteredTopicsOptions {
  tags?: string[];
  categories?: Array<{ slug: string; id: number }>;
  params?: TopicsParams;
  enabled?: boolean; // برای کنترل فعال/غیرفعال بودن fetch
}

export interface UseFilteredTopicsResult {
  topics: DiscourseTopic[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

/**
 * Hook for fetching filtered topics
 * جلوگیری از infinite loop با استفاده از useRef و dependency management
 */
export function useFilteredTopics(
  options: UseFilteredTopicsOptions = {}
): UseFilteredTopicsResult {
  const { tags, categories, params, enabled = true } = options;

  const [topics, setTopics] = useState<DiscourseTopic[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // استفاده از useRef برای جلوگیری از infinite loop
  const isMountedRef = useRef(true);
  const abortControllerRef = useRef<AbortController | null>(null);

  // استفاده از useRef برای ذخیره آخرین مقادیر برای مقایسه
  const prevTagsRef = useRef<string>("");
  const prevCategoriesRef = useRef<string>("");
  const prevParamsRef = useRef<string>("");
  const prevEnabledRef = useRef<boolean>(true);

  // useEffect با dependency های صحیح برای جلوگیری از infinite loop
  // استفاده از JSON.stringify برای مقایسه عمیق dependency ها
  const tagsKey = tags ? JSON.stringify([...tags].sort()) : "";
  const categoriesKey = categories
    ? JSON.stringify(categories.map((c) => `${c.slug}-${c.id}`).sort())
    : "";
  const paramsKey = params ? JSON.stringify(params) : "";

  useEffect(() => {
    // بررسی تغییرات واقعی برای جلوگیری از infinite loop
    const tagsChanged = tagsKey !== prevTagsRef.current;
    const categoriesChanged = categoriesKey !== prevCategoriesRef.current;
    const paramsChanged = paramsKey !== prevParamsRef.current;
    const enabledChanged = enabled !== prevEnabledRef.current;

    if (
      !(tagsChanged || categoriesChanged || paramsChanged || enabledChanged)
    ) {
      return;
    }

    // Update previous values
    prevTagsRef.current = tagsKey;
    prevCategoriesRef.current = categoriesKey;
    prevParamsRef.current = paramsKey;
    prevEnabledRef.current = enabled;

    if (!enabled) {
      return;
    }

    // تابع fetch - تعریف شده در useEffect برای جلوگیری از dependency issues
    const fetchTopics = async () => {
      // Cancel previous request if exists
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      // Create new abort controller
      const abortController = new AbortController();
      abortControllerRef.current = abortController;

      isMountedRef.current = true;
      setLoading(true);
      setError(null);

      try {
        let topicsArray: DiscourseTopic[] = [];

        // اگر تگ‌ها مشخص شده باشند
        if (tags && tags.length > 0) {
          // برای هر تگ یک request بزن و نتایج را combine کن
          const promises = tags.map(async (tag) => {
            const response = await getTopicsByTag(tag, params);

            // Check if request was aborted
            if (abortController.signal.aborted || !isMountedRef.current) {
              return [];
            }

            if (response.error) {
              console.warn(`⚠️ خطا در بارگذاری تگ ${tag}:`, response.error);
              return [];
            }

            return response.data?.topic_list?.topics || [];
          });

          const results = await Promise.all(promises);

          // Check if request was aborted
          if (abortController.signal.aborted || !isMountedRef.current) {
            return;
          }

          // Combine all topics and remove duplicates
          const allTopics = results.flat();
          const uniqueTopicsMap = new Map<number, DiscourseTopic>();
          allTopics.forEach((topic) => {
            if (!uniqueTopicsMap.has(topic.id)) {
              uniqueTopicsMap.set(topic.id, topic);
            }
          });
          topicsArray = Array.from(uniqueTopicsMap.values());
        }
        // اگر کتگوری‌ها مشخص شده باشند
        else if (categories && categories.length > 0) {
          // برای هر کتگوری یک request بزن و نتایج را combine کن
          const promises = categories.map(async (category) => {
            const response = await getTopicsByCategory(
              category.slug,
              category.id,
              params
            );

            // Check if request was aborted
            if (abortController.signal.aborted || !isMountedRef.current) {
              return [];
            }

            if (response.error) {
              console.warn(
                `⚠️ خطا در بارگذاری کتگوری ${category.slug}:`,
                response.error
              );
              return [];
            }

            return response.data?.topic_list?.topics || [];
          });

          const results = await Promise.all(promises);

          // Check if request was aborted
          if (abortController.signal.aborted || !isMountedRef.current) {
            return;
          }

          // Combine all topics and remove duplicates
          const allTopics = results.flat();
          const uniqueTopicsMap = new Map<number, DiscourseTopic>();
          allTopics.forEach((topic) => {
            if (!uniqueTopicsMap.has(topic.id)) {
              uniqueTopicsMap.set(topic.id, topic);
            }
          });
          topicsArray = Array.from(uniqueTopicsMap.values());
        }
        // اگر هیچ فیلتری مشخص نشده، latest topics را بگیر
        else {
          const response = await getLatestTopics(params);

          // Check if request was aborted
          if (abortController.signal.aborted || !isMountedRef.current) {
            return;
          }

          if (response.error) {
            throw new Error(response.error);
          }

          topicsArray = response.data?.topic_list?.topics || [];
        }

        // فقط اگر component هنوز mount است، state را update کن
        if (isMountedRef.current && !abortController.signal.aborted) {
          setTopics(topicsArray);
          setError(null);
        }
      } catch (err) {
        if (isMountedRef.current && !abortController.signal.aborted) {
          const errorMessage =
            err instanceof Error
              ? err.message
              : "خطای ناشناخته در بارگذاری پست‌ها";
          setError(errorMessage);
          console.error("❌ Error loading topics:", errorMessage);
        }
      } finally {
        if (isMountedRef.current && !abortController.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchTopics();

    // Cleanup function
    return () => {
      isMountedRef.current = false;
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [tagsKey, categoriesKey, paramsKey, enabled, tags, categories, params]);

  // Refetch function
  const refetch = useCallback(async () => {
    // Force refetch by updating a trigger
    prevTagsRef.current = "";
    prevCategoriesRef.current = "";
    prevParamsRef.current = "";
    prevEnabledRef.current = !enabled;
  }, [enabled]);

  return {
    topics,
    loading,
    error,
    refetch,
  };
}
