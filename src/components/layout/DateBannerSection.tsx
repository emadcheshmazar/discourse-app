interface DateBannerSectionProps {
  dateText?: string;
  imageUrl?: string;
  blockId?: string;
  className?: string;
}

export function DateBannerSection({
  dateText = "ایجاد شده 6 ماه پیش",
  imageUrl = "https://tribe-s3-production.imgix.net/0BEFqm4s4ZcWj9vNRS7Tn?fit=max&w=2000&auto=compress,format",
  blockId = "cKdgIMiNjeLhuamP6GWo9",
  className = "mt-1",
}: DateBannerSectionProps) {
  return (
    <div
      className={`@container block-space-header ${className}`}
      data-block-id={blockId}
      data-block-name="space-header"
      dir="rtl"
    >
      <div className="relative overflow-hidden screen-rounded-none screen-border-x-0 shadow-card border-base border-card rounded-base">
        <div className="w-full flex justify-between items-center relative inset-0 z-10 gap-3 flex-wrap text-content-on-background px-6 @3xl:px-10 @5xl:px-16 py-[2rem] @3xl:py-[3rem] @5xl:py-[4rem] text-black">
          <div
            className="flex items-center relative inset-0 z-10 gap-4 flex-wrap flex-1 max-w-full justify-between text-black text-start items-start justify-start"
            dir="rtl"
          >
            <div className="text-sm flex gap-x-5 items-center max-w-full flex-wrap text-start items-start justify-start basis-full">
              <div className="flex items-center gap-1" dir="rtl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="shrink-0 h-[1.25em] w-[1.25em]"
                  width="1em"
                  height="1em"
                >
                  <use href="/icon-sprite-line.svg?v=54cc109f5143cffcb7b01253ae4adf1d#icon-calendar"></use>
                </svg>
                <span className="whitespace-nowrap">{dateText}</span>
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
