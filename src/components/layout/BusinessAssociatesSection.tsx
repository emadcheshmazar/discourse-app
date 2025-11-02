import { ImageBackgroundCard } from "../ui/ImageBackgroundCard";

interface CardData {
  id: string;
  imageUrl: string;
}

interface BusinessAssociatesSectionProps {
  className?: string;
}

const defaultCards: CardData[] = [
  {
    id: "1",
    imageUrl:
      "https://tribe-s3-production.imgix.net/AyTvce2QbxQZQA03VSihC?fit=max&w=1000&auto=compress,format",
  },
  {
    id: "2",
    imageUrl:
      "https://tribe-s3-production.imgix.net/jPmdKeMc3XtPqyGNhfTb4?fit=max&w=1000&auto=compress,format",
  },
  {
    id: "3",
    imageUrl:
      "https://tribe-s3-production.imgix.net/T3WVtUyBhlcmgfAO4lw94?fit=max&w=1000&auto=compress,format",
  },
  {
    id: "4",
    imageUrl:
      "https://tribe-s3-production.imgix.net/3YqE5aKXcUrE9JIh88XDe?fit=max&w=1000&auto=compress,format",
  },
  {
    id: "5",
    imageUrl:
      "https://tribe-s3-production.imgix.net/NDmuAcnrcehanHFwvdAfj?fit=max&w=1000&auto=compress,format",
  },
  {
    id: "6",
    imageUrl:
      "https://tribe-s3-production.imgix.net/cd97Szkkt38LKL9I0xOnk?fit=max&w=1000&auto=compress,format",
  },
  {
    id: "7",
    imageUrl:
      "https://tribe-s3-production.imgix.net/KhQ25CpYnCpcbELAXcpqD?fit=max&w=1000&auto=compress,format",
  },
  {
    id: "8",
    imageUrl:
      "https://tribe-s3-production.imgix.net/RqobkXFQRa2Sgao6T5a4B?fit=max&w=1000&auto=compress,format",
  },
  {
    id: "9",
    imageUrl:
      "https://tribe-s3-production.imgix.net/FtYTNxyalphW4VegKamdI?fit=max&w=1000&auto=compress,format",
  },
  {
    id: "10",
    imageUrl:
      "https://tribe-s3-production.imgix.net/zw0rrAQcwTVU4vMIJ5W4Z?fit=max&w=1000&auto=compress,format",
  },
];

export function BusinessAssociatesSection({
  className = "",
}: BusinessAssociatesSectionProps) {
  return (
    <section
      className={`grid w-full grid-cols-1 gap-3 sm:gap-3.5 md:gap-4 lg:gap-5 ${className}`}
      data-block-id="38NgpLHKTdfR3YwyCRAHI"
      data-block-name="section"
    >
      <div
        className="col-span-1 flex flex-col"
        data-block-id="633D8h4yuzk3LjD2lTFUo"
        data-block-name="column"
      >
        {/* Header */}
        <div
          className="@container block-space-header"
          data-block-id="fyXpsITueH0imkB-gld_A"
          data-block-name="space-header"
        >
          <div
            className="relative overflow-hidden screen-rounded-none screen-border-x-0 shadow-card border-base border-card rounded-base"
            style={{ backgroundColor: "rgb(255, 255, 255)" }}
          >
            <div className="w-full flex justify-between items-center relative inset-0 z-10 gap-3 flex-wrap text-content-on-background px-6 @3xl:px-10 @5xl:px-16 py-[1.5rem] @3xl:py-[2rem] @5xl:py-[2rem] text-black">
              <div className="flex items-center relative inset-0 z-10 gap-4 flex-wrap flex-1 max-w-full text-black text-center items-center justify-center">
                <div className="basis-full text-center items-center justify-center text-md opacity-95">
                  <article className="prose" style={{ color: "inherit" }}>
                    <h3 id="3911357e-ca67-4e55-b616-16bcf6377fd4">
                      همکاران تجاری ما
                    </h3>
                    <p>ما در تداوم همکاری می‌کنیم</p>
                  </article>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Posts Section */}
        <div
          className="block-posts"
          data-block-id="fqTC4ZjeYdpLf1sQurY0v"
          data-block-name="posts"
        >
          <div className="">
            <div className="hidden absolute inset-0 cursor-default z-50"></div>
            <div className="space-y-3 sm:space-y-3.5 md:space-y-4 lg:space-y-5">
              <div className="relative">
                <div
                  className="overflow-hidden"
                  style={{
                    marginInline: "-12px -1px",
                    paddingInline: "12px 1px",
                  }}
                >
                  <div className="flex items-stretch snap-x h-auto pt-1 pb-4 business-associates-container">
                    {defaultCards.map((card) => (
                      <div
                        key={card.id}
                        className="snap-start grow-0 shrink-0 min-w-0 flex"
                      >
                        <ImageBackgroundCard
                          imageUrl={card.imageUrl}
                          aspectRatio="3/2"
                          blockId={card.id}
                          roundedBottom={true}
                          className="flex-shrink-0 sm:rounded-lg h-full transition-all ease-in-out duration-200 justify-start stretch business-associate-card cursor-pointer hover:shadow-card-hovered"
                          style={{ maxWidth: "300px", minWidth: "300px" }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
