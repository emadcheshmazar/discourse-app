/**
 * Hook برای فیلتر کردن topics بر اساس sub-category
 * این hook می‌تواند از sub-category ID یا parent category + sub-category slug استفاده کند
 */

import { useEffect, useState } from "react";
import type { DiscourseTopic, DiscourseCategory } from "../../types/discourse";
import {
  getTopicsByCategory,
  getTopicsBySubCategory,
  getLatestTopics,
} from "../endpoints/topics";
import type { TopicsParams } from "../endpoints/topics";

export interface UseFilteredTopicsBySubCategoryOptions {
  // روش 1: استفاده از sub-category ID (ساده‌تر)
  subCategoryIds?: number[];
  // روش 2: استفاده از parent category و sub-category slug
  parentCategorySlug?: string;
  subCategorySlug?: string;
  // روش 3: استفاده از parent category و لیست sub-category ها
  parentCategoryId?: number;
  parentCategory?: DiscourseCategory; // برای دسترسی به subcategory_ids
  // سایر options
  tags?: string[]; // برای فیلتر کردن بر اساس تگ در sub-category
  params?: TopicsParams;
  enabled?: boolean;
}

export interface UseFilteredTopicsBySubCategoryResult {
  topics: DiscourseTopic[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

/**
 * Hook برای فیلتر کردن topics بر اساس sub-category
 *
 * استفاده:
 * 1. با sub-category ID: { subCategoryIds: [1, 2, 3] }
 * 2. با parent و sub-category slug: { parentCategorySlug: "parent", subCategorySlug: "sub" }
 * 3. با parent category: { parentCategoryId: 1 } - همه sub-category های parent را می‌گیرد
 */
export function useFilteredTopicsBySubCategory(
  options: UseFilteredTopicsBySubCategoryOptions = {}
): UseFilteredTopicsBySubCategoryResult {
  const {
    subCategoryIds,
    parentCategorySlug,
    subCategorySlug,
    parentCategoryId,
    parentCategory,
    tags,
    params,
    enabled = true,
  } = options;

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
        const finalParams = tags ? { ...params, tags } : params;

        // روش 1: استفاده از sub-category ID ها (ساده‌ترین روش)
        if (subCategoryIds && subCategoryIds.length > 0) {
          const promises = subCategoryIds.map((subCategoryId) =>
            getTopicsByCategory(subCategoryId, finalParams)
          );

          const results = await Promise.all(promises);

          if (cancelled) return;

          const hasError = results.some((r) => r.error);
          if (hasError) {
            const errorResult = results.find((r) => r.error);
            throw new Error(errorResult?.error || "خطا در بارگذاری پست‌ها");
          }

          topicsArray = results.flatMap(
            (r) => r.data?.topic_list?.topics || []
          );
        }
        // روش 2: استفاده از parent category slug و sub-category slug
        else if (parentCategorySlug && subCategorySlug) {
          const response = await getTopicsBySubCategory(
            parentCategorySlug,
            subCategorySlug,
            finalParams
          );

          if (cancelled) return;

          if (response.error) {
            throw new Error(response.error);
          }

          topicsArray = response.data?.topic_list?.topics || [];
        }
        // روش 3: استفاده از parent category - همه sub-category های parent را می‌گیرد
        else if (parentCategoryId !== undefined || parentCategory) {
          // اگر parentCategory داده شده، از subcategory_ids آن استفاده کن
          let subCategoryIdsToUse: number[] = [];

          if (parentCategory && parentCategory.subcategory_ids) {
            subCategoryIdsToUse = parentCategory.subcategory_ids;
          } else if (parentCategoryId !== undefined) {
            // اگر فقط parentCategoryId داده شده، باید categories را fetch کنیم
            // اما این کار در hook انجام نمی‌شود، بهتر است از خارج categories را بدهیم
            throw new Error(
              "برای استفاده از parentCategoryId، باید parentCategory را هم بدهید"
            );
          }

          if (subCategoryIdsToUse.length > 0) {
            const promises = subCategoryIdsToUse.map((subCategoryId) =>
              getTopicsByCategory(subCategoryId, finalParams)
            );

            const results = await Promise.all(promises);

            if (cancelled) return;

            const hasError = results.some((r) => r.error);
            if (hasError) {
              const errorResult = results.find((r) => r.error);
              throw new Error(errorResult?.error || "خطا در بارگذاری پست‌ها");
            }

            topicsArray = results.flatMap(
              (r) => r.data?.topic_list?.topics || []
            );
          }
        }
        // اگر هیچ sub-category مشخص نشده، همه topics را بگیر
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    subCategoryIds?.join(","),
    parentCategorySlug,
    subCategorySlug,
    parentCategoryId,
    parentCategory?.id,
    parentCategory?.subcategory_ids?.join(","),
    tags?.join(","),
    JSON.stringify(params),
    enabled,
  ]);

  const refetch = () => {
    setLoading(true);
  };

  return {
    topics,
    loading,
    error,
    refetch,
  };
}
