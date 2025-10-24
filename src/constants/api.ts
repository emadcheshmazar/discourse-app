export const API_CONFIG = {
  BASE_URL:
    import.meta.env.MODE === "development"
      ? "/api/discourse"
      : "https://aliasysdiscourse.ir",
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
} as const;

export const ENDPOINTS = {
  SITE: "/site.json",
  LATEST: "/latest.json",
  CATEGORIES: "/categories.json",
  SEARCH: "/search.json",
  CURRENT_USER: "/session/current.json",
  USER: "/users/{username}.json",
  TOPIC: "/t/{topic_id}.json",
  CATEGORY_TOPICS: "/c/{category_slug}/{category_id}/l/latest.json",
  POST: "/posts/{post_id}.json",
  TOPIC_POSTS: "/t/{topic_id}/posts.json",
} as const;

export const DEFAULT_PARAMS = {
  PAGE: 0,
  PER_PAGE: 30,
  ORDER: "created",
  ASCENDING: false,
} as const;
