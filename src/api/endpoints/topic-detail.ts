/**
 * Topic Detail API Endpoint
 * دریافت جزئیات یک پست خاص
 */

import { apiCall } from "../base/api-client";
import { API_ENDPOINTS, buildEndpoint } from "../config/endpoints";
import type { DiscourseTopicDetail } from "../../types/discourse";

/**
 * Get topic by ID
 */
export async function getTopicById(topicId: number) {
  const endpoint = buildEndpoint(API_ENDPOINTS.TOPIC, {
    topic_id: topicId,
  });
  return apiCall<DiscourseTopicDetail>(endpoint);
}
