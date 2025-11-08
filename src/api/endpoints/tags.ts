/**
 * Tags API Endpoint
 * دریافت لیست تگ‌ها
 */

import { apiCall } from "../base/api-client";
import { API_ENDPOINTS } from "../config/endpoints";
import type { DiscourseTagList } from "../../types/discourse";

/**
 * Get all tags
 */
export async function getTags() {
  return apiCall<DiscourseTagList>(API_ENDPOINTS.TAGS);
}
