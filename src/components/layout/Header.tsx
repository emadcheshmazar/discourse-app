import { useState } from "react";
import { Link } from "react-router-dom";

const menuItems = [
  { label: "راه‌حل‌های دیتاسنتر", link: "/datacenter-solutions" },
  { label: "محصولات دیتاسنتر", link: "/datacenter-products" },
  { label: "خدمات تکنوکراتیک", link: "/technocratic-services" },
  { label: "SLA تداوم", link: "/continuity-sla" },
];

export function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setIsDropdownOpen(false);
  };

  return (
    <div className="header-wrapper">
      <header className="header-base">
        <div className="header-content">
          <div className="header-left">
            <Link to="/" onClick={closeMobileMenu}>
              <img
                src="/logo.avif"
                alt="ALIASYS"
                className="object-contain h-[40px] w-auto"
              />
            </Link>
            {/* Desktop Menu Items */}
            <Link
              to="/aliasys-explore"
              className="header-desktop-link text-[#fff] font-bold text-center no-underline hover:opacity-80 transition-opacity"
            >
              آلیاس اکسپلور
            </Link>
            <div className="dropdown-menu-wrapper header-desktop-link">
              <div
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="dropdown-menu-trigger"
              >
                پیشنهادات آلیاسیس
                <svg
                  className={`dropdown-arrow ${
                    isDropdownOpen ? "dropdown-arrow-open" : ""
                  }`}
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 6 L8 10 L12 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>
          {/* Desktop Login Icon */}
          <a
            href="https://aliasysdiscourse.ir/login"
            target="_blank"
            rel="noopener noreferrer"
            className="login-icon-link header-desktop-link"
            aria-label="ورود به حساب کاربری"
          >
            <svg
              className="login-icon"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle
                cx="12"
                cy="7"
                r="4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="mobile-menu-button"
            aria-label="منو"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isMobileMenuOpen ? (
                <path
                  d="M18 6L6 18M6 6l12 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              ) : (
                <path
                  d="M3 12h18M3 6h18M3 18h18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              )}
            </svg>
          </button>
        </div>
      </header>

      {/* Desktop Dropdown Menu */}
      {isDropdownOpen && (
        <>
          <div
            onClick={() => setIsDropdownOpen(false)}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 99,
            }}
          />
          <div className="dropdown-menu-box dropdown-fade-in">
            <div className="dropdown-menu-content">
              <div className="dropdown-menu-grid">
                {menuItems.map((item, index) => (
                  <Link
                    key={index}
                    to={item.link}
                    onClick={() => setIsDropdownOpen(false)}
                    className="dropdown-menu-item"
                  >
                    <h3 className="dropdown-menu-item-title">{item.label}</h3>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {/* Mobile Side Menu */}
      {isMobileMenuOpen && (
        <>
          <div className="mobile-menu-overlay" onClick={closeMobileMenu} />
          <div className="mobile-side-menu">
            <div className="mobile-menu-content">
              <Link
                to="/aliasys-explore"
                onClick={closeMobileMenu}
                className="mobile-menu-item"
              >
                آلیاس اکسپلور
              </Link>
              <div className="mobile-menu-section">
                <div className="mobile-menu-section-title">
                  پیشنهادات آلیاسیس
                </div>
                {menuItems.map((item, index) => (
                  <Link
                    key={index}
                    to={item.link}
                    onClick={closeMobileMenu}
                    className="mobile-menu-sub-item"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
              <a
                href="https://aliasysdiscourse.ir/login"
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMobileMenu}
                className="mobile-menu-item mobile-menu-login"
              >
                <svg
                  className="login-icon"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle
                    cx="12"
                    cy="7"
                    r="4"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                ورود به حساب کاربری
              </a>
              {/* Close Button */}
              <div
                onClick={closeMobileMenu}
                className="mobile-menu-close-button"
                aria-label="بستن منو"
              >
                بستن منو
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
