interface SectionHeaderProps {
  title?: string;
  subtitle?: string;
  blockId?: string;
  className?: string;
  containerClassName?: string;
  contentClassName?: string;
  extraPadding?: boolean;
}

export function SectionHeader({
  title = "محصولات برتر ما",
  subtitle = "از برترین شرکای ما در سراسر جهان",
  blockId = "uoC69baGLt2T4n6vhQyi_",
  className = "mt-1",
  containerClassName = "",
  contentClassName = "",
  extraPadding = false,
}: SectionHeaderProps) {
  const paddingClass = extraPadding
    ? "py-[2rem] @3xl:py-[3rem] @5xl:py-[4rem]"
    : "py-[1.5rem] @3xl:py-[2rem] @5xl:py-[2rem]";

  return (
    <div
      className={`@container block-space-header ${className}`}
      data-block-id={blockId}
      data-block-name="space-header"
      dir="rtl"
    >
      <div
        className={`relative overflow-hidden screen-rounded-none screen-border-x-0 shadow-card border-base border-card rounded-base ${containerClassName}`}
        style={{ backgroundColor: "rgb(255, 255, 255)" }}
      >
        <div
          className={`w-full flex justify-between items-center relative inset-0 z-10 gap-3 flex-wrap text-content-on-background px-6 @3xl:px-10 @5xl:px-16 ${paddingClass} text-black ${contentClassName}`}
        >
          <div
            className="flex items-center relative inset-0 z-10 gap-4 flex-wrap flex-1 max-w-full text-black text-center items-center justify-center"
            dir="rtl"
          >
            <div className="basis-full text-center items-center justify-center text-md opacity-95">
              <article className="prose" style={{ color: "inherit" }} dir="rtl">
                <h3 id="3911357e-ca67-4e55-b616-16bcf6377fd4">{title}</h3>
                {subtitle && <p>{subtitle}</p>}
              </article>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
