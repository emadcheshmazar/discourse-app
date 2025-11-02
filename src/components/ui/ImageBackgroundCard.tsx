import { type ReactNode } from "react";

interface ImageBackgroundCardProps {
  imageUrl?: string;
  children?: ReactNode;
  className?: string;
  onClick?: () => void;
  blockId?: string;
  blockName?: string;
  aspectRatio?: "square" | "video" | "3/2";
  roundedBottom?: boolean;
  style?: React.CSSProperties;
}

export function ImageBackgroundCard({
  imageUrl = "https://tribe-s3-production.imgix.net/KfHxXXdZRyL3iSZNq7WNB?auto=compress,format",
  children,
  className = "",
  onClick,
  blockId,
  blockName = "single-post",
  aspectRatio = "square",
  roundedBottom = false,
  style,
}: ImageBackgroundCardProps) {
  const aspectClass =
    aspectRatio === "square"
      ? "aspect-square"
      : aspectRatio === "3/2"
      ? "aspect-3-2"
      : "aspect-video";

  const imageContainerClass = roundedBottom
    ? "overflow-hidden -mx-[1px] empty:hidden sm:rounded-t-card -mt-[1px] sm:rounded-b-card -mb-[1px] border-b-1"
    : "overflow-hidden -mx-[1px] empty:hidden sm:rounded-t-card -mt-[1px]";

  return (
    <div
      className={`border border-card flex flex-col text-content-subdued transition duration-200 justify-between bg-surface shadow-card sm:rounded-card border-none block-single-post ${className} ${
        onClick ? "cursor-pointer" : ""
      }`}
      onClick={onClick}
      data-block-id={blockId}
      data-block-name={blockName}
      style={style}
    >
      {/* Image Container */}
      <div className={imageContainerClass}>
        <div className={`w-full relative ${aspectClass}`}>
          <div
            className="w-full h-full bg-cover bg-center absolute top-0 start-0"
            style={{
              backgroundImage: `url("${imageUrl}")`,
            }}
          ></div>
        </div>
      </div>

      {/* Content Layer */}
      {children && <div className="relative z-10 w-full">{children}</div>}
    </div>
  );
}
