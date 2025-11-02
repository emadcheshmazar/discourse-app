import { type ReactNode } from "react";
import { ContentBannerSection } from "./ContentBannerSection";
import { NewsHeaderSection } from "./LatestNewsSection";

interface LatestNewsAndContinuitySectionProps {
  children?: ReactNode;
  className?: string;
}

export function LatestNewsAndContinuitySection({
  children,
  className = "",
}: LatestNewsAndContinuitySectionProps) {
  return (
    <div className={className}>
      {/* First Item: ContentBannerSection */}
      <ContentBannerSection>{children}</ContentBannerSection>

      {/* Second Item: NewsHeaderSection */}
      <NewsHeaderSection title="آخرین اخبار و SLA های نوظهور تداوم" />
    </div>
  );
}
