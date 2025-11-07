import React from "react";
import "./TrapezoidBackground.css";

interface TrapezoidBackgroundProps {
  children?: React.ReactNode;
  className?: string;
}

export function TrapezoidBackground({
  children,
  className = "",
}: TrapezoidBackgroundProps) {
  return (
    <div className={`trapezoid-background-container ${className}`}>
      <div className="trapezoid-background-shape"></div>
      <div className="trapezoid-background-content">{children}</div>
    </div>
  );
}
