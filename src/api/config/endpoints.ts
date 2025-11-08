/**
 * API Endpoints Configuration
 * تمام endpoint های API از اینجا خوانده می‌شوند
 */

export const API_ENDPOINTS = {
  // Site endpoints
  SITE: "/site.json",

  // Topics endpoints
  LATEST: "/latest.json",
  TOPIC: "/t/{topic_id}.json",
  TOPIC_POSTS: "/t/{topic_id}/posts.json",

  // Categories endpoints
  CATEGORIES: "/categories.json",
  CATEGORY_TOPICS: "/c/{category_slug}/{category_id}/l/latest.json",

  // Tags endpoints
  TAGS: "/tags.json",
  TAG_TOPICS: "/tag/{tag_name}.json",

  // Search endpoints
  SEARCH: "/search.json",

  // User endpoints
  CURRENT_USER: "/session/current.json",
  USER: "/users/{username}.json",

  // Post endpoints
  POST: "/posts/{post_id}.json",
} as const;

/**
 * Replace placeholders in endpoint URLs
 */
export function buildEndpoint(
  endpoint: string,
  replacements: Record<string, string | number>
): string {
  let result = endpoint;
  for (const [key, value] of Object.entries(replacements)) {
    result = result.replace(`{${key}}`, String(value));
  }
  return result;
}
