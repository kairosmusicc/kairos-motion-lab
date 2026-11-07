import React from "react";
export const ConnectorLine: React.FC<{
  from: [number, number];
  to: [number, number];
  progress: number;
  color?: string;
}> = ({ from, to, progress, color = "var(--accent)" }) => (
  <svg
    viewBox="0 0 1080 1920"
    style={{
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      pointerEvents: "none",
    }}
  >
    <path
      d={`M${from[0]} ${from[1]} H${(from[0] + to[0]) / 2} V${to[1]} H${to[0]}`}
      pathLength={1}
      stroke={color}
      fill="none"
      strokeWidth={2}
      strokeDasharray={1}
      strokeDashoffset={1 - progress}
    />
    <circle cx={to[0]} cy={to[1]} r={5} fill={color} opacity={progress} />
  </svg>
);
