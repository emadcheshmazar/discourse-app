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
      className={`px-4 py-2 rounded-t-lg font-medium transition-colors ${
        isActive
          ? "bg-blue-500 text-white"
          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
      }`}
    >
      {label}
    </button>
  );
}
