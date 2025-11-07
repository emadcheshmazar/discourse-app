import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ErrorMessage } from "../../components/ui/ErrorMessage";
import type { DiscoursePost } from "../../types/discourse";
import "./TopicDetail.css";
import { NewsHeaderSection } from "../../components/layout/LatestNewsSection";

interface SuggestedTopic {
  id: number;
  title: string;
  fancy_title: string;
  slug: string;
  posts_count: number;
  reply_count: number;
  image_url: string | null;
  excerpt: string;
  like_count: number;
  views: number;
  tags: string[];
  thumbnails?: Array<{
    max_width: number | null;
    max_height: number | null;
    width: number;
    height: number;
    url: string;
  }>;
}

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
  tags_descriptions?: Record<string, string>;
  like_count: number;
  views: number;
  word_count?: number;
  participant_count?: number;
  closed: boolean;
  archived: boolean;
  pinned: boolean;
  visible: boolean;
  bookmarked?: boolean;
  can_vote?: boolean;
  vote_count?: number;
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
  actions_summary?: Array<{
    id: number;
    count: number;
    hidden: boolean;
    can_act: boolean;
  }>;
  thumbnails?: Array<{
    max_width: number | null;
    max_height: number | null;
    width: number;
    height: number;
    url: string;
  }>;
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
  suggested_topics?: SuggestedTopic[];
  details: {
    can_edit: boolean;
    can_delete: boolean;
    can_create_post: boolean;
    can_reply_as_new_topic: boolean;
    can_flag_topic: boolean;
    notification_level?: number;
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
    participants?: Array<{
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
      setError("شناسه پست مشخص نشده است");
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
        setError(`خطا در بارگذاری پست: ${errorMessage}`);
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
        <div className="td-layout">
          {/* بخش 40 درصد - سمت چپ */}
          <div className="td-col td-col-left">
            {/* سکشن 1: تصویر اصلی پست */}
            <div className="td-image td-skeleton-image"></div>

            {/* سکشن 2: باکس تاریخ، تایتل و کتگوری */}
            <div className="td-card">
              {/* تاریخ */}
              <div
                className="td-skeleton-line"
                style={{ width: "40%", marginBottom: "8px" }}
              ></div>

              {/* تایتل */}
              <div
                className="td-skeleton-line"
                style={{ width: "90%", height: "24px", marginBottom: "8px" }}
              ></div>
              <div
                className="td-skeleton-line"
                style={{ width: "70%", height: "24px", marginBottom: "16px" }}
              ></div>

              {/* کتگوری */}
              <div
                className="td-skeleton-line"
                style={{ width: "50%", marginBottom: "12px" }}
              ></div>

              {/* وضعیت */}
              <div
                style={{ display: "flex", gap: "6px", marginBottom: "16px" }}
              >
                <div className="td-skeleton-badge"></div>
                <div className="td-skeleton-badge"></div>
              </div>

              {/* آمار */}
              <div className="td-stats">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="td-stat-item">
                    <div className="td-skeleton-icon"></div>
                    <div
                      className="td-skeleton-line"
                      style={{ width: "60px" }}
                    ></div>
                  </div>
                ))}
              </div>

              {/* تاریخ آخرین پست */}
              <div
                className="td-skeleton-line"
                style={{ width: "60%", marginTop: "16px" }}
              ></div>

              {/* اطلاعات کاربر */}
              <div
                style={{
                  marginTop: "16px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "12px" }}
                >
                  <div className="td-skeleton-avatar"></div>
                  <div style={{ flex: 1 }}>
                    <div
                      className="td-skeleton-line"
                      style={{ width: "40%", marginBottom: "4px" }}
                    ></div>
                    <div
                      className="td-skeleton-line"
                      style={{ width: "60%" }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* شرکت‌کنندگان */}
              <div style={{ marginTop: "16px" }}>
                <div
                  className="td-skeleton-line"
                  style={{ width: "50%", marginBottom: "12px" }}
                ></div>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="td-skeleton-avatar-small"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* بخش 60 درصد - سمت راست */}
          <div className="td-col td-col-right">
            {/* سکشن 1: باکس Aliasys Solutions */}
            <div className="td-card">
              <div
                className="td-skeleton-line"
                style={{ width: "60%", height: "32px" }}
              ></div>
            </div>

            {/* سکشن 2: باکس سفید با تگ‌ها و محتوا */}
            <div className="td-card td-card-white">
              {/* دکمه بازگشت */}
              <div
                className="td-skeleton-line"
                style={{ width: "40px", height: "20px", marginBottom: "8px" }}
              ></div>

              {/* تگ‌ها */}
              <div
                style={{
                  display: "flex",
                  gap: "8px",
                  marginBottom: "16px",
                  flexWrap: "wrap",
                }}
              >
                {[1, 2, 3].map((i) => (
                  <div key={i} className="td-skeleton-tag"></div>
                ))}
              </div>

              {/* Actions Summary */}
              <div
                style={{
                  display: "flex",
                  gap: "12px",
                  marginBottom: "16px",
                  flexWrap: "wrap",
                }}
              >
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="td-skeleton-line"
                    style={{ width: "80px" }}
                  ></div>
                ))}
              </div>

              {/* محتوای پست */}
              <div style={{ marginTop: "16px" }}>
                <div
                  className="td-skeleton-line"
                  style={{ width: "100%", marginBottom: "12px" }}
                ></div>
                <div
                  className="td-skeleton-line"
                  style={{ width: "100%", marginBottom: "12px" }}
                ></div>
                <div
                  className="td-skeleton-line"
                  style={{ width: "95%", marginBottom: "12px" }}
                ></div>
                <div
                  className="td-skeleton-line"
                  style={{ width: "100%", marginBottom: "12px" }}
                ></div>
                <div
                  className="td-skeleton-line"
                  style={{ width: "90%", marginBottom: "12px" }}
                ></div>
                <div
                  className="td-skeleton-line"
                  style={{ width: "85%", marginBottom: "24px" }}
                ></div>

                {/* تصویر */}
                <div
                  className="td-skeleton-image-content"
                  style={{ marginBottom: "24px" }}
                ></div>

                <div
                  className="td-skeleton-line"
                  style={{ width: "100%", marginBottom: "12px" }}
                ></div>
                <div
                  className="td-skeleton-line"
                  style={{ width: "100%", marginBottom: "12px" }}
                ></div>
                <div
                  className="td-skeleton-line"
                  style={{ width: "92%", marginBottom: "12px" }}
                ></div>
              </div>
            </div>

            {/* کامنت‌ها */}
            <div
              style={{ display: "flex", flexDirection: "column", gap: "8px" }}
            >
              {[1, 2].map((i) => (
                <div key={i} className="td-comment-card">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      marginBottom: "16px",
                    }}
                  >
                    <div className="td-skeleton-avatar-square"></div>
                    <div style={{ flex: 1 }}>
                      <div
                        className="td-skeleton-line"
                        style={{ width: "30%", marginBottom: "4px" }}
                      ></div>
                      <div
                        className="td-skeleton-line"
                        style={{ width: "50%" }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div
                      className="td-skeleton-line"
                      style={{ width: "100%", marginBottom: "8px" }}
                    ></div>
                    <div
                      className="td-skeleton-line"
                      style={{ width: "95%", marginBottom: "8px" }}
                    ></div>
                    <div
                      className="td-skeleton-line"
                      style={{ width: "90%" }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
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
        <p className="muted center-text">پست یافت نشد.</p>
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

            {/* وضعیت پست */}
            <div className="td-status-badges">
              {topic.pinned && (
                <span className="td-status-badge td-status-pinned">
                  📌 پین شده
                </span>
              )}
              {topic.closed && (
                <span className="td-status-badge td-status-closed">
                  🔒 بسته شده
                </span>
              )}
              {topic.archived && (
                <span className="td-status-badge td-status-archived">
                  📦 آرشیو شده
                </span>
              )}
              {topic.bookmarked && (
                <span className="td-status-badge td-status-bookmarked">
                  ⭐ بوکمارک شده
                </span>
              )}
            </div>

            {/* آمار پست */}
            <div className="td-stats">
              <div className="td-stat-item">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
                <span>{topic.views || 0} بازدید</span>
              </div>
              <div className="td-stat-item">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
                <span>{topic.posts_count || 0} پست</span>
              </div>
              <div className="td-stat-item">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                  <line x1="9" y1="10" x2="15" y2="10"></line>
                </svg>
                <span>{topic.reply_count || 0} پاسخ</span>
              </div>
              <div className="td-stat-item">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
                <span>{topic.like_count || 0} لایک</span>
              </div>
              {topic.participant_count !== undefined && (
                <div className="td-stat-item">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                  <span>{topic.participant_count} شرکت‌کننده</span>
                </div>
              )}
              {topic.word_count !== undefined && (
                <div className="td-stat-item">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                  </svg>
                  <span>{topic.word_count} کلمه</span>
                </div>
              )}
              {topic.vote_count !== undefined && topic.vote_count > 0 && (
                <div className="td-stat-item">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M7 13l3 3 7-7"></path>
                    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                  </svg>
                  <span>{topic.vote_count} رای</span>
                </div>
              )}
            </div>

            {/* تاریخ آخرین پست */}
            {topic.last_posted_at && (
              <div className="td-meta">
                <span>آخرین پست: </span>
                <span className="td-meta-strong">
                  {new Date(topic.last_posted_at).toLocaleDateString("fa-IR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            )}

            {/* اطلاعات سازنده و آخرین پست‌کننده */}
            <div className="td-user-info">
              {topic.details?.created_by && (
                <div className="td-user-item">
                  <div className="td-user-avatar-small">
                    {getAvatarUrl(
                      topic.details.created_by.avatar_template,
                      32
                    ) ? (
                      <img
                        src={
                          getAvatarUrl(
                            topic.details.created_by.avatar_template,
                            32
                          )!
                        }
                        alt={
                          topic.details.created_by.name ||
                          topic.details.created_by.username
                        }
                      />
                    ) : (
                      <span>
                        {getInitial(
                          topic.details.created_by.name,
                          topic.details.created_by.username
                        )}
                      </span>
                    )}
                  </div>
                  <div className="td-user-details">
                    <div className="td-user-label">سازنده:</div>
                    <div className="td-user-name">
                      {topic.details.created_by.name ||
                        topic.details.created_by.username}
                    </div>
                  </div>
                </div>
              )}
              {topic.details?.last_poster &&
                topic.details.last_poster.id !==
                  topic.details?.created_by?.id && (
                  <div className="td-user-item">
                    <div className="td-user-avatar-small">
                      {getAvatarUrl(
                        topic.details.last_poster.avatar_template,
                        32
                      ) ? (
                        <img
                          src={
                            getAvatarUrl(
                              topic.details.last_poster.avatar_template,
                              32
                            )!
                          }
                          alt={
                            topic.details.last_poster.name ||
                            topic.details.last_poster.username
                          }
                        />
                      ) : (
                        <span>
                          {getInitial(
                            topic.details.last_poster.name,
                            topic.details.last_poster.username
                          )}
                        </span>
                      )}
                    </div>
                    <div className="td-user-details">
                      <div className="td-user-label">آخرین پست‌کننده:</div>
                      <div className="td-user-name">
                        {topic.details.last_poster.name ||
                          topic.details.last_poster.username}
                      </div>
                    </div>
                  </div>
                )}
            </div>

            {/* شرکت‌کنندگان */}
            {(topic.details?.participants &&
              topic.details.participants.length > 0) ||
            (topic.participants && topic.participants.length > 0) ? (
              <div className="td-participants">
                <div className="td-participants-title">
                  شرکت‌کنندگان (
                  {topic.participant_count ||
                    (topic.details?.participants || topic.participants || [])
                      .length}
                  )
                </div>
                <div className="td-participants-list">
                  {(topic.details?.participants || topic.participants || [])
                    .slice(0, 10)
                    .map((participant) => {
                      const avatarUrl = getAvatarUrl(
                        participant.avatar_template,
                        32
                      );
                      const initial = getInitial(
                        participant.name,
                        participant.username
                      );
                      return (
                        <div
                          key={participant.id}
                          className="td-participant-item"
                          title={participant.name || participant.username}
                        >
                          {avatarUrl ? (
                            <img
                              src={avatarUrl}
                              alt={participant.name || participant.username}
                            />
                          ) : (
                            <span>{initial}</span>
                          )}
                        </div>
                      );
                    })}
                  {(topic.details?.participants || topic.participants || [])
                    .length > 10 && (
                    <div className="td-participant-more">
                      +
                      {(topic.details?.participants || topic.participants || [])
                        .length - 10}
                    </div>
                  )}
                </div>
              </div>
            ) : null}
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
                  <span
                    key={tag}
                    className="td-tag"
                    title={topic.tags_descriptions?.[tag] || undefined}
                  >
                    {tag}
                    {topic.tags_descriptions?.[tag] && (
                      <span className="td-tag-description">
                        {" "}
                        - {topic.tags_descriptions[tag]}
                      </span>
                    )}
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

          {/* پست‌های پیشنهادی */}
          {topic.suggested_topics && topic.suggested_topics.length > 0 && (
            <div className="td-suggested-topics mt-[8px]">
              <NewsHeaderSection title="پست‌های پیشنهادی" />

              <div className="td-suggested-list mt-[8px]">
                {topic.suggested_topics.map((suggestedTopic) => {
                  const apiBase = import.meta.env.DEV
                    ? "/api/discourse"
                    : "https://aliasysdiscourse.ir";
                  let thumbnailUrl =
                    suggestedTopic.thumbnails?.[0]?.url ||
                    suggestedTopic.image_url;
                  if (thumbnailUrl && !thumbnailUrl.startsWith("http")) {
                    thumbnailUrl = `${apiBase}${
                      thumbnailUrl.startsWith("/") ? "" : "/"
                    }${thumbnailUrl}`;
                  }
                  return (
                    <div
                      key={suggestedTopic.id}
                      className="td-suggested-item"
                      onClick={() => navigate(`/topic/${suggestedTopic.id}`)}
                    >
                      {thumbnailUrl && (
                        <div className="td-suggested-image">
                          <img src={thumbnailUrl} alt={suggestedTopic.title} />
                        </div>
                      )}
                      <div className="td-suggested-content">
                        <h3 className="td-suggested-topic-title">
                          {suggestedTopic.fancy_title || suggestedTopic.title}
                        </h3>
                        {suggestedTopic.excerpt && (
                          <p
                            className="td-suggested-excerpt"
                            dangerouslySetInnerHTML={{
                              __html: suggestedTopic.excerpt,
                            }}
                          />
                        )}
                        <div className="td-suggested-meta">
                          <div className="td-suggested-meta-item">
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                              <circle cx="12" cy="12" r="3"></circle>
                            </svg>
                            <span>{suggestedTopic.views || 0} بازدید</span>
                          </div>
                          <div className="td-suggested-meta-item">
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                            </svg>
                            <span>{suggestedTopic.posts_count || 0} پست</span>
                          </div>
                          <div className="td-suggested-meta-item">
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                            </svg>
                            <span>{suggestedTopic.like_count || 0} لایک</span>
                          </div>
                        </div>
                        {suggestedTopic.tags &&
                          suggestedTopic.tags.length > 0 && (
                            <div className="td-suggested-tags">
                              {suggestedTopic.tags.slice(0, 3).map((tag) => (
                                <span key={tag} className="td-suggested-tag">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
