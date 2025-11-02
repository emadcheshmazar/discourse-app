export function LatestServicesSection() {
  return (
    <div
      className="@container block-space-header"
      data-block-id="oSFAB_zBm83yncb_UVrgu"
      data-block-name="space-header"
      dir="rtl"
    >
      <div
        className="flex overflow-hidden flex-col-reverse screen-rounded-none screen-border-x-0 relative shadow-card border-base border-card rounded-base"
        style={{ backgroundColor: "#ffffff" }}
      >
        {/* Content Section */}
        <div className="w-full flex justify-between items-center relative inset-0 z-10 gap-3 flex-wrap text-content-on-background px-6 @3xl:px-10 @5xl:px-16 py-[1.5rem] @3xl:py-[2rem] @5xl:py-[2rem] text-black">
          <div
            className="flex items-center relative inset-0 z-10 gap-4 flex-wrap flex-1 max-w-full justify-between text-black text-start items-start justify-start"
            dir="rtl"
          >
            <div className="basis-full text-center items-center justify-center text-md opacity-95">
              <article className="prose" style={{ color: "inherit" }} dir="rtl">
                <p className="text-center">آخرین اخبار و خدمات نوظهور</p>
              </article>
            </div>
          </div>
        </div>

        {/* Image Section */}
        <div className="relative aspect-[16/1]">
          <div className="w-full h-full absolute inset-0 z-0">
            <img
              src="https://tribe-s3-production.imgix.net/ATEaXlj4DCNMCCJRinr94?fit=max&w=2000&auto=compress,format"
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
    </div>
  );
}
