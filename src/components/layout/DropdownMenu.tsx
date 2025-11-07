import { useRef, useEffect } from "react";

export interface DropdownMenuItem {
  label: string;
  link: string;
}

interface DropdownMenuProps {
  items: DropdownMenuItem[];
  triggerLabel?: string;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}

export function DropdownMenu({
  items: _items, // eslint-disable-line @typescript-eslint/no-unused-vars
  triggerLabel = "منو",
  isOpen,
  onToggle,
  onClose,
}: DropdownMenuProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <div className="dropdown-menu-wrapper" ref={dropdownRef}>
      <div
        onClick={onToggle}
        className="dropdown-menu-trigger"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {triggerLabel}
        <svg
          className={`dropdown-arrow ${isOpen ? "dropdown-arrow-open" : ""}`}
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
  );
}
