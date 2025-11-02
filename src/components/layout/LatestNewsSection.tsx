interface NewsHeaderSectionProps {
  title?: string;
  imageUrl?: string;
  blockId?: string;
  className?: string;
}

export function NewsHeaderSection({
  title = "آخرین اخبار و محصولات جدید",
  imageUrl = "https://tribe-s3-production.imgix.net/ByzI3QD49potk2CXcFRYp?fit=max&w=2000&auto=compress,format",
  blockId = "emECTTNb3kqU8pyW1y43M",
  className = "",
}: NewsHeaderSectionProps) {
  return (
    <div
      className={`@container block-space-header ${className}`}
      data-block-id={blockId}
      data-block-name="space-header"
      dir="rtl"
    >
      <div
        className="flex overflow-hidden flex-col-reverse screen-rounded-none screen-border-x-0 relative shadow-card border-base border-card rounded-base"
        style={{ backgroundColor: "rgb(255, 255, 255)" }}
      >
        {/* Content Section */}
        <div className="w-full flex justify-between items-center relative inset-0 z-10 gap-3 flex-wrap text-content-on-background px-6 @3xl:px-10 @5xl:px-16 py-[1.5rem] @3xl:py-[2rem] @5xl:py-[2rem] text-black">
          <div
            className="flex items-center relative inset-0 z-10 gap-4 flex-wrap flex-1 max-w-full justify-between text-black text-start items-start justify-start"
            dir="rtl"
          >
            <div className="basis-full text-start items-start justify-start text-md opacity-95">
              <article className="prose" style={{ color: "inherit" }} dir="rtl">
                <h2
                  id="7457a106-deb0-4953-9a09-ac1f17160942"
                  className="text-right"
                >
                  {title}
                </h2>
              </article>
            </div>
          </div>
        </div>

        {/* Image Section */}
        <div className="relative aspect-[16/1]">
          <div className="w-full h-full absolute inset-0 z-0">
            <img
              src={imageUrl}
              alt=""
              className="w-full h-full object-cover object-center"
              style={{ transform: "scaleX(-1)" }}
            />
            <div
              className="w-full h-full absolute inset-0"
              style={{ backgroundColor: "rgba(255, 255, 255, 0)" }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
