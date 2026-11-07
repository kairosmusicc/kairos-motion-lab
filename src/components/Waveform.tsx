import React from "react";
import { noise } from "../motion/timing";
/** Graphical placeholder, explicitly not analysis of the missing master. */
export const Waveform: React.FC<{
  width?: number;
  height?: number;
  collapse?: number;
  reveal?: number;
  phase?: number;
}> = ({ width = 580, height = 115, collapse = 0, reveal = 1, phase = 0 }) => (
  <svg
    width={width}
    height={height}
    viewBox={`0 0 ${width} ${height}`}
    style={{
      overflow: "hidden",
      clipPath: `inset(0 ${(1 - reveal) * 100}% 0 0)`,
    }}
  >
    {Array.from({ length: 90 }, (_, i) => {
      const envelope = Math.sin((i / 89) * Math.PI) * (0.3 + noise(i) * 0.7);
      const h =
        2 +
        envelope *
          (height - 8) *
          (1 - collapse) *
          (0.84 + 0.16 * Math.sin(phase + i * 0.21));
      return (
        <line
          key={i}
          x1={(i * width) / 90 + 2}
          x2={(i * width) / 90 + 2}
          y1={(height - h) / 2}
          y2={(height + h) / 2}
          stroke="currentColor"
          strokeWidth={3}
        />
      );
    })}
  </svg>
);
