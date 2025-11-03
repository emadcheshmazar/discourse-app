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
    // در حالت development از Vite proxy استفاده می‌کنیم
    // این باعث می‌شود کوکی‌ها درست کار کنند
    if (import.meta.env.DEV) {
      this.baseUrl = "/api/discourse";
      console.log("🔧 Development mode: Using Vite proxy");
    } else {
      this.baseUrl = API_CONFIG.BASE_URL;
    }
  }

  private async fetchWithCORS<T>(
    endpoint: string,
    params?: Record<string, unknown>
  ): Promise<T> {
    console.log(
      `🔗 fetchWithCORS called: endpoint=${endpoint}, baseUrl=${this.baseUrl}`
    );
    const url = new URL(endpoint, this.baseUrl);
    console.log(`✅ URL constructed: ${url.toString()}`);

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.append(key, String(value));
        }
      });
    }

    console.log(`🌐 Fetching: ${url.toString()}`);

    // هدرهای حداقلی؛ بدون هیچ‌گونه مقادیر مرتبط با احراز هویت
    const headers: Record<string, string> = {
      accept: "application/json, text/javascript, */*; q=0.01",
    };

    try {
      const response = await fetch(url.toString(), {
        method: "GET",
        mode: "cors",
        credentials: "omit", // عدم ارسال کوکی‌ها و اطلاعات احراز هویت
        headers,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      console.log(`📥 Parsing JSON response for ${endpoint}...`);
      const data = await response.json();
      console.log(`✅ JSON parsed successfully for ${endpoint}`);

      // لاگ برای دیباگ
      if (import.meta.env.DEV) {
        console.log(`📦 Response received for ${endpoint}:`, {
          hasTopicList: !!data.topic_list,
          topicsCount: data.topic_list?.topics?.length || 0,
          hasCategoryList: !!data.category_list,
          categoriesCount: data.category_list?.categories?.length || 0,
          dataKeys: Object.keys(data || {}),
        });
      }

      return data;
    } catch (error) {
      console.error(`❌ Fetch error for ${endpoint}:`, error);
      console.error(
        `❌ Error stack:`,
        error instanceof Error ? error.stack : "No stack"
      );
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
    console.log("📡 getCategories() called, endpoint:", ENDPOINTS.CATEGORIES);
    try {
      console.log("⏳ About to call fetchWithCORS...");
      const result = await this.fetchWithCORS<DiscourseCategoryList>(
        ENDPOINTS.CATEGORIES
      );
      console.log("✅ getCategories() result received:", {
        hasData: !!result,
        hasCategoryList: !!result?.category_list,
        categoriesCount: result?.category_list?.categories?.length || 0,
        resultKeys: result ? Object.keys(result) : [],
      });
      console.log("📋 Full result:", result);
      return result;
    } catch (error) {
      console.error("❌ getCategories() caught error:", error);
      throw error;
    }
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

    console.log(`📂 Loading category topics: slug=${slug}, id=${id}`);
    console.log(`🔗 Endpoint: ${endpoint}`);

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
