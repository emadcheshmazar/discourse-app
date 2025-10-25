import { type ReactNode } from "react";

interface TabListProps {
  children: ReactNode;
  className?: string;
}

export function TabList({ children, className = "" }: TabListProps) {
  return (
    <div className={`tab-list-container ${className}`}>
      <div className="tab-list-content">{children}</div>
    </div>
  );
}
