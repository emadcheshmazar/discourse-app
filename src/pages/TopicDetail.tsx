import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { LoadingSpinner } from "../components/ui/LoadingSpinner";
import { ErrorMessage } from "../components/ui/ErrorMessage";
import type { DiscoursePost } from "../types/discourse";

interface TopicDetailResponse {
  post_stream: {
    posts: DiscoursePost[];
  };
  id: number;
  title: string;
  fancy_title: string;
  slug: string;
  posts_count: number;
  reply_count: number;
  created_at: string;
  last_posted_at: string;
  image_url: string | null;
  category_id: number;
  tags: string[];
  like_count: number;
  views: number;
  closed: boolean;
  archived: boolean;
  pinned: boolean;
  visible: boolean;
  can_edit: boolean;
  can_delete: boolean;
  can_recover: boolean;
  can_edit_title: boolean;
  can_edit_category: boolean;
  can_remove_allowed_users: boolean;
  can_invite_to: boolean;
  can_create_post: boolean;
  can_reply_as_new_topic: boolean;
  can_flag_topic: boolean;
  participants: Array<{
    id: number;
    username: string;
    name: string | null;
    avatar_template: string;
    post_count: number;
    primary_group_name: string | null;
    flair_name: string | null;
    flair_url: string | null;
    flair_color: string | null;
    flair_bg_color: string | null;
    admin: boolean;
    moderator: boolean;
    trust_level: number;
  }>;
  details: {
    can_edit: boolean;
    can_delete: boolean;
    can_create_post: boolean;
    can_reply_as_new_topic: boolean;
    can_flag_topic: boolean;
    created_by: {
      id: number;
      username: string;
      name: string | null;
      avatar_template: string;
    };
    last_poster: {
      id: number;
      username: string;
      name: string | null;
      avatar_template: string;
    };
  };
}

export default function TopicDetail() {
  const { topicId } = useParams<{ topicId: string }>();
  const navigate = useNavigate();
  const [topic, setTopic] = useState<TopicDetailResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!topicId) {
      setError("شناسه تاپیک مشخص نشده است");
      setLoading(false);
      return;
    }

    const loadTopic = async () => {
      try {
        setLoading(true);
        setError(null);

        const apiBase = import.meta.env.DEV
          ? "/api/discourse"
          : "https://aliasysdiscourse.ir";

        // Discourse API: /t/{topic_id}.json
        const url = `${apiBase}/t/${topicId}.json`;

        const response = await fetch(url, {
          method: "GET",
          mode: import.meta.env.DEV ? "same-origin" : "cors",
          credentials: "include",
          headers: {
            accept: "application/json, text/javascript, */*; q=0.01",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setTopic(data);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : String(err);
        console.error("❌ Error loading topic:", errorMessage);
        setError(`خطا در بارگذاری تاپیک: ${errorMessage}`);
      } finally {
        setLoading(false);
      }
    };

    loadTopic();
  }, [topicId]);

  const handleRetry = () => {
    if (topicId) {
      window.location.reload();
    }
  };

  if (loading) {
    return (
      <div className="w-full max-w-[1400px] mx-auto px-2 md:px-4 lg:px-6 py-8">
        <div className="flex justify-center">
          <LoadingSpinner size="lg" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-[1400px] mx-auto px-2 md:px-4 lg:px-6 py-8">
        <ErrorMessage message={error} onRetry={handleRetry} />
      </div>
    );
  }

  if (!topic) {
    return (
      <div className="w-full max-w-[1400px] mx-auto px-2 md:px-4 lg:px-6 py-8">
        <p className="text-center text-gray-500">تاپیک یافت نشد.</p>
      </div>
    );
  }

  const posts = topic.post_stream?.posts || [];

  return (
    <div className="w-full max-w-[1400px] mx-auto px-2 md:px-4 lg:px-6 py-8">
      {/* دکمه بازگشت */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-content hover:text-content-hovered transition-colors flex items-center gap-2"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        <span>بازگشت</span>
      </button>

      {/* هدر تاپیک */}
      <div className="mb-6 pb-6 border-b border-line">
        <h1 className="text-heading-xl font-bold text-content mb-4">
          {topic.fancy_title || topic.title}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-sm text-content-subdued">
          <div className="flex items-center gap-2">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            <span>{topic.posts_count} پست</span>
          </div>
          <div className="flex items-center gap-2">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            <span>{topic.views} بازدید</span>
          </div>
          <div className="flex items-center gap-2">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            <span>{topic.like_count} لایک</span>
          </div>
          {topic.created_at && (
            <div className="flex items-center gap-2">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <span>
                {new Date(topic.created_at).toLocaleDateString("fa-IR")}
              </span>
            </div>
          )}
        </div>

        {/* تگ‌ها */}
        {topic.tags && topic.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {topic.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-surface-subdued text-content-subdued rounded-base text-sm"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* لیست پست‌ها */}
      <div className="space-y-6">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-surface border border-card rounded-base p-6 shadow-card"
          >
            {/* هدر پست */}
            <div className="flex items-start justify-between mb-4 pb-4 border-b border-line">
              <div className="flex items-center gap-3">
                {post.avatar_template && (
                  <img
                    src={post.avatar_template.replace("{size}", "40")}
                    alt={post.username}
                    className="w-10 h-10 rounded-full"
                  />
                )}
                <div>
                  <div className="font-semibold text-content">
                    {post.name || post.username}
                  </div>
                  <div className="text-sm text-content-subdued">
                    {post.username}
                  </div>
                </div>
              </div>
              <div className="text-sm text-content-subdued">
                {post.created_at && (
                  <time dateTime={post.created_at}>
                    {new Date(post.created_at).toLocaleString("fa-IR")}
                  </time>
                )}
              </div>
            </div>

            {/* محتوای پست */}
            <div
              className="topic-post-content"
              dangerouslySetInnerHTML={{ __html: post.cooked || "" }}
            />

            {/* اطلاعات پست */}
            <div className="flex items-center gap-4 mt-4 pt-4 border-t border-line text-sm text-content-subdued">
              <div className="flex items-center gap-1">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
                <span>{post.like_count || 0}</span>
              </div>
              <div>پست #{post.post_number}</div>
            </div>
          </div>
        ))}
      </div>

      {posts.length === 0 && (
        <div className="text-center py-8 text-content-subdued">
          <p>پستی در این تاپیک یافت نشد.</p>
        </div>
      )}
    </div>
  );
}
