import { HttpClient } from "./http-client";
import { ENDPOINTS, DEFAULT_PARAMS } from "../constants/api";
import type {
  DiscourseResponse,
  DiscourseSession,
  DiscourseCategoryList,
  DiscourseTopicDetail,
  TopicListParams,
  SearchParams,
} from "../types/discourse";

export class DiscourseService {
  private httpClient: HttpClient;

  constructor(baseUrl?: string) {
    this.httpClient = new HttpClient(baseUrl);
  }

  async getLatestTopics(params?: TopicListParams): Promise<DiscourseResponse> {
    const queryParams = {
      page: params?.page ?? DEFAULT_PARAMS.PAGE,
      order: params?.order ?? DEFAULT_PARAMS.ORDER,
      ascending: params?.ascending ?? DEFAULT_PARAMS.ASCENDING,
    };

    return this.httpClient.get<DiscourseResponse>(
      ENDPOINTS.LATEST,
      queryParams
    );
  }

  async getCategories(): Promise<DiscourseCategoryList> {
    return this.httpClient.get<DiscourseCategoryList>(ENDPOINTS.CATEGORIES);
  }

  async getCategoryTopics(
    categorySlug: string,
    categoryId: number,
    params?: TopicListParams
  ): Promise<DiscourseResponse> {
    const endpoint = ENDPOINTS.CATEGORY_TOPICS.replace(
      "{category_slug}",
      categorySlug
    ).replace("{category_id}", String(categoryId));

    const queryParams = {
      page: params?.page ?? DEFAULT_PARAMS.PAGE,
      order: params?.order ?? DEFAULT_PARAMS.ORDER,
      ascending: params?.ascending ?? DEFAULT_PARAMS.ASCENDING,
    };

    return this.httpClient.get<DiscourseResponse>(endpoint, queryParams);
  }

  async getCurrentUser(): Promise<DiscourseSession> {
    return this.httpClient.get<DiscourseSession>(ENDPOINTS.CURRENT_USER);
  }

  async searchTopics(params: SearchParams): Promise<DiscourseResponse> {
    const queryParams = {
      q: params.q,
      page: params.page ?? DEFAULT_PARAMS.PAGE,
      order: params.order ?? DEFAULT_PARAMS.ORDER,
    };

    return this.httpClient.get<DiscourseResponse>(
      ENDPOINTS.SEARCH,
      queryParams
    );
  }

  async getTopic(topicId: number): Promise<DiscourseTopicDetail> {
    const endpoint = ENDPOINTS.TOPIC.replace("{topic_id}", String(topicId));
    return this.httpClient.get<DiscourseTopicDetail>(endpoint);
  }
}
