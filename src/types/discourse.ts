// تایپ‌های اصلی Discourse
export interface DiscourseUser {
  id: number;
  username: string;
  name: string;
  email: string;
  created_at: string;
  avatar_template: string;
  trust_level: number;
  moderator: boolean;
  admin: boolean;
}

export interface DiscoursePoster {
  extras: string;
  description: string;
  user_id: number;
  primary_group_id: number | null;
}

export interface DiscourseTopic {
  id: number;
  title: string;
  fancy_title?: string;
  slug: string;
  posts_count: number;
  reply_count: number;
  highest_post_number: number;
  image_url: string | null;
  created_at: string;
  last_posted_at: string;
  bumped: boolean;
  bumped_at: string;
  archetype: string;
  unseen: boolean;
  pinned: boolean;
  unpinned: boolean;
  visible: boolean;
  closed: boolean;
  archived: boolean;
  bookmarked: boolean;
  liked: boolean;
  tags: string[];
  tags_descriptions: Record<string, string>;
  like_count: number;
  views: number;
  category_id: number;
  featured_link: string | null;
  posters: DiscoursePoster[];
  excerpt?: string; // متن خلاصه شده پست
}

export interface DiscourseTag {
  id: string;
  text: string;
  name: string;
  topic_count: number;
  pm_topic_count?: number;
  staff_topic_count?: number;
  description?: string;
  description_text?: string;
  description_excerpt?: string;
}

export interface DiscourseTagList {
  tags: DiscourseTag[];
}

export interface DiscourseCategory {
  id: number;
  parent_category_id?: number | null;
  name: string;
  color: string;
  text_color: string;
  style_type: string;
  icon: string | null;
  emoji: string | null;
  slug: string;
  topic_count: number;
  post_count: number;
  position: number;
  description: string;
  description_text: string;
  description_excerpt: string;
  topic_url: string;
  read_restricted: boolean;
  permission: unknown;
  notification_level: number;
  topic_template: string | null;
  has_children: boolean;
  subcategory_count: number | null;
  sort_order: string | null;
  sort_ascending: boolean | null;
  show_subcategory_list: boolean;
  num_featured_topics: number;
  default_view: string | null;
  subcategory_list_style: string;
  default_top_period: string;
  default_list_filter: string;
  minimum_required_tags: number;
  navigate_to_first_post_after_read: boolean;
  custom_fields: Record<string, unknown>;
  topics_day: number;
  topics_week: number;
  topics_month: number;
  topics_year: number;
  topics_all_time: number;
  subcategory_ids: number[];
  doc_index_topic_id: number | null;
  uploaded_logo: string | null;
  uploaded_logo_dark: string | null;
  uploaded_background: string | null;
  uploaded_background_dark: string | null;
  topics?: DiscourseTopic[];
  subcategory_list?: DiscourseCategory[];
}

export interface DiscourseTopicList {
  can_create_topic: boolean;
  more_topics_url: string;
  draft?: string;
  draft_key: string;
  draft_sequence: number;
  per_page: number;
  top_tags: string[];
  tags: string[];
  topics: DiscourseTopic[];
}

export interface DiscourseResponse {
  topic_list: DiscourseTopicList;
  users: DiscourseUser[];
  primary_groups: unknown[];
}

export interface DiscourseCategoryList {
  category_list: {
    can_create_category: boolean;
    can_create_topic: boolean;
    categories: DiscourseCategory[];
  };
}

export interface DiscourseTopicDetail {
  id: number;
  title: string;
  fancy_title: string;
  slug: string;
  posts_count: number;
  reply_count: number;
  highest_post_number: number;
  image_url: string | null;
  created_at: string;
  last_posted_at: string;
  bumped: boolean;
  bumped_at: string;
  archetype: string;
  unseen: boolean;
  pinned: boolean;
  unpinned: boolean | null;
  visible: boolean;
  closed: boolean;
  archived: boolean;
  bookmarked: boolean | null;
  liked: boolean | null;
  thumbnails: Array<{
    max_width: number | null;
    max_height: number | null;
    width: number;
    height: number;
    url: string;
  }> | null;
  has_accepted_answer: boolean;
  last_poster: {
    id: number;
    username: string;
    name: string | null;
    avatar_template: string;
  };
  visibility_reason_id?: number;
}

export interface DiscourseSession {
  current_user: DiscourseUser | null;
}

// تایپ‌های درخواست
export interface TopicListParams {
  page?: number;
  order?: "created" | "activity" | "views" | "posts";
  ascending?: boolean;
  category?: number;
  filter?: string; // برای فیلتر کردن پست‌ها (مثل "default")
}

export interface SearchParams {
  q: string;
  page?: number;
  order?: string;
}

export interface DiscoursePost {
  id: number;
  name: string;
  username: string;
  avatar_template: string;
  created_at: string;
  cooked: string;
  post_number: number;
  post_type: number;
  updated_at: string;
  reply_count: number;
  reply_to_post_number: number | null;
  quote_count: number;
  incoming_link_count: number;
  reads: number;
  readers_count: number;
  score: number;
  yours: boolean;
  topic_id: number;
  topic_slug: string;
  display_username: string;
  primary_group_name: string | null;
  flair_name: string | null;
  flair_url: string | null;
  flair_bg_color: string | null;
  flair_color: string | null;
  version: number;
  can_edit: boolean;
  can_delete: boolean;
  can_recover: boolean;
  can_see_hidden_post: boolean;
  can_wiki: boolean;
  can_view_edit_history: boolean;
  wiki: boolean;
  like_count: number;
  can_accept_answer: boolean;
  can_unaccept_answer: boolean;
  accepted_answer: boolean;
  user_deleted: boolean;
  via_email: boolean;
  actions_summary: Array<{
    id: number;
    count: number;
    hidden: boolean;
    can_act: boolean;
  }>;
  moderator: boolean;
  admin: boolean;
  staff: boolean;
  user_id: number;
  hidden: boolean;
  trust_level: number;
  deleted_at: string | null;
  edit_reason: string | null;
  reply_to_user?: {
    username: string;
    name: string | null;
    avatar_template: string;
  };
}
