/**
 * Topics API Endpoint
 * دریافت پست‌ها (آخرین پست‌ها، پست‌های یک تگ، پست‌های یک کتگوری)
 */

import { apiCall } from "../base/api-client";
import { API_ENDPOINTS, buildEndpoint } from "../config/endpoints";
import type { DiscourseResponse } from "../../types/discourse";

export interface TopicsParams {
  page?: number;
  order?: string;
  ascending?: boolean;
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
 * Get topics by category
 */
export async function getTopicsByCategory(
  categorySlug: string,
  categoryId: number,
  params?: TopicsParams
) {
  const endpoint = buildEndpoint(API_ENDPOINTS.CATEGORY_TOPICS, {
    category_slug: categorySlug,
    category_id: categoryId,
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
