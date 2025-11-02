interface ServiceCardProps {
  title: string;
  imageUrl: string;
  href?: string;
  onClick?: () => void;
}

export function ServiceCard({
  title,
  imageUrl,
  href,
  onClick,
}: ServiceCardProps) {
  const CardContent = (
    <div
      className="border border-card flex flex-col text-content-subdued transition duration-200 justify-between bg-surface shadow-card sm:rounded-card cursor-pointer hover:shadow-card-hovered transition-all ease-in-out duration-200 justify-start stretch sm:rounded-lg h-full"
      style={{ maxWidth: "300px", minWidth: "300px" }}
      onClick={onClick}
    >
      {/* Content Section */}
      <div className="flex-1 px-4 py-5 sm:p-6 flex flex-col gap-4">
        <div className="grow-0 shrink-0">
          <div className="flex flex-wrap items-center gap-4">
            <h2 className="font-medium text-heading-2xs text-content line-clamp-3 cursor-pointer rounded-base transition duration-200 focus:outline-none focus-visible:ring basis-full break-words min-w-0 inline-block">
              {title}
            </h2>
          </div>
        </div>
      </div>

      {/* Image Section */}
      <div className="overflow-hidden -mx-[1px] empty:hidden sm:rounded-b-card -mb-[1px] border-b-1">
        <div className="w-full relative aspect-square">
          <div
            className="w-full h-full bg-cover bg-center absolute top-0 start-0"
            style={{
              backgroundImage: `url("${imageUrl}")`,
            }}
          ></div>
        </div>
      </div>
    </div>
  );

  if (href) {
    return (
      <a href={href} className="block">
        {CardContent}
      </a>
    );
  }

  return CardContent;
}
