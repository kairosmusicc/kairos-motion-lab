import React from "react";
import { CinematicText } from "./CinematicText";
import { at } from "../motion/timing";
import { cues, durations } from "../audio/timeline";
export const FinalCTA: React.FC<{
  frame: number;
  question: string;
  cta: string;
}> = ({ frame, question, cta }) => (
  <div
    style={{
      position: "absolute",
      inset: 0,
      background: "var(--ink)",
      padding: "0 84px",
    }}
  >
    <div
      className="micro"
      style={{ position: "absolute", top: 270, color: "var(--muted)" }}
    >
      KAIROS / MANII & PAAPII
    </div>
    <div style={{ position: "absolute", left: 84, top: 680, width: 912 }}>
      <CinematicText
        text={question}
        frame={frame}
        onset={cues.questionIn}
        size={170}
        width={912}
      />
      <div
        style={{
          width: 60,
          height: 5,
          background: "var(--accent)",
          marginTop: 38,
          transform: `scaleX(${at(frame, cues.questionIn, durations.softIn)})`,
          transformOrigin: "left",
        }}
      />
    </div>
    <div
      style={{
        position: "absolute",
        left: 86,
        top: 1120,
        fontFamily: "Evidence",
        fontSize: 38,
        letterSpacing: "-.045em",
        opacity: at(frame, cues.ctaIn, durations.ctaReveal),
        transform: `translateY(${(1 - at(frame, cues.ctaIn, durations.ctaReveal)) * 20}px)`,
      }}
    >
      {cta}
    </div>
  </div>
);
