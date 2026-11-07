import React, { useEffect, useState } from "react";
import {
  AbsoluteFill,
  Audio,
  cancelRender,
  continueRender,
  delayRender,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { beats, cues, masterSpec, durations } from "../../audio/timeline";
import { at, mix } from "../../motion/timing";
import { ease } from "../../motion/easing";
import { CinematicText } from "../../components/CinematicText";
import { FilmGrain } from "../../components/FilmGrain";
import { FinalCTA } from "../../components/FinalCTA";
import type { HiddenClueProps } from "../../experiments/hooks";
import { EvidenceBoard } from "./EvidenceBoard";
import { PuzzleAssembly } from "./PuzzleAssembly";

export const HiddenClueTrailer: React.FC<HiddenClueProps> = (props) => {
  const frame = useCurrentFrame();
  const [fontHandle] = useState(() => delayRender("Local editorial fonts"));
  useEffect(() => {
    Promise.all([
      document.fonts.load("700 40px Editorial"),
      document.fonts.load("400 20px Evidence"),
    ])
      .then(() => continueRender(fontHandle))
      .catch(cancelRender);
  }, [fontHandle]);
  const words = props.hookLine1.trim().split(/\s+/),
    tail = words.slice(-2).join(" "),
    lead = words.slice(0, -2).join(" ");
  const second = props.hookLine2.trim().split(/\s+/),
    first = second[0],
    remainder = second.slice(1).join(" ");
  const breakApart = at(frame, cues.hookBreak, durations.hookBreak, ease.inOut),
    hold = at(frame, beats.suspenseHold, durations.holdIn),
    puzzle = at(frame, beats.secondImpact, durations.softIn);
  return (
    <AbsoluteFill
      style={
        {
          "--ink": "#0b0c0a",
          "--paper": "#eeeadf",
          "--accent": "#d84a37",
          "--muted": "#929184",
          background: "#0b0c0a",
          color: "#eeeadf",
          overflow: "hidden",
        } as React.CSSProperties
      }
    >
      <style>{`@font-face{font-family:Editorial;src:url('${staticFile("assets/fonts/Editorial-Bold.ttf")}');font-weight:700;font-display:block}@font-face{font-family:Evidence;src:url('${staticFile("assets/fonts/Evidence-Mono.ttf")}');font-weight:400;font-display:block}`}</style>
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse at 70% 40%,#24251f66,transparent 64%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: "150px 66px 210px",
          borderLeft: "1px solid #41423855",
          borderRight: "1px solid #41423855",
          opacity: 0.6,
        }}
      />
      <div
        className="micro"
        style={{
          position: "absolute",
          left: 88,
          top: 164,
          color: "var(--muted)",
          display: "flex",
          alignItems: "center",
          gap: 19,
        }}
      >
        <span
          style={{
            width: 9,
            height: 9,
            background: "var(--accent)",
            display: "inline-block",
          }}
        />
        KAIROS / ARCHIVES
      </div>
      <div
        className="micro"
        style={{
          position: "absolute",
          right: 88,
          top: 164,
          color: "var(--muted)",
        }}
      >
        01—05
      </div>
      {frame < beats.suspenseHold * masterSpec.fps && (
        <>
          <div
            style={{
              position: "absolute",
              left: 85,
              top: 574,
              transform: `translate(${breakApart * -700}px,${breakApart * -320}px) rotate(${-breakApart * 3}deg)`,
              opacity: 1 - breakApart,
            }}
          >
            <CinematicText
              text={lead}
              frame={frame}
              onset={cues.firstTitle}
              size={91}
            />
          </div>
          <div
            style={{
              position: "absolute",
              left: 77,
              top: 705,
              transform: `translate(${breakApart * 680}px,${breakApart * 190}px)`,
              opacity: 1 - breakApart,
            }}
          >
            <CinematicText
              text={tail}
              frame={frame}
              onset={cues.clueTitle}
              size={185}
            />
          </div>
          <div
            style={{
              position: "absolute",
              left: 87,
              top: 944,
              width: mix(
                48,
                900,
                at(frame, cues.clueTitle, durations.titleReveal),
              ),
              height: 4,
              background: "var(--accent)",
              opacity: 1 - breakApart,
            }}
          />
          <div
            className="micro"
            style={{
              position: "absolute",
              left: 88,
              top: 1030,
              color: "var(--muted)",
              opacity:
                at(frame, cues.clueTitle, durations.softIn) * (1 - breakApart),
            }}
          >
            TOUT ÉTAIT DÉJÀ LÀ.
          </div>
        </>
      )}
      {frame >= beats.firstImpact * masterSpec.fps &&
        frame < beats.finalQuestion * masterSpec.fps && (
          <EvidenceBoard frame={frame} suspense={props.suspenseLevel} />
        )}
      {frame >= beats.suspenseHold * masterSpec.fps &&
        frame < beats.finalQuestion * masterSpec.fps && (
          <div
            style={{
              position: "absolute",
              left: 85,
              top: 790,
              width: 920,
              opacity: hold * (1 - puzzle),
              transform: `translateY(${-puzzle * 110}px)`,
            }}
          >
            <CinematicText
              text={first}
              frame={frame}
              onset={cues.nobodyTitle}
              size={168}
            />
            <CinematicText
              text={remainder}
              frame={frame}
              onset={cues.unnoticedTitle}
              size={86}
              style={{ marginTop: 17 }}
            />
            <div
              style={{
                width: 280,
                height: 4,
                background: "var(--accent)",
                marginTop: 30,
                transform: `scaleX(${at(frame, cues.unnoticedTitle, durations.ruleDraw)})`,
                transformOrigin: "left",
              }}
            />
          </div>
        )}
      {frame >= beats.secondImpact * masterSpec.fps &&
        frame < beats.finalQuestion * masterSpec.fps && (
          <PuzzleAssembly frame={frame} suspense={props.suspenseLevel} />
        )}
      {frame >= beats.finalQuestion * masterSpec.fps && (
        <FinalCTA
          frame={frame}
          question={props.finalQuestion}
          cta={props.cta}
        />
      )}
      <FilmGrain frame={frame} />
      {props.audioSrc && (
        <Audio
          src={staticFile(props.audioSrc)}
          startFrom={Math.round(props.audioOffsetSeconds * masterSpec.fps)}
          volume={(f) =>
            props.audioGain *
            (1 - at(f, cues.endFade, beats.end - cues.endFade))
          }
        />
      )}
    </AbsoluteFill>
  );
};
