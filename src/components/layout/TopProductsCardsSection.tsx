import { ImageBackgroundCard } from "../ui/ImageBackgroundCard";
import { DateBannerSection } from "./DateBannerSection";

interface CardData {
  id: string;
  imageUrl: string;
}

const defaultCards: CardData[] = [
  {
    id: "1",
    imageUrl:
      "https://tribe-s3-production.imgix.net/ETyPqsNhiu4Y9fBzUjE9m?fit=max&w=1000&auto=compress,format",
  },
  {
    id: "2",
    imageUrl:
      "https://tribe-s3-production.imgix.net/0EgENEJgpkEaYjlrYpzYz?fit=max&w=1000&auto=compress,format",
  },
  {
    id: "3",
    imageUrl:
      "https://tribe-s3-production.imgix.net/wfKZ1bHUGvpZH7HEWUqLo?fit=max&w=1000&auto=compress,format",
  },
  {
    id: "4",
    imageUrl:
      "https://tribe-s3-production.imgix.net/BG3f2EtZY8moh7Q2iMPuR?fit=max&w=1000&auto=compress,format",
  },
  {
    id: "5",
    imageUrl:
      "https://tribe-s3-production.imgix.net/Jnt9a3AKjvmTCjHzfSCch?fit=max&w=1000&auto=compress,format",
  },
  {
    id: "6",
    imageUrl:
      "https://tribe-s3-production.imgix.net/fPua3UbteslqkVw9lOHMG?fit=max&w=1000&auto=compress,format",
  },
  {
    id: "7",
    imageUrl:
      "https://tribe-s3-production.imgix.net/MNXfwFu5Qmi1XQHPHFaM1?fit=max&w=1000&auto=compress,format",
  },
  {
    id: "8",
    imageUrl:
      "https://tribe-s3-production.imgix.net/KimcFvyg4cLGvx4YpD2hA?fit=max&w=1000&auto=compress,format",
  },
  {
    id: "9",
    imageUrl:
      "https://tribe-s3-production.imgix.net/QrJAH7I8DaUScA7xdB4iT?fit=max&w=1000&auto=compress,format",
  },
  {
    id: "10",
    imageUrl:
      "https://tribe-s3-production.imgix.net/ZpN6gGsS56IuRx9RIqdOz?fit=max&w=1000&auto=compress,format",
  },
  {
    id: "11",
    imageUrl:
      "https://tribe-s3-production.imgix.net/C7a8YDprtKPBGCYr1ld9n?fit=max&w=1000&auto=compress,format",
  },
  {
    id: "12",
    imageUrl:
      "https://tribe-s3-production.imgix.net/swmILmpUGTw98dLDmGuXo?fit=max&w=1000&auto=compress,format",
  },
];

export function TopProductsCardsSection() {
  return (
    <div className="relative mt-1">
      <div
        className="overflow-hidden"
        style={{
          marginInline: "-12px -1px",
          paddingInline: "12px 1px",
        }}
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
              <ImageBackgroundCard
                imageUrl={card.imageUrl}
                aspectRatio="square"
                blockId={card.id}
                roundedBottom={true}
                className="flex-shrink-0 sm:rounded-lg h-full transition-all ease-in-out duration-200 justify-start stretch cursor-pointer hover:shadow-card-hovered"
                style={{
                  maxWidth: "400px",
                  minWidth: "400px",
                  margin: 0,
                  padding: 0,
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Date Section */}
      <DateBannerSection />
    </div>
  );
}
