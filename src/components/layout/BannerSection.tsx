import { type ReactNode } from "react";

interface BannerSectionProps {
  children?: ReactNode;
  className?: string;
}

export function BannerSection({
  children,
  className = "",
}: BannerSectionProps) {
  return (
    <div
      className={`@container block-space-header banner-section-desktop ${className}`}
      data-block-id="8qHjdlhxinYZsJUAipYYe"
      data-block-name="space-header"
    >
      <div
        className="relative overflow-hidden screen-rounded-none screen-border-x-0 shadow-card border-base border-card rounded-base"
        style={{ backgroundColor: "rgb(45, 78, 110)" }}
      >
        <div className="w-full flex justify-between items-center relative inset-0 z-10 gap-3 flex-wrap text-content-on-background px-6 @3xl:px-10 @5xl:px-16 py-[3rem] @3xl:py-[5rem] @5xl:py-[8rem] text-white">
          <div className="flex items-center relative inset-0 z-10 gap-4 flex-wrap flex-1 max-w-full text-white text-center items-center justify-center">
            {children}
          </div>
        </div>
        <div className="w-full h-full absolute inset-0 z-0">
          <img
            src="https://tribe-s3-production.imgix.net/o85wDmbDXiO8sS39lcE2Y?fit=max&w=2000&auto=compress,format"
            alt=""
            className="w-full h-full object-cover object-center"
          />
          <div
            className="w-full h-full absolute inset-0"
            style={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
          ></div>
        </div>
      </div>
    </div>
  );
}
