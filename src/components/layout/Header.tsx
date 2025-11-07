import { useState } from "react";
import { Link } from "react-router-dom";
import { DropdownMenu, type DropdownMenuItem } from "./DropdownMenu";

const menuItems: DropdownMenuItem[] = [
  { label: "راه‌حل‌های دیتاسنتر", link: "/datacenter-solutions" },
  { label: "محصولات دیتاسنتر", link: "/datacenter-products" },
  { label: "خدمات تکنوکراتیک", link: "/technocratic-services" },
  { label: "SLA تداوم", link: "/continuity-sla" },
];

export function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const toggleDropdown = () => {
    if (isDropdownOpen) {
      setIsClosing(true);
      setTimeout(() => {
        setIsDropdownOpen(false);
        setIsClosing(false);
      }, 200);
    } else {
      setIsDropdownOpen(true);
      setIsClosing(false);
    }
  };

  const closeDropdown = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsDropdownOpen(false);
      setIsClosing(false);
    }, 200);
  };

  return (
    <div className="header-wrapper">
      <header className="header-base">
        <div className="header-content">
          <div className="header-left">
            <Link to="/">
              <img
                src="/logo.avif"
                alt="ALIASYS"
                className="object-contain h-[40px] w-auto"
              />
            </Link>
            <Link
              to="/aliasys-explore"
              className="text-[#fff] font-bold text-center no-underline hover:opacity-80 transition-opacity"
            >
              آلیاس اکسپلور
            </Link>
            <DropdownMenu
              items={menuItems}
              triggerLabel="پیشنهادات آلیاسیس"
              isOpen={isDropdownOpen}
              onToggle={toggleDropdown}
              onClose={closeDropdown}
            />
          </div>
          <a
            href="https://aliasysdiscourse.ir/login"
            target="_blank"
            rel="noopener noreferrer"
            className="login-icon-link"
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
        </div>
      </header>
      {isDropdownOpen && (
        <div
          className={`dropdown-menu-box ${
            isClosing ? "dropdown-fade-out" : "dropdown-fade-in"
          }`}
        >
          <div className="dropdown-menu-content">
            <div className="dropdown-menu-grid">
              {menuItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.link}
                  onClick={closeDropdown}
                  className="dropdown-menu-item"
                >
                  <h3 className="dropdown-menu-item-title">{item.label}</h3>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
