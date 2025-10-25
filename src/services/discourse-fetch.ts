import { API_CONFIG, ENDPOINTS } from "../constants/api";
import type {
  DiscourseResponse,
  DiscourseSession,
  DiscourseCategoryList,
  DiscourseTopicDetail,
  TopicListParams,
  SearchParams,
} from "../types/discourse";

export class DiscourseFetchService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = API_CONFIG.BASE_URL;
  }

  private async fetchWithCORS<T>(
    endpoint: string,
    params?: Record<string, unknown>
  ): Promise<T> {
    const url = new URL(endpoint, this.baseUrl);

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.append(key, String(value));
        }
      });
    }

    console.log(`🌐 Fetching: ${url.toString()}`);

    try {
      const response = await fetch(url.toString(), {
        method: "GET",
        mode: "cors",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`❌ Fetch error for ${endpoint}:`, error);
      throw error;
    }
  }

  async getLatestTopics(params?: TopicListParams): Promise<DiscourseResponse> {
    return this.fetchWithCORS<DiscourseResponse>(
      ENDPOINTS.LATEST,
      params as Record<string, unknown>
    );
  }

  async getCategories(): Promise<DiscourseCategoryList> {
    return this.fetchWithCORS<DiscourseCategoryList>(ENDPOINTS.CATEGORIES);
  }

  async getCategoryTopics(
    slug: string,
    id: number,
    params?: TopicListParams
  ): Promise<DiscourseResponse> {
    const endpoint = ENDPOINTS.CATEGORY_TOPICS.replace(
      "{category_slug}",
      slug
    ).replace("{category_id}", String(id));

    return this.fetchWithCORS<DiscourseResponse>(
      endpoint,
      params as Record<string, unknown>
    );
  }

  async getCurrentUser(): Promise<DiscourseSession> {
    return this.fetchWithCORS<DiscourseSession>(ENDPOINTS.CURRENT_USER);
  }

  async search(params: SearchParams): Promise<DiscourseResponse> {
    return this.fetchWithCORS<DiscourseResponse>(
      ENDPOINTS.SEARCH,
      params as unknown as Record<string, unknown>
    );
  }

  async getTopic(id: number): Promise<DiscourseTopicDetail> {
    const endpoint = ENDPOINTS.TOPIC.replace("{topic_id}", String(id));
    return this.fetchWithCORS<DiscourseTopicDetail>(endpoint);
  }
}
