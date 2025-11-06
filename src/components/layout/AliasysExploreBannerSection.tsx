interface AliasysExploreBannerSectionProps {
  memberCount?: number;
  postCount?: number;
  imageUrl?: string;
  blockId?: string;
  className?: string;
}

export function AliasysExploreBannerSection({
  memberCount = 0,
  postCount = 0,
  imageUrl = "https://tribe-s3-production.imgix.net/0BEFqm4s4ZcWj9vNRS7Tn?fit=max&w=2000&auto=compress,format",
  blockId = "aliasys-explore-banner",
  className = "mt-1",
}: AliasysExploreBannerSectionProps) {
  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num.toString();
  };

  return (
    <div
      className={`@container block-space-header ${className}`}
      data-block-id={blockId}
      data-block-name="space-header"
      dir="rtl"
    >
      <div className="relative overflow-hidden screen-rounded-none screen-border-x-0 shadow-card border-base border-card rounded-2xl @3xl:rounded-3xl">
        <div className="w-full flex flex-col justify-center items-start relative inset-0 z-10 gap-4 text-content-on-background px-6 @3xl:px-10 @5xl:px-16 py-[4rem] @3xl:py-[5rem] @5xl:py-[6rem] text-black">
          <div
            className="flex flex-col items-start relative inset-0 z-10 gap-6 flex-wrap flex-1 max-w-full justify-end text-black text-right"
            dir="rtl"
          >
            <h1 className="text-4xl @3xl:text-5xl @5xl:text-6xl font-bold">
              Aliasys Explore
            </h1>
            <div className="flex items-center gap-8 text-lg @3xl:text-xl @5xl:text-2xl">
              <div className="flex items-center gap-2" dir="rtl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="shrink-0 h-[1.5em] w-[1.5em] @3xl:h-[1.75em] @3xl:w-[1.75em] @5xl:h-[2em] @5xl:w-[2em]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span className="whitespace-nowrap font-semibold">
                  {formatNumber(memberCount)} عضو
                </span>
              </div>
              <div className="flex items-center gap-2" dir="rtl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="shrink-0 h-[1.5em] w-[1.5em] @3xl:h-[1.75em] @3xl:w-[1.75em] @5xl:h-[2em] @5xl:w-[2em]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
                <span className="whitespace-nowrap font-semibold">
                  {formatNumber(postCount)} پست
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full h-full absolute inset-0 z-0">
          <img
            src={imageUrl}
            alt=""
            className="w-full h-full object-cover object-center"
            style={{ transform: "scaleX(-1)" }}
          />
          <div
            className="w-full h-full absolute inset-0"
            style={{ backgroundColor: "rgba(255,255,255,0)" }}
          ></div>
        </div>
      </div>
    </div>
  );
}
