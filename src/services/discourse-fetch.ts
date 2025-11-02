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

  /**
   * CSRF token برای حالت توسعه (هاردکد)
   * این token از نمونه موفق fetch گرفته شده است
   * آخرین بروزرسانی: از درخواست موفق categories.json
   */
  private readonly DEV_CSRF_TOKEN =
    "ik6bj9SiQVSq9EdbLaTTp2EATCwY1t0SBli3AApSIrv7GE_CeKUKVFm_NfDWF8rtb0pj5HE5Qd1g4d1OkbX1rg";

  /**
   * دریافت CSRF tokenl
   * در حالت development از token هاردکد استفاده می‌کند
   * در حالت production از localStorage می‌خواند
   */
  private getCsrfToken(): string | null {
    // در حالت development از token هاردکد استفاده کن
    if (import.meta.env.DEV) {
      console.log("🔧 Development mode: Using hardcoded CSRF token");
      return this.DEV_CSRF_TOKEN;
    }

    // در حالت production از localStorage بخوان
    try {
      const token = localStorage.getItem("discourse_csrf_token");
      if (token) {
        console.log("✅ Using CSRF token from localStorage");
        return token;
      }
    } catch {
      // localStorage در دسترس نیست
    }

    return null;
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

    // در حالت development با proxy، همه هدرها در proxy configuration اضافه شده‌اند
    const isProxyMode =
      import.meta.env.DEV && this.baseUrl.startsWith("/api/discourse");

    // ساخت هدرهای لازم
    // در proxy mode، اکثر هدرها در proxy configuration اضافه می‌شوند
    const headers: Record<string, string> = {
      accept: "application/json, text/javascript, */*; q=0.01",
    };

    // اگر از proxy استفاده نمی‌کنیم، تمام هدرها را اضافه می‌کنیم
    if (!isProxyMode) {
      const csrfToken = this.getCsrfToken();

      headers["accept-language"] = "en-US,en;q=0.9,fa-IR;q=0.8,fa;q=0.7";
      headers["discourse-logged-in"] = "true";
      headers["discourse-present"] = "true";
      headers["discourse-track-view"] = "true";
      headers.priority = "u=1, i";
      headers["sec-fetch-dest"] = "empty";
      headers["sec-fetch-mode"] = "cors";
      headers["sec-fetch-site"] = "same-origin";
      headers["x-requested-with"] = "XMLHttpRequest";

      if (csrfToken) {
        headers["x-csrf-token"] = csrfToken;
      } else {
        console.warn("⚠️ CSRF token not available - API may return 403");
      }
    }

    try {
      const response = await fetch(url.toString(), {
        method: "GET",
        mode: isProxyMode ? "same-origin" : "cors", // با proxy از same-origin استفاده می‌کنیم
        credentials: "include", // ارسال کوکی‌ها (مهم!)
        headers,
      });

      if (!response.ok) {
        if (response.status === 403) {
          throw new Error(
            "403 Forbidden: نیاز به لاگین در Discourse. لطفاً ابتدا در Discourse لاگین کنید و سپس به این صفحه بروید."
          );
        }
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
