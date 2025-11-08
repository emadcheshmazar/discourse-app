/**
 * Categories API Endpoint
 * دریافت لیست کتگوری‌ها
 */

import { apiCall } from "../base/api-client";
import { API_ENDPOINTS } from "../config/endpoints";
import type { DiscourseCategoryList } from "../../types/discourse";

/**
 * Get all categories
 */
export async function getCategories() {
  return apiCall<DiscourseCategoryList>(API_ENDPOINTS.CATEGORIES);
}
