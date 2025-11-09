/**
 * Hook for fetching tags
 * مدیریت state و loading برای تگ‌ها
 */

import { useEffect, useState, useRef } from "react";
import { getTags } from "../endpoints/tags";
import type { DiscourseTag } from "../../types/discourse";

export interface UseTagsResult {
  tags: DiscourseTag[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

/**
 * Hook for fetching tags
 */
export function useTags(): UseTagsResult {
  const [tags, setTags] = useState<DiscourseTag[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const isMountedRef = useRef(true);
  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchTags = async () => {
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
      const response = await getTags();

      if (abortController.signal.aborted || !isMountedRef.current) {
        return;
      }

      if (response.error) {
        throw new Error(response.error);
      }

      if (isMountedRef.current && !abortController.signal.aborted) {
        setTags(response.data?.tags || []);
        setError(null);
      }
    } catch (err) {
      if (isMountedRef.current && !abortController.signal.aborted) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : "خطای ناشناخته در بارگذاری تگ‌ها";
        setError(errorMessage);
        console.error("❌ Error loading tags:", errorMessage);
      }
    } finally {
      if (isMountedRef.current && !abortController.signal.aborted) {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchTags();

    return () => {
      isMountedRef.current = false;
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  const refetch = async () => {
    await fetchTags();
  };

  return {
    tags,
    loading,
    error,
    refetch,
  };
}
