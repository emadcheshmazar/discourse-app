import { ServiceCard } from "../ui/ServiceCard";
import { DateBannerSection } from "./DateBannerSection";

interface ServiceCardData {
  id: string;
  title: string;
  imageUrl: string;
  href?: string;
}

const defaultServices: ServiceCardData[] = [
  {
    id: "1",
    title: "خدمات تامین",
    imageUrl:
      "https://tribe-s3-production.imgix.net/VTwrstB1s6y4WwFUltVfe?fit=max&w=1000&auto=compress,format",
  },
  {
    id: "2",
    title: "برنامه‌ریزی تکنوکراتیک",
    imageUrl:
      "https://tribe-s3-production.imgix.net/Sn2POGAbkzjB8krbQWogw?fit=max&w=1000&auto=compress,format",
  },
  {
    id: "3",
    title: "خدمات طراحی",
    imageUrl:
      "https://tribe-s3-production.imgix.net/olYbGBNvc4fNSaivHO9V5?fit=max&w=1000&auto=compress,format",
  },
  {
    id: "4",
    title: "خدمات پیاده‌سازی",
    imageUrl:
      "https://tribe-s3-production.imgix.net/5maKw0cYV7HGIvKepgPbX?fit=max&w=1000&auto=compress,format",
  },
  {
    id: "5",
    title: "خدمات آموزشی",
    imageUrl:
      "https://tribe-s3-production.imgix.net/GfZPHzdfeevc2NCc9sqcQ?fit=max&w=1000&auto=compress,format",
  },
];

export function ServicesCardsSection() {
  return (
    <div className="space-y-3 sm:space-y-3.5 md:space-y-4 lg:space-y-5 mt-1">
      <div className="relative">
        <div
          className="overflow-hidden"
          style={{
            marginInline: "-12px -1px",
            paddingInline: "12px 1px",
          }}
        >
          <div
            className="flex items-stretch snap-x h-auto pt-1 pb-4 services-cards-container"
            style={{ transform: "translate3d(0px, 0px, 0px)" }}
          >
            {defaultServices.map((service) => (
              <div
                key={service.id}
                className="snap-start grow-0 shrink-0 min-w-0 flex"
                style={{ margin: 0, padding: 0 }}
              >
                <ServiceCard
                  title={service.title}
                  imageUrl={service.imageUrl}
                  href={service.href}
                />
              </div>
            ))}
          </div>
        </div>
        <DateBannerSection />
      </div>
    </div>
  );
}
