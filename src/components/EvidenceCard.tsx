import React from "react";
export const EvidenceCard: React.FC<{
  label: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ label, children, style }) => (
  <div
    style={{
      position: "absolute",
      border: "1px solid #69675c",
      background: "#171714",
      boxShadow: "0 12px 60px #0006",
      ...style,
    }}
  >
    <div
      className="micro"
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "16px 20px",
        borderBottom: "1px solid #46453e",
        color: "#bcb8a9",
      }}
    >
      <span>{label}</span>
      <span>↗</span>
    </div>
    {children}
  </div>
);
