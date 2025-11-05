import type { DiscourseTopic } from "../../types/discourse";

interface TopicCardProps {
  topic: DiscourseTopic;
  onClick?: (topic: DiscourseTopic) => void;
  styleMode?: number;
}

export function TopicCard({ topic, onClick, styleMode = 1 }: TopicCardProps) {
  if (styleMode === 1) {
    return (
      <div
        className="border border-card flex flex-col text-content-subdued transition duration-200 justify-between bg-surface shadow-card sm:rounded-card cursor-pointer hover:shadow-card-hovered transition-all ease-in-out duration-200 justify-start stretch"
        onClick={() => onClick?.(topic)}
      >
        <div className="flex-1 px-2 py-2 flex flex-col gap-1">
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-4">
              <div className="text-content text-sm mt-0 min-w-0 break-words">
                {topic.title}
              </div>
            </div>
          </div>
          <div className="grow-0 shrink-0">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex space-s-2 text-content-subdued items-center empty:hidden text-sm">
                <svg
                  className="shrink-0 h-[1.25em] w-[1.25em]"
                  width="1em"
                  height="1em"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
                <span>{topic.like_count || 0}</span>
              </div>
              <div className="flex space-s-2 text-content-subdued items-center text-sm">
                <svg
                  className="h-[1.25em] w-[1.25em] shrink-0"
                  width="1em"
                  height="1em"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                <span>{topic.posts_count || 0}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="overflow-hidden -mx-[1px] empty:hidden sm:rounded-b-card -mb-[1px] border-b-1">
          <div className="w-full relative aspect-video">
            <div
              className="w-full h-full bg-cover bg-center absolute top-0 start-0"
              style={{
                backgroundImage: `url("${
                  (topic as unknown as { image_url: string }).image_url ||
                  "https://via.placeholder.com/400x225/2d4e6e/ffffff?text=No+Image"
                }")`,
              }}
            ></div>
          </div>
        </div>
      </div>
    );
  }

  if (styleMode === 2) {
    // تقسیم عنوان به کلمات برای نمایش چند خطی

    return (
      <div className="topic-card-style-2" onClick={() => onClick?.(topic)}>
        {/* تصویر - 80x80 - راست چین */}
        <div className="topic-card-style-2-image">
          {topic.image_url ? (
            <img
              src={topic.image_url}
              alt={topic.title}
              onError={(e) => {
                const parent = (e.target as HTMLImageElement).parentElement;
                if (parent) {
                  parent.innerHTML = `
                    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="20" y="20" width="40" height="30" rx="2" stroke="white" stroke-width="2" stroke-opacity="0.5" fill="none"/>
                      <path d="M20 32L40 40L60 32" stroke="white" stroke-width="2" stroke-opacity="0.5" fill="none" stroke-linecap="round"/>
                      <circle cx="35" cy="28" r="2" fill="white" fill-opacity="0.5"/>
                      <circle cx="45" cy="28" r="2" fill="white" fill-opacity="0.5"/>
                    </svg>
                  `;
                }
              }}
            />
          ) : (
            <svg
              width="80"
              height="80"
              viewBox="0 0 80 80"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* نماد ساده خطی - تصویر */}
              <rect
                x="20"
                y="20"
                width="40"
                height="30"
                rx="2"
                stroke="white"
                strokeWidth="2"
                strokeOpacity="0.5"
                fill="none"
              />
              <path
                d="M20 32L40 40L60 32"
                stroke="white"
                strokeWidth="2"
                strokeOpacity="0.5"
                fill="none"
                strokeLinecap="round"
              />
              <circle cx="35" cy="28" r="2" fill="white" fillOpacity="0.5" />
              <circle cx="45" cy="28" r="2" fill="white" fillOpacity="0.5" />
            </svg>
          )}
        </div>

        {/* عنوان - دو خط - راست چین */}
        <div className="topic-card-style-2-title">{topic.title}</div>

        {/* توضیحات - راست چین - کوچکتر */}
        <p className="topic-card-style-2-description">
          {topic.excerpt
            ? // Decode HTML entities و حذف HTML tags
              topic.excerpt
                .replace(/&amp;/g, "&")
                .replace(/&lt;/g, "<")
                .replace(/&gt;/g, ">")
                .replace(/&quot;/g, '"')
                .replace(/&#39;/g, "'")
                .replace(/&hellip;/g, "...")
                .replace(/<[^>]*>/g, "") // حذف HTML tags
                .trim()
            : topic.tags_descriptions &&
              Object.keys(topic.tags_descriptions).length > 0
            ? Object.values(topic.tags_descriptions)[0]
            : `این تاپیک شامل ${topic.posts_count} پست و ${topic.reply_count} پاسخ است.`}
        </p>
      </div>
    );
  }

  if (styleMode === 3) {
    return (
      <div
        className="border border-card flex flex-col text-content-subdued transition duration-200 justify-between bg-surface shadow-card sm:rounded-card cursor-pointer hover:shadow-card-hovered transition-all ease-in-out duration-200 justify-start stretch"
        onClick={() => onClick?.(topic)}
      >
        <div className="p-4 text-center text-content-subdued">
          <p className="text-sm">استایل مود 3 - در حال توسعه</p>
          <p className="text-xs mt-2">{topic.title}</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="border border-card flex flex-col text-content-subdued transition duration-200 justify-between bg-surface shadow-card sm:rounded-card cursor-pointer hover:shadow-card-hovered transition-all ease-in-out duration-200 justify-start stretch"
      onClick={() => onClick?.(topic)}
    >
      <div className="flex-1 px-2 py-2 flex flex-col gap-1">
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-4">
            <div className="text-content text-sm mt-0 min-w-0 break-words">
              {topic.title}
            </div>
          </div>
        </div>
        <div className="grow-0 shrink-0">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex space-s-2 text-content-subdued items-center empty:hidden text-sm">
              <svg
                className="shrink-0 h-[1.25em] w-[1.25em]"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              <span>{topic.like_count || 0}</span>
            </div>
            <div className="flex space-s-2 text-content-subdued items-center text-sm">
              <svg
                className="h-[1.25em] w-[1.25em] shrink-0"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              <span>{topic.posts_count || 0}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="overflow-hidden -mx-[1px] empty:hidden sm:rounded-b-card -mb-[1px] border-b-1">
        <div className="w-full relative aspect-video">
          <div
            className="w-full h-full bg-cover bg-center absolute top-0 start-0"
            style={{
              backgroundImage: `url("${
                (topic as unknown as { image_url: string }).image_url ||
                "https://via.placeholder.com/400x225/2d4e6e/ffffff?text=No+Image"
              }")`,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}
