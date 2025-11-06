import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { LoadingSpinner } from "../components/ui/LoadingSpinner";
import { ErrorMessage } from "../components/ui/ErrorMessage";
import type { DiscoursePost } from "../types/discourse";
import "./TopicDetail.css";

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
  const postContentRef = useRef<HTMLDivElement>(null);

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

  // Hide first image and links below all images
  useEffect(() => {
    if (!postContentRef.current) return;

    const hideElements = () => {
      if (!postContentRef.current) return;

      // Hide first image (main image)
      const firstImg = postContentRef.current.querySelector("img");
      if (firstImg) {
        const parentLink = firstImg.closest("a");
        if (parentLink) {
          (parentLink as HTMLElement).style.setProperty(
            "display",
            "none",
            "important"
          );
        } else {
          (firstImg as HTMLElement).style.setProperty(
            "display",
            "none",
            "important"
          );
        }
      }

      // Hide meta divs and links below all images
      const allImages = postContentRef.current.querySelectorAll("img");
      allImages.forEach((img) => {
        // Find next sibling that is a meta div or link
        let nextSibling = img.nextElementSibling;
        while (nextSibling) {
          // Hide div.meta (image metadata)
          if (
            nextSibling.tagName === "DIV" &&
            nextSibling.classList.contains("meta")
          ) {
            (nextSibling as HTMLElement).style.setProperty(
              "display",
              "none",
              "important"
            );
            break;
          }
          // Hide links
          if (
            nextSibling.tagName === "A" ||
            (nextSibling.tagName === "P" && nextSibling.querySelector("a"))
          ) {
            const link =
              nextSibling.tagName === "A"
                ? nextSibling
                : nextSibling.querySelector("a");
            if (link) {
              (nextSibling as HTMLElement).style.setProperty(
                "display",
                "none",
                "important"
              );
              break;
            }
          }
          // Also check if next sibling contains only a link
          if (
            nextSibling.querySelector("a") &&
            nextSibling.textContent.trim() ===
              nextSibling.querySelector("a")?.textContent.trim()
          ) {
            (nextSibling as HTMLElement).style.setProperty(
              "display",
              "none",
              "important"
            );
            break;
          }
          nextSibling = nextSibling.nextElementSibling;
        }
      });
    };

    // Initial hide
    hideElements();

    // Use MutationObserver to re-apply styles when DOM changes
    const observer = new MutationObserver(() => {
      hideElements();
    });

    observer.observe(postContentRef.current, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
    };
  }, [topic]);

  const handleRetry = () => {
    if (topicId) {
      window.location.reload();
    }
  };

  if (loading) {
    return (
      <div className="topic-detail-page">
        <div className="center-inline">
          <LoadingSpinner size="lg" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="topic-detail-page">
        <ErrorMessage message={error} onRetry={handleRetry} />
      </div>
    );
  }

  if (!topic) {
    return (
      <div className="topic-detail-page">
        <p className="muted center-text">تاپیک یافت نشد.</p>
      </div>
    );
  }

  const posts = topic.post_stream?.posts || [];
  const firstPost = posts[0];
  const comments = posts.slice(1); // همه پست‌ها به جز اولین (کامنت‌ها)

  // تابع برای ساخت URL آواتار
  const getAvatarUrl = (avatarTemplate: string, size: number = 48) => {
    if (!avatarTemplate) return null;
    const apiBase = import.meta.env.DEV
      ? "/api/discourse"
      : "https://aliasysdiscourse.ir";
    const avatarPath = avatarTemplate.replace("{size}", size.toString());
    // اگر مسیر با / شروع می‌شود، مستقیماً اضافه می‌کنیم
    if (avatarPath.startsWith("/")) {
      return `${apiBase}${avatarPath}`;
    }
    return `${apiBase}/${avatarPath}`;
  };

  // تابع برای گرفتن حرف اول نام
  const getInitial = (name: string | null, username: string) => {
    if (name && name.trim()) {
      return name.trim().charAt(0).toUpperCase();
    }
    return username.charAt(0).toUpperCase();
  };

  return (
    <div className="topic-detail-page">
      <div className="td-layout">
        {/* بخش 40 درصد - سمت چپ */}
        <div className="td-col td-col-left">
          {/* سکشن 1: تصویر اصلی پست */}
          {topic.image_url && (
            <div className="td-image">
              <img src={topic.image_url} alt={topic.title} />
            </div>
          )}

          {/* سکشن 2: باکس تاریخ، تایتل و کتگوری */}
          <div className="td-card">
            {/* تاریخ */}
            {topic.created_at && (
              <div className="td-date">
                <span>
                  {new Date(topic.created_at).toLocaleDateString("fa-IR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
              </div>
            )}

            {/* تایتل */}
            <h2 className="td-title">{topic.fancy_title || topic.title}</h2>

            {/* کتگوری */}
            {topic.category_id && (
              <div className="td-meta">
                <span>کتگوری: </span>
                <span className="td-meta-strong">#{topic.category_id}</span>
              </div>
            )}
          </div>
        </div>

        {/* بخش 60 درصد - سمت راست */}
        <div className="td-col td-col-right">
          {/* سکشن 1: باکس Aliasys Solutions */}
          <div className="td-card">
            <div className="td-box-title">راهکارهای آلیاسیس</div>
          </div>

          {/* سکشن 2: باکس سفید با تگ‌ها، تایتل و محتوا */}
          <div className="td-card td-card-white">
            <button onClick={() => navigate(-1)} className="back-link ">
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
            </button>
            {/* ردیف اول: تگ‌ها */}
            {topic.tags && topic.tags.length > 0 && (
              <div className="td-tags">
                {topic.tags.map((tag) => (
                  <span key={tag} className="td-tag">
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* ردیف سوم: محتوای پست */}
            {firstPost?.cooked && (
              <div
                ref={postContentRef}
                className="topic-post-content"
                dangerouslySetInnerHTML={{ __html: firstPost.cooked }}
              />
            )}
          </div>

          {/* بخش کامنت‌ها */}
          {comments.length > 0 && (
            <div className="td-comments-section">
              {comments.map((comment) => {
                const avatarUrl = getAvatarUrl(comment.avatar_template);
                const initial = getInitial(comment.name, comment.username);
                const displayName = comment.name || comment.username;

                return (
                  <div key={comment.id} className="td-comment-card">
                    <div className="td-comment-header">
                      <div className="td-comment-author">
                        {/* آواتار مربعی */}
                        <div className="td-comment-avatar-square">
                          {avatarUrl ? (
                            <img
                              src={avatarUrl}
                              alt={displayName}
                              className="td-comment-avatar-img"
                            />
                          ) : (
                            <span className="td-comment-avatar-initial">
                              {initial}
                            </span>
                          )}
                        </div>
                        <div className="td-comment-author-info">
                          <div className="td-comment-author-name">
                            {displayName}
                          </div>
                          <div className="td-comment-meta">
                            {comment.created_at && (
                              <div className="td-comment-date">
                                {new Date(
                                  comment.created_at
                                ).toLocaleDateString("fa-IR", {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </div>
                            )}
                            {comment.like_count > 0 && (
                              <div className="td-comment-likes">
                                <svg
                                  width="16"
                                  height="16"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  className="td-comment-like-icon"
                                >
                                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                                </svg>
                                <span>{comment.like_count}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    {comment.cooked && (
                      <div
                        className="td-comment-content"
                        dangerouslySetInnerHTML={{ __html: comment.cooked }}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
