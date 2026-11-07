import React from "react";
export const Lock: React.FC<{ closed?: number; size?: number }> = ({
  closed = 1,
  size = 64,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    stroke="currentColor"
    strokeWidth={3}
  >
    <path
      d={`M18 29 V${19 - closed * 4} C18 ${4 - closed * 4} 46 ${4 - closed * 4} 46 ${19 - closed * 4} V29`}
      strokeLinecap="round"
    />
    <rect x="12" y="28" width="40" height="30" rx="5" />
    <circle cx="32" cy="41" r="3" fill="currentColor" />
    <path d="M32 43v5" />
  </svg>
);
