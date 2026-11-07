import React from "react";
import { at } from "../motion/timing";
import { durations } from "../audio/timeline";
type Props = {
  text: string;
  frame: number;
  onset: number;
  size?: number;
  width?: number;
  color?: string;
  outline?: boolean;
  style?: React.CSSProperties;
};
export const CinematicText: React.FC<Props> = ({
  text,
  frame,
  onset,
  size = 160,
  width = 920,
  color = "var(--paper)",
  outline = false,
  style,
}) => {
  const p = at(frame, onset, durations.titleReveal);
  const fit = Math.min(size, width / Math.max(text.length * 0.57, 1));
  return (
    <div style={{ overflow: "hidden", ...style }}>
      <div
        style={{
          fontFamily: "Editorial",
          fontWeight: 700,
          fontSize: fit,
          letterSpacing: "-0.055em",
          lineHeight: 1.05,
          whiteSpace: "nowrap",
          color: outline ? "transparent" : color,
          WebkitTextStroke: outline ? `2px ${color}` : undefined,
          transform: `translateY(${(1 - p) * 115}%)`,
          opacity: p,
        }}
      >
        {text}
      </div>
    </div>
  );
};
