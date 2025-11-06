import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="header-base">
      <div className="w-full flex justify-start items-center h-12 px-4 gap-6">
        <Link
          className="cursor-pointer rounded-none transition duration-200 focus:outline-none focus-visible:ring block logo max-w-[var(--c-header-logo-max-width)]"
          to="/"
        >
          <div className="block sm:hidden">
            <img
              src="https://tribe-s3-production.imgix.net/E8FUyEM6nWOZ28vynEVXb?fit=max&w=2000&auto=compress,format"
              alt="ALIASYS"
              className="inline-block object-contain square-logo-image shrink-0 h-[2rem] w-[2rem]"
              width="2rem"
              height="2rem"
            />
          </div>
          <div className="hidden sm:block">
            <div className="block logo-image">
              <img
                className="object-contain max-h-[var(--c-header-logo-max-height)]"
                width="49"
                height="40"
                src="https://tribe-s3-production.imgix.net/OGJT0dRKs2Kr7Wq6RGOQ1?fit=max&w=2000&auto=compress,format"
                alt="ALIASYS"
              />
            </div>
          </div>
        </Link>
        <Link
          to="/aliasys-explore"
          className="text-[#fff] font-bold text-center no-underline hover:opacity-80 transition-opacity"
        >
          آلیاس اکسپلور
        </Link>
      </div>
    </header>
  );
}
