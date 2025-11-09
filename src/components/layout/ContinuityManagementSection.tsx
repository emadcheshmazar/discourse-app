import { useState } from "react";

interface AccordionItem {
  id: string;
  title: string;
  imageUrl: string;
  content: string;
}

const accordionItems: AccordionItem[] = [
  {
    id: "risk-management",
    title: "مدیریت ریسک",
    imageUrl:
      "https://tribe-s3-production.imgix.net/IvmqQUk866GZvkJCMT5tP?auto=compress,format",
    content:
      "آلیاسیس ریسک را به عنوان یک جزء جدایی‌ناپذیر از تداوم کسب‌وکار در نظر می‌گیرد. این شرکت به‌طور پیشگیرانه تهدیدات بالقوه را شناسایی و ارزیابی می‌کند و زیرساخت‌های ایمن و مقاوم را برای کاهش تأثیر و محافظت از عملیات بدون وقفه، حتی در بحران‌ها، پیاده‌سازی می‌کند.",
  },
  {
    id: "change-management",
    title: "مدیریت تغییر",
    imageUrl:
      "https://tribe-s3-production.imgix.net/glEIYrRQ33YqgO2ElhC8o?auto=compress,format",
    content:
      "در آلیاسیس، تغییر به عنوان یک محرک برای نوآوری پذیرفته می‌شود. از طریق چارچوب‌های ساختاریافته و شیوه‌های مشاوره‌ای، سازمان به‌طور مؤثر هم تحولات زیرساخت و هم تحولات سازمانی را مدیریت می‌کند و اطمینان از همسویی با رشد مشتری و تبدیل تغییر به یک محرک استراتژیک پیشرفت را تضمین می‌کند.",
  },
  {
    id: "performance-management",
    title: "مدیریت عملکرد",
    imageUrl:
      "https://tribe-s3-production.imgix.net/K7sSghy7QGT0N5Pau8bjp?auto=compress,format",
    content:
      "آلیاسیس رویکردی سخت‌گیرانه به نظارت بر عملکرد دارد. با استفاده از شاخص‌های کلیدی عملکرد (KPI) تعریف‌شده، جلسات بررسی منظم و روش‌های منظم، تیم‌ها به‌طور مداوم نتایج را ارزیابی می‌کنند، فرآیندها را بهینه می‌کنند و فرهنگ بهبود مستمر را در تمام سیستم‌ها و خدمات تقویت می‌کنند.",
  },
];

interface AccordionProps {
  items: AccordionItem[];
}

function Accordion({ items }: AccordionProps) {
  const [openItems, setOpenItems] = useState<Set<string>>(
    new Set([items[0]?.id])
  );

  const toggleItem = (id: string) => {
    setOpenItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <div
      className="border border-card flex flex-col text-content-subdued transition duration-200 justify-between bg-surface shadow-card sm:rounded-card block-accordion"
      dir="rtl"
    >
      <div className="flex-1 px-4 py-5 sm:p-6">
        <div className="space-y-1 -ms-2 -me-2">
          {items.map((item) => {
            const isOpen = openItems.has(item.id);
            return (
              <div key={item.id} className="space-y-1 -ms-2 -me-2">
                <button
                  className="text-content bg-surface hover:bg-surface-hovered hover:text-content-hovered group w-full flex items-center text-start rounded-base focus:outline-none focus-visible:ring ring-inset ring-offset-0 font-medium py-2 px-2 text-md"
                  type="button"
                  onClick={() => toggleItem(item.id)}
                  aria-expanded={isOpen}
                  dir="rtl"
                >
                  <span className="flex-grow truncate text-right">
                    {item.title}
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-5 w-5 transform transition-all ease-in-out duration-150 flex-shrink-0 me-2 group-hover:text-content-hovered shrink-0 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    width="1em"
                    height="1em"
                    aria-hidden="true"
                    focusable="false"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>
                {isOpen && (
                  <div
                    className="w-full flex items-start text-start rounded-base focus:outline-none focus-visible:ring py-2 px-2"
                    dir="rtl"
                  >
                    <div className="flex-1 min-w-0 text-content-subdued">
                      <article className="prose prose-sm max-w-none" dir="rtl">
                        <figure className="ignore-typography overflow-hidden box-border !m-0 !mb-4 relative max-w-full rounded-base screen-rounded-none [&_img]:!rounded-base [&_img]:!screen-rounded-none table table-fixed text-center [&_img]:!inline-block fig-floated fig-left sm:!float-left sm:!mr-4 sm:!mb-4">
                          <div className="rounded-base flex items-center justify-center ignore-typography">
                            <img
                              src={item.imageUrl}
                              alt={item.title}
                              className="cursor-pointer rounded-base max-w-full sm:max-w-[200px] md:max-w-[250px] w-auto h-auto"
                            />
                          </div>
                        </figure>
                        <p className="text-justify leading-relaxed text-right">
                          {item.content}
                        </p>
                      </article>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

interface BannerSectionProps {
  imageUrl?: string;
  overlayImageUrl?: string;
  overlayColor?: string;
  textColor?: string;
  padding?: {
    mobile?: string;
    tablet?: string;
    desktop?: string;
  };
  children: React.ReactNode;
}

function BannerSection({
  imageUrl,
  overlayImageUrl,
  overlayColor = "rgba(255, 255, 255, 0)",
  textColor = "text-black",
  padding = {
    mobile: "py-[2rem]",
    tablet: "@3xl:py-[3rem]",
    desktop: "@5xl:py-[4rem]",
  },
  children,
}: BannerSectionProps) {
  return (
    <div className="@container block-space-header">
      <div className="relative overflow-hidden screen-rounded-none screen-border-x-0 shadow-card border-base border-card rounded-base">
        <div
          className={`w-full flex justify-between items-center relative inset-0 z-10 gap-3 flex-wrap text-content-on-background px-6 @3xl:px-10 @5xl:px-16 ${padding.mobile} ${padding.tablet} ${padding.desktop} ${textColor}`}
        >
          <div className="flex items-center relative inset-0 z-10 gap-4 flex-wrap flex-1 max-w-full text-center items-center justify-center">
            {children}
          </div>
        </div>
        {imageUrl && (
          <div className="w-full h-full absolute inset-0 z-0">
            <img
              src={imageUrl}
              alt=""
              className="w-full h-full object-cover object-center"
            />
            <div
              className="w-full h-full absolute inset-0"
              style={{ backgroundColor: overlayColor }}
            ></div>
          </div>
        )}
        {overlayImageUrl && (
          <div className="w-full h-full absolute inset-0 z-0">
            <img
              src={overlayImageUrl}
              alt=""
              className="w-full h-full object-cover object-center"
            />
            <div
              className="w-full h-full absolute inset-0"
              style={{ backgroundColor: overlayColor }}
            ></div>
          </div>
        )}
      </div>
    </div>
  );
}

export function ContinuityManagementSection() {
  return (
    <section className="grid w-full grid-cols-1" dir="rtl">
      <div className="col-span-1 flex flex-col space-y-4">
        {/* Banner 1 - با تصویر لوگو */}
        <BannerSection
          imageUrl="https://tribe-s3-production.imgix.net/UizqfYGOBsKFhfduSI3ho?fit=max&w=2000&auto=compress,format"
          overlayColor="rgba(255, 255, 255, 0)"
          textColor="text-black"
          padding={{
            mobile: "py-[2rem]",
            tablet: "@3xl:py-[3rem]",
            desktop: "@5xl:py-[4rem]",
          }}
        >
          <div
            className="basis-full text-center items-center justify-center text-md opacity-95"
            dir="rtl"
          >
            <article className="prose" style={{ color: "inherit" }} dir="rtl">
              <figure className="ignore-typography overflow-hidden box-border !m-0 !mb-1 relative max-w-full rounded-base screen-rounded-none [&_img]:!rounded-base [&_img]:!screen-rounded-none fig-half !w-full [&_img]:!w-full sm:!w-1/2 [&.fig-floated]:sm:!w-[calc(50%_-_theme(spacing[0.5]))] fig-center !mx-auto next-[:not(figure)]:!mt-2 clear-both">
                <div className="rounded-base flex items-center justify-center ignore-typography">
                  <img
                    src="https://tribe-s3-production.imgix.net/HZbrholggE3H2ym8bgIic?auto=compress,format"
                    alt=""
                    className="cursor-pointer rounded-base w-full max-w-md mx-auto"
                  />
                </div>
              </figure>
            </article>
          </div>
        </BannerSection>

        {/* Banner 2 - با عنوان */}
        <BannerSection
          imageUrl="https://tribe-s3-production.imgix.net/HFde40HL2c6yjhLnX0vXl?fit=max&w=2000&auto=compress,format"
          overlayColor="rgba(255, 255, 255, 0)"
          textColor="text-black"
          padding={{
            mobile: "py-[2.5rem]",
            tablet: "@3xl:py-[4rem]",
            desktop: "@5xl:py-[6rem]",
          }}
        >
          <div
            className="basis-full text-center items-center justify-center flex items-center gap-1 flex-wrap font-bold"
            dir="rtl"
          >
            <h2 className="font-medium text-heading-md line-clamp-3 text-center">
              مدل مدیریت تداوم تکنوکراتیک ما
            </h2>
          </div>
        </BannerSection>

        {/* Banner 3 - با تصویر */}
        <BannerSection
          imageUrl="https://tribe-s3-production.imgix.net/HFde40HL2c6yjhLnX0vXl?fit=max&w=2000&auto=compress,format"
          overlayColor="rgba(0, 0, 0, 0)"
          textColor="text-white"
          padding={{
            mobile: "py-[1.5rem]",
            tablet: "@3xl:py-[2rem]",
            desktop: "@5xl:py-[2rem]",
          }}
        >
          <div
            className="basis-full text-center items-center justify-center text-md opacity-95"
            dir="rtl"
          >
            <article className="prose" style={{ color: "inherit" }} dir="rtl">
              <figure className="ignore-typography overflow-hidden box-border !m-0 !mb-1 relative max-w-full rounded-base screen-rounded-none [&_img]:!rounded-base [&_img]:!screen-rounded-none fig-half !w-full [&_img]:!w-full sm:!w-1/2 [&.fig-floated]:sm:!w-[calc(50%_-_theme(spacing[0.5]))] fig-center !mx-auto next-[:not(figure)]:!mt-2 clear-both">
                <div className="rounded-base flex items-center justify-center ignore-typography">
                  <img
                    src="https://tribe-s3-production.imgix.net/gYpLmdiY4gPFPn0Yy4mdu?auto=compress,format"
                    alt=""
                    className="cursor-pointer rounded-base w-full max-w-md mx-auto"
                  />
                </div>
              </figure>
            </article>
          </div>
        </BannerSection>

        {/* Accordion */}
        <Accordion items={accordionItems} />
      </div>
    </section>
  );
}
