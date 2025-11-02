export function PostsSection() {
  // Editable post data - you can easily modify these
  const posts = [
    {
      id: 1,
      title:
        "تداوم کسب‌وکار در مراکز داده – ضرورتی راهبردی برای سازمان‌های آینده‌نگر",
      date: "07/30/2025",
      link: "/technocratic-talks-hwaqgzms/post/business-continuity-in-data-centers---a-strategic-imperative-for-forward-Z06Ndyrzz7ZWMf4",
    },
    {
      id: 2,
      title: "تداوم به مثابه هارمونیِ طراحی‌شده",
      date: "05/28/2025",
      link: "/technocratic-talks-hwaqgzms/post/tech-talk-2-SzVujoO4Gwdr4ys",
    },
  ];

  return (
    <section className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-1 w-full">
        {/* Posts Section */}
        <div className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-1 w-full">
            {posts.map((post) => (
              <div
                key={post.id}
                className="border border-card flex flex-col text-content-subdued transition duration-200 justify-between bg-surface shadow-card cursor-pointer hover:shadow-card-hovered w-full"
                style={{ height: "200px" }}
              >
                <div className="flex-1 px-4 py-5 flex flex-col gap-4">
                  <div className="grow-0 shrink-0">
                    <div className="flex flex-col gap-4">
                      <a
                        className="cursor-pointer rounded-base transition duration-200 focus:outline-none focus-visible:ring basis-full break-words min-w-0 inline-block no-underline"
                        href={post.link}
                      >
                        <h2 className="font-medium text-heading-2xs text-content line-clamp-3 text-right">
                          {post.title}
                        </h2>
                      </a>
                      <div className="text-content text-sm mt-0 flex items-center">
                        <div className="text-content-subdued flex items-center gap-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 shrink-0"
                            width="16"
                            height="16"
                            fill="currentColor"
                            viewBox="0 0 16 16"
                          >
                            <path d="M3.5 0a.5.5 0 0 1 .5.5V1h6V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
                          </svg>
                          <span className="m-2">{post.date}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Static Welcome Section */}
        <div className="w-full">
          <div
            className="relative rounded-base overflow-hidden shadow-card border-base border-card w-full"
            style={{ backgroundColor: "#ffffff", height: "200px" }}
          >
            <div className="w-full h-full flex flex-col justify-center items-center text-center text-black px-6 py-6">
              <div className="font-semibold text-heading-2xs">به دنیای</div>
              <h2 className="font-bold text-heading-md">
                تداوم کسب‌وکار خوش آمدید
              </h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
