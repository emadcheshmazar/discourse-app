import { ImageBackgroundCard } from "../ui/ImageBackgroundCard";

interface CardData {
  id: string;
  imageUrl: string;
  title?: string;
  onClick?: () => void;
}

interface HorizontalImageCardsSectionProps {
  cards?: CardData[];
  className?: string;
}

const defaultCards: CardData[] = [
  {
    id: "1",
    imageUrl:
      "https://tribe-s3-production.imgix.net/KfHxXXdZRyL3iSZNq7WNB?fit=max&w=1000&auto=compress,format",
  },
  {
    id: "2",
    imageUrl:
      "https://tribe-s3-production.imgix.net/UPPkTcS4CyjzuHj1dJTjz?fit=max&w=1000&auto=compress,format",
  },
  {
    id: "3",
    imageUrl:
      "https://tribe-s3-production.imgix.net/kC78lGFTWls7yj59Rxwqa?fit=max&w=1000&auto=compress,format",
  },
  {
    id: "4",
    imageUrl:
      "https://tribe-s3-production.imgix.net/wP75zOl1j9jMCccuUp3aS?fit=max&w=1000&auto=compress,format",
  },
  {
    id: "5",
    imageUrl:
      "https://tribe-s3-production.imgix.net/RW2S0luzTo8RtuVMyuHxw?fit=max&w=1000&auto=compress,format",
  },
  {
    id: "6",
    imageUrl:
      "https://tribe-s3-production.imgix.net/bvMdHV5r2tzBYi4So8Hq2?fit=max&w=1000&auto=compress,format",
  },
  {
    id: "7",
    imageUrl:
      "https://tribe-s3-production.imgix.net/B2pzawphN9QKLuCJ2p63U?fit=max&w=1000&auto=compress,format",
  },
  {
    id: "8",
    imageUrl:
      "https://tribe-s3-production.imgix.net/GjCWrNt964QgCtJDFnY24?fit=max&w=1000&auto=compress,format",
  },
  {
    id: "9",
    imageUrl:
      "https://tribe-s3-production.imgix.net/FaLMVCbw7zJ8rrX8mMtgs?fit=max&w=1000&auto=compress,format",
  },
  {
    id: "10",
    imageUrl:
      "https://tribe-s3-production.imgix.net/7Vd7bOQVUoZobaYE4XUMI?fit=max&w=1000&auto=compress,format",
  },
  {
    id: "11",
    imageUrl:
      "https://tribe-s3-production.imgix.net/rtIiORqJ5bKP2SH7Hd28L?fit=max&w=1000&auto=compress,format",
  },
  {
    id: "12",
    imageUrl:
      "https://tribe-s3-production.imgix.net/5r4GVywt7lkVv5uFdHX6X?fit=max&w=1000&auto=compress,format",
  },
];

export function HorizontalImageCardsSection({
  cards = defaultCards,
  className = "",
}: HorizontalImageCardsSectionProps) {
  return (
    <section className={`w-full ${className}`}>
      <div className="horizontal-cards-container">
        <div className="horizontal-cards-content">
          {cards.map((card) => (
            <div key={card.id} className="horizontal-card-item snap-start">
              <ImageBackgroundCard
                imageUrl={card.imageUrl}
                aspectRatio="square"
                blockId={card.id}
                onClick={card.onClick}
                roundedBottom={true}
                className="flex-shrink-0 sm:rounded-lg h-full transition-all ease-in-out duration-200 justify-start stretch"
              >
                {card.title && (
                  <div className="p-4 text-white">
                    <h3 className="text-heading-xs">{card.title}</h3>
                  </div>
                )}
              </ImageBackgroundCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
