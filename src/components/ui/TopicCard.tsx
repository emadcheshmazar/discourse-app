import type { DiscourseTopic } from "../../types/discourse";

interface TopicCardProps {
  topic: DiscourseTopic;
  onClick?: (topic: DiscourseTopic) => void;
}

export function TopicCard({ topic, onClick }: TopicCardProps) {
  return (
    <li
      className="border border-card flex flex-col text-content-subdued transition duration-200 justify-between bg-surface shadow-card sm:rounded-card cursor-pointer hover:shadow-card-hovered transition-all ease-in-out duration-200 justify-start stretch"
      onClick={() => onClick?.(topic)}
    >
      <div className="flex-1 px-2 py-2 flex flex-col gap-1">
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-4">
            <div className="text-content text-sm mt-0 min-w-0 break-words">
              {topic.title}
            </div>
          </div>
        </div>
        <div className="grow-0 shrink-0">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex space-s-2 text-content-subdued items-center empty:hidden text-sm">
              <svg
                className="shrink-0 h-[1.25em] w-[1.25em]"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              <span>{topic.like_count || 0}</span>
            </div>
            <div className="flex space-s-2 text-content-subdued items-center text-sm">
              <svg
                className="h-[1.25em] w-[1.25em] shrink-0"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              <span>{topic.posts_count || 0}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="overflow-hidden -mx-[1px] empty:hidden sm:rounded-b-card -mb-[1px] border-b-1">
        <div className="w-full relative aspect-video">
          <div
            className="w-full h-full bg-cover bg-center absolute top-0 start-0"
            style={{
              backgroundImage: `url("${
                (topic as unknown as { image_url: string }).image_url ||
                "https://via.placeholder.com/400x225/2d4e6e/ffffff?text=No+Image"
              }")`,
            }}
          ></div>
        </div>
      </div>
    </li>
  );
}
