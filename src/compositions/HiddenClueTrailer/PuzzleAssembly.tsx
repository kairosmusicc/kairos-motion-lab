import React from "react";
import { ImageCrop } from "../../components/ImageCrop";
import { Waveform } from "../../components/Waveform";
import { Redaction } from "../../components/Redaction";
import { Lock } from "../../components/Lock";
import { at, mix } from "../../motion/timing";
import { beats, cues, durations } from "../../audio/timeline";
import { ease } from "../../motion/easing";
export const PuzzleAssembly: React.FC<{ frame: number; suspense: number }> = ({
  frame,
  suspense,
}) => {
  const assemble = at(frame, cues.puzzleGather, durations.gather),
    cross = at(frame, cues.slashCross, durations.slashCross, ease.inOut);
  const redact = at(frame, cues.nearReveal, durations.redactionSweep),
    wipe = at(frame, cues.obstruction, durations.obstruction, ease.in);
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        opacity: at(frame, beats.secondImpact, durations.puzzleIn),
      }}
    >
      <div
        className="micro"
        style={{
          position: "absolute",
          left: 88,
          top: 338,
          color: "var(--muted)",
        }}
      >
        RECONSTITUTION / INCOMPLÈTE
      </div>
      <div
        style={{
          position: "absolute",
          left: mix(84, 647, assemble),
          top: mix(478, 909, assemble),
          fontSize: 210,
          fontFamily: "Editorial",
          lineHeight: 1,
          letterSpacing: "-.06em",
          transform: `rotate(${mix(0, -2, assemble)}deg)`,
        }}
      >
        29
      </div>
      <div
        style={{
          position: "absolute",
          left: mix(737, 143, assemble),
          top: mix(1350, 624, assemble),
          fontSize: 210,
          fontFamily: "Editorial",
          lineHeight: 1,
          letterSpacing: "-.06em",
        }}
      >
        10
      </div>
      <div
        style={{
          position: "absolute",
          left: mix(466, 458, assemble),
          top: mix(421, 464, assemble),
          transform: `rotate(${mix(1.5, -2, assemble)}deg)`,
        }}
      >
        <ImageCrop
          src="assets/images/kairos-cover.jpg"
          width={510}
          height={380}
          zoom={mix(1.1, 1.75, assemble)}
          panY={-55}
          style={{ clipPath: `inset(${assemble * 9}% 0 ${assemble * 42}% 0)` }}
        />
      </div>
      <svg
        viewBox="0 0 1080 1920"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
        }}
      >
        <path
          d={`M${mix(1130, 850, cross)} 420 L${mix(650, 276, cross)} 1260`}
          stroke="var(--accent)"
          strokeWidth={5}
        />
        <path
          d="M285 865V1310H693V1140"
          fill="none"
          stroke="#56574f"
          strokeWidth={2}
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={1 - assemble}
        />
        <circle cx={285} cy={865} r={8} fill="var(--accent)" />
      </svg>
      <div
        style={{
          position: "absolute",
          left: 484,
          top: 1065,
          color: "var(--paper)",
          transform: `translateY(${(1 - assemble) * 110}px)`,
        }}
      >
        <Lock
          size={104}
          closed={at(frame, cues.lockClose, durations.lockClose)}
        />
      </div>
      <div
        style={{
          position: "absolute",
          left: 91,
          top: 1295,
          color: "var(--paper)",
        }}
      >
        <Waveform
          width={600}
          height={130}
          collapse={at(frame, cues.lockClose, durations.waveFlatten)}
          reveal={assemble}
        />
      </div>
      <div
        className="micro"
        style={{
          position: "absolute",
          left: 93,
          top: 1480,
          color: "var(--muted)",
        }}
      >
        ON Y ÉTAIT PRESQUE.
      </div>
      <Redaction
        progress={redact}
        x={80}
        y={887}
        width={940}
        height={154 + suspense * 20}
        rotate={-2}
        label="ACCÈS INCOMPLET"
      />
      <div
        style={{
          position: "absolute",
          left: mix(1150, -90, wipe),
          top: 210,
          width: 1250,
          height: 1470,
          background: "var(--paper)",
          transform: "rotate(-7deg)",
          boxShadow: "-25px 0 70px #0008",
          opacity: wipe > 0 ? 1 : 0,
        }}
      >
        <div
          style={{
            background: "var(--ink)",
            width: "100%",
            height: 60,
            marginTop: 118,
          }}
        />
      </div>
    </div>
  );
};
