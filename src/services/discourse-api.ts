import { HttpClient } from "./http-client";
import { ENDPOINTS } from "../constants/api";
import type {
  DiscourseResponse,
  DiscourseSession,
  DiscourseCategoryList,
  DiscourseTopicDetail,
  TopicListParams,
  SearchParams,
} from "../types/discourse";

// سرویس ساده و تمیز برای Discourse API
export class DiscourseApi {
  private http: HttpClient;

  constructor(baseUrl?: string) {
    this.http = new HttpClient(baseUrl);
  }

  // لیست تاپیک‌های جدید
  async getLatestTopics(params?: TopicListParams) {
    return this.http.get<DiscourseResponse>(
      ENDPOINTS.LATEST,
      params as unknown as Record<string, unknown>
    );
  }

  // لیست کتگوری‌ها
  async getCategories() {
    return this.http.get<DiscourseCategoryList>(ENDPOINTS.CATEGORIES);
  }

  // تاپیک‌های یک کتگوری
  async getCategoryTopics(slug: string, id: number, params?: TopicListParams) {
    const url = ENDPOINTS.CATEGORY_TOPICS.replace(
      "{category_slug}",
      slug
    ).replace("{category_id}", String(id));

    return this.http.get<DiscourseResponse>(
      url,
      params as unknown as Record<string, unknown>
    );
  }

  // اطلاعات کاربر
  async getCurrentUser() {
    return this.http.get<DiscourseSession>(ENDPOINTS.CURRENT_USER);
  }

  // جستجو
  async search(params: SearchParams) {
    return this.http.get<DiscourseResponse>(
      ENDPOINTS.SEARCH,
      params as unknown as Record<string, unknown>
    );
  }

  // جزئیات تاپیک
  async getTopic(id: number) {
    const url = ENDPOINTS.TOPIC.replace("{topic_id}", String(id));
    return this.http.get<DiscourseTopicDetail>(url);
  }

  // تنظیم API key
  setApiKey(key: string, username: string) {
    this.http.setApiKey(key, username);
  }
}
