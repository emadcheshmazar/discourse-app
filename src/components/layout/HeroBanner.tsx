export function HeroBanner() {
  return (
    <div
      className="hero-banner"
      data-block-id="Oq6hefTHEPgsCkPuWRR-R"
      data-block-name="new-hero-banner"
    >
      <div className="hero-banner-container">
        <div className="w-full flex flex-col justify-center relative inset-0 z-10 text-center items-center text-white px-6 @xl:px-16 @5xl:px-48 py-[5rem] @3xl:py-[8rem] @5xl:py-[16rem]">
          <div className="font-semibold text-heading-2xs @xl:text-heading-xs">
            همراه مطمئن فناوری شما
          </div>
          <h2 className="font-bolder text-heading @xl:text-heading-xl mt-[6rem]">
            آلیاسیــس
          </h2>
          <div className="text-lg opacity-95 w-full mt-3">
            <article className="prose" style={{ color: "inherit" }}>
              <p>
                <strong>توانمندسازی تداوم با فرهنگ تکنوکراتیک</strong>
                <br />
              </p>
            </article>
          </div>
        </div>
        <div className="hero-banner-background">
          <img src="/herobaner.avif" alt="" className="hero-banner-image" />
          <div className="hero-banner-overlay"></div>
        </div>
      </div>
    </div>
  );
}
