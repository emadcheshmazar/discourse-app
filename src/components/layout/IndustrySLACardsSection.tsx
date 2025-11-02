interface SLACardData {
  id: string;
  imageUrl: string;
  label: string;
  description: string;
}

const defaultCards: SLACardData[] = [
  {
    id: "1",
    imageUrl:
      "https://tribe-s3-production.imgix.net/hpQZ3cUj7WeQQqaTo1oDF?fit=max&w=1000&auto=compress,format",
    label: "صنعت پشتیبان",
    description: "پتروشیمی، آموزش، مخابرات، بانکداری",
  },
  {
    id: "2",
    imageUrl:
      "https://tribe-s3-production.imgix.net/ux4kVMzPqAbkzewllQFd3?fit=max&w=1000&auto=compress,format",
    label: "صنعت پشتیبان",
    description: "پتروشیمی، آموزش، مخابرات، بانکداری",
  },
  {
    id: "3",
    imageUrl:
      "https://tribe-s3-production.imgix.net/6grslcV8pRY8NZbPIN5eg?fit=max&w=1000&auto=compress,format",
    label: "صنعت پشتیبان",
    description: "پتروشیمی، آموزش، مخابرات، بانکداری",
  },
  {
    id: "4",
    imageUrl:
      "https://tribe-s3-production.imgix.net/EOnTzkAogqha5FaHDq1Y4?fit=max&w=1000&auto=compress,format",
    label: "صنعت پشتیبان",
    description: "آموزش، مخابرات",
  },
];

export function IndustrySLACardsSection() {
  return (
    <div className="space-y-3 sm:space-y-3.5 md:space-y-4 lg:space-y-5 mt-1">
      <div className="relative">
        <div
          className="overflow-hidden"
          style={{ marginInline: "-1px -12px", paddingInline: "1px 12px" }}
        >
          <div
            className="flex items-stretch snap-x h-auto pt-1 pb-4 top-products-cards-container"
            style={{ transform: "translate3d(0px, 0px, 0px)" }}
          >
            {defaultCards.map((card) => (
              <div
                key={card.id}
                className="snap-start grow-0 shrink-0 min-w-0 flex"
                style={{ margin: 0, padding: 0 }}
              >
                <div
                  className="border border-card flex flex-col text-content-subdued transition duration-200 justify-between bg-surface shadow-card sm:rounded-card cursor-pointer hover:shadow-card-hovered transition-all ease-in-out duration-200 justify-start stretch sm:rounded-lg h-full"
                  style={{
                    maxWidth: "400px",
                    minWidth: "400px",
                    margin: 0,
                    padding: 0,
                  }}
                >
                  {/* Image Section - Top */}
                  <div className="overflow-hidden -mx-[1px] empty:hidden sm:rounded-t-card -mt-[1px]">
                    <div className="w-full relative aspect-square">
                      <div
                        className="w-full h-full bg-cover bg-center absolute top-0 start-0"
                        style={{
                          backgroundImage: `url("${card.imageUrl}")`,
                        }}
                      ></div>
                    </div>
                  </div>

                  {/* Content Section - Bottom */}
                  <div className="flex-1 px-4 py-5 sm:p-6 flex flex-col gap-4">
                    <div className="grow-0 shrink-0">
                      <div
                        className="flex flex-wrap items-center gap-4 justify-end"
                        style={{ gap: 0 }}
                      >
                        <div
                          className="web:sm:col-span-1 space-y-1 mt-0 min-w-0 break-words empty:hidden basis-full text-right"
                          dir="rtl"
                        >
                          <dt className="font-medium text-content-subdued text-right">
                            <span>{card.label}</span>
                          </dt>
                          <dd
                            className="text-content text-sm text-right"
                            style={{ marginRight: 0, paddingRight: 0 }}
                          >
                            {card.description}
                          </dd>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
