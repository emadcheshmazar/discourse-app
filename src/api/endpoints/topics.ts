/**
 * Topics API Endpoint
 * دریافت پست‌ها (آخرین پست‌ها، پست‌های یک تگ، پست‌های یک کتگوری)
 */

import { apiCall } from "../base/api-client";
import type { ApiResponse } from "../base/api-client";
import { API_ENDPOINTS, buildEndpoint } from "../config/endpoints";
import type { DiscourseResponse } from "../../types/discourse";

export interface TopicsParams {
  page?: number;
  order?: string;
  ascending?: boolean;
  tags?: string[]; // برای فیلتر کردن بر اساس تگ در کتگوری
}

/**
 * Get latest topics
 */
export async function getLatestTopics(params?: TopicsParams) {
  const queryParams = new URLSearchParams();

  if (params?.page !== undefined) {
    queryParams.append("page", String(params.page));
  }
  if (params?.order) {
    queryParams.append("order", params.order);
  }
  if (params?.ascending !== undefined) {
    queryParams.append("ascending", String(params.ascending));
  }

  const queryString = queryParams.toString();
  const endpoint = queryString
    ? `${API_ENDPOINTS.LATEST}?${queryString}`
    : API_ENDPOINTS.LATEST;

  return apiCall<DiscourseResponse>(endpoint);
}

/**
 * Get topics by tag name
 */
export async function getTopicsByTag(tagName: string, params?: TopicsParams) {
  const encodedTagName = encodeURIComponent(tagName);
  const endpoint = buildEndpoint(API_ENDPOINTS.TAG_TOPICS, {
    tag_name: encodedTagName,
  });

  const queryParams = new URLSearchParams();

  if (params?.page !== undefined) {
    queryParams.append("page", String(params.page));
  }
  if (params?.order) {
    queryParams.append("order", params.order);
  }
  if (params?.ascending !== undefined) {
    queryParams.append("ascending", String(params.ascending));
  }

  const queryString = queryParams.toString();
  const finalEndpoint = queryString ? `${endpoint}?${queryString}` : endpoint;

  return apiCall<DiscourseResponse>(finalEndpoint);
}

/**
 * Get topics by category ID
 * استفاده از endpoint ساده: /c/{category_id}/l/latest.json
 */
export async function getTopicsByCategory(
  categoryId: number,
  params?: TopicsParams
): Promise<ApiResponse<DiscourseResponse>>;
/**
 * Get topics by category (with slug)
 * استفاده از endpoint با slug: /c/{category_slug}/{category_id}/l/latest.json
 */
export async function getTopicsByCategory(
  categorySlug: string,
  categoryId: number,
  params?: TopicsParams
): Promise<ApiResponse<DiscourseResponse>>;
/**
 * Get topics by category - implementation
 */
export async function getTopicsByCategory(
  categorySlugOrId: string | number,
  categoryIdOrParams?: number | TopicsParams,
  params?: TopicsParams
): Promise<ApiResponse<DiscourseResponse>> {
  let endpoint: string;
  let finalParams: TopicsParams | undefined;

  // اگر فقط categoryId داده شده باشد
  if (typeof categorySlugOrId === "number") {
    const categoryId = categorySlugOrId;
    finalParams = categoryIdOrParams as TopicsParams | undefined;
    endpoint = buildEndpoint(API_ENDPOINTS.CATEGORY_TOPICS, {
      category_id: categoryId,
    });
  } else {
    // اگر slug و id داده شده باشد
    const categorySlug = categorySlugOrId;
    const categoryId = categoryIdOrParams as number;
    finalParams = params;
    endpoint = buildEndpoint(API_ENDPOINTS.CATEGORY_TOPICS_WITH_SLUG, {
      category_slug: categorySlug,
      category_id: categoryId,
    });
  }

  const queryParams = new URLSearchParams();

  if (finalParams?.page !== undefined) {
    queryParams.append("page", String(finalParams.page));
  }
  if (finalParams?.order) {
    queryParams.append("order", finalParams.order);
  }
  if (finalParams?.ascending !== undefined) {
    queryParams.append("ascending", String(finalParams.ascending));
  }
  if (finalParams?.tags && finalParams.tags.length > 0) {
    queryParams.append("tags", finalParams.tags.join(","));
  }

  const queryString = queryParams.toString();
  const finalEndpoint = queryString ? `${endpoint}?${queryString}` : endpoint;

  return apiCall<DiscourseResponse>(finalEndpoint);
}

/**
 * Get topics by sub-category
 * استفاده از endpoint با parent و sub-category slug: /c/{parent_category_slug}/{subcategory_slug}/l/latest.json
 * یا می‌توانید مستقیماً از getTopicsByCategory با sub-category ID استفاده کنید
 */
export async function getTopicsBySubCategory(
  parentCategorySlug: string,
  subCategorySlug: string,
  params?: TopicsParams
): Promise<ApiResponse<DiscourseResponse>> {
  const endpoint = buildEndpoint(API_ENDPOINTS.SUBCATEGORY_TOPICS, {
    parent_category_slug: parentCategorySlug,
    subcategory_slug: subCategorySlug,
  });

  const queryParams = new URLSearchParams();

  if (params?.page !== undefined) {
    queryParams.append("page", String(params.page));
  }
  if (params?.order) {
    queryParams.append("order", params.order);
  }
  if (params?.ascending !== undefined) {
    queryParams.append("ascending", String(params.ascending));
  }
  if (params?.tags && params.tags.length > 0) {
    queryParams.append("tags", params.tags.join(","));
  }

  const queryString = queryParams.toString();
  const finalEndpoint = queryString ? `${endpoint}?${queryString}` : endpoint;

  return apiCall<DiscourseResponse>(finalEndpoint);
}
