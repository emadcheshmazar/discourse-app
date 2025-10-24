// تنظیمات API
export const API_CONFIG = {
  // استفاده از Vite proxy در development
  BASE_URL: import.meta.env.VITE_DISCOURSE_BASE_URL || "/api/discourse",
  TIMEOUT: 10000, // 10 ثانیه
  RETRY_ATTEMPTS: 3,
} as const;

// Endpoint های Discourse
export const ENDPOINTS = {
  // عمومی
  SITE: "/site.json",
  LATEST: "/latest.json",
  CATEGORIES: "/categories.json",
  SEARCH: "/search.json",

  // کاربران
  CURRENT_USER: "/session/current.json",
  USER: "/users/{username}.json",

  // تاپیک‌ها
  TOPIC: "/t/{topic_id}.json",
  CATEGORY_TOPICS: "/c/{category_slug}/{category_id}/l/latest.json",

  // پست‌ها
  POST: "/posts/{post_id}.json",
  TOPIC_POSTS: "/t/{topic_id}/posts.json",
} as const;

// پارامترهای پیش‌فرض
export const DEFAULT_PARAMS = {
  PAGE: 0,
  PER_PAGE: 30,
  ORDER: "created",
  ASCENDING: false,
} as const;
