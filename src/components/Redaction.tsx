import React from "react";
export const Redaction: React.FC<{
  progress: number;
  x: number;
  y: number;
  width: number;
  height: number;
  rotate?: number;
  label?: string;
}> = ({ progress, x, y, width, height, rotate = 0, label }) => (
  <div
    style={{
      position: "absolute",
      left: x,
      top: y,
      width,
      height,
      background: "#080908",
      transform: `rotate(${rotate}deg) scaleX(${progress})`,
      transformOrigin: "left center",
      border: "1px solid #4c4c43",
      zIndex: 12,
    }}
  >
    {label && (
      <span
        className="micro"
        style={{ position: "absolute", top: -32, color: "var(--accent)" }}
      >
        {label}
      </span>
    )}
  </div>
);
