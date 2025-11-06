interface TopicCardSkeletonProps {
  styleMode?: number;
  count?: number;
}

export function TopicCardSkeleton({
  styleMode = 1,
  count = 6,
}: TopicCardSkeletonProps) {
  if (styleMode === 3) {
    // اسکلت برای کارت‌های فقط تصویر (302x201)
    return (
      <>
        {Array.from({ length: count }).map((_, index) => (
          <div
            key={index}
            className="topic-card-skeleton-image-only skeleton-shimmer"
            style={{
              width: "302px",
              height: "201px",
              backgroundColor: "#f5f5f5",
              borderRadius: "var(--bm-radius-base)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background:
                  "linear-gradient(90deg, #f5f5f5 0%, #e8e8e8 50%, #f5f5f5 100%)",
                backgroundSize: "200% 100%",
              }}
            />
          </div>
        ))}
      </>
    );
  }

  if (styleMode === 2) {
    // اسکلت برای کارت‌های 400x400
    return (
      <>
        {Array.from({ length: count }).map((_, index) => (
          <div
            key={index}
            className="topic-card-style-2 skeleton-shimmer"
            style={{
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background:
                  "linear-gradient(90deg, #f5f5f5 0%, #e8e8e8 50%, #f5f5f5 100%)",
                backgroundSize: "200% 100%",
              }}
            />
          </div>
        ))}
      </>
    );
  }

  if (styleMode === 4 || styleMode === 5) {
    // اسکلت برای کارت‌های 402x402
    return (
      <>
        {Array.from({ length: count }).map((_, index) => (
          <div
            key={index}
            className="topic-card-style-4 skeleton-shimmer"
            style={{
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background:
                  "linear-gradient(90deg, #f5f5f5 0%, #e8e8e8 50%, #f5f5f5 100%)",
                backgroundSize: "200% 100%",
              }}
            />
          </div>
        ))}
      </>
    );
  }

  // اسکلت پیش‌فرض
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="border border-card flex flex-col bg-surface shadow-card sm:rounded-card"
          style={{
            minHeight: "200px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            className="skeleton-shimmer"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background:
                "linear-gradient(90deg, #f5f5f5 0%, #e8e8e8 50%, #f5f5f5 100%)",
              backgroundSize: "200% 100%",
              animation: "shimmer 1.5s infinite",
            }}
          />
        </div>
      ))}
    </>
  );
}
