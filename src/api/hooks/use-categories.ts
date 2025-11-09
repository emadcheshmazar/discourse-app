/**
 * Hook for fetching categories
 * مدیریت state و loading برای کتگوری‌ها
 */

import { useEffect, useState, useRef } from "react";
import { getCategories } from "../endpoints/categories";
import type { DiscourseCategory } from "../../types/discourse";

export interface UseCategoriesResult {
  categories: DiscourseCategory[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

/**
 * Hook for fetching categories
 */
export function useCategories(): UseCategoriesResult {
  const [categories, setCategories] = useState<DiscourseCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const isMountedRef = useRef(true);
  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchCategories = async () => {
    // Cancel previous request if exists
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    isMountedRef.current = true;
    setLoading(true);
    setError(null);

    try {
      const response = await getCategories();

      if (abortController.signal.aborted || !isMountedRef.current) {
        return;
      }

      if (response.error) {
        throw new Error(response.error);
      }

      if (isMountedRef.current && !abortController.signal.aborted) {
        setCategories(response.data?.category_list?.categories || []);
        setError(null);
      }
    } catch (err) {
      if (isMountedRef.current && !abortController.signal.aborted) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : "خطای ناشناخته در بارگذاری کتگوری‌ها";
        setError(errorMessage);
        console.error("❌ Error loading categories:", errorMessage);
      }
    } finally {
      if (isMountedRef.current && !abortController.signal.aborted) {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchCategories();

    return () => {
      isMountedRef.current = false;
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  const refetch = async () => {
    await fetchCategories();
  };

  return {
    categories,
    loading,
    error,
    refetch,
  };
}
