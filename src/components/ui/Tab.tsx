import { type ReactNode } from "react";

interface TabProps {
  id: string;
  label: string;
  isActive: boolean;
  onClick: (id: string) => void;
  children?: ReactNode;
}

export function Tab({ id, label, isActive, onClick }: TabProps) {
  return (
    <button
      onClick={() => onClick(id)}
      className={`tab-button ${isActive ? "tab-button-active" : ""}`}
    >
      {label}
    </button>
  );
}
