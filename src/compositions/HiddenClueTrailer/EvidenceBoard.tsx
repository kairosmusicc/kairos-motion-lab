import React from "react";
import { Img, staticFile } from "remotion";
import { EvidenceCard } from "../../components/EvidenceCard";
import { ImageCrop } from "../../components/ImageCrop";
import { Waveform } from "../../components/Waveform";
import { ConnectorLine } from "../../components/ConnectorLine";
import { Redaction } from "../../components/Redaction";
import { Lock } from "../../components/Lock";
import { at, mix } from "../../motion/timing";
import { reveal } from "../../motion/transitions";
import { beats, cues, durations } from "../../audio/timeline";
export const EvidenceBoard: React.FC<{ frame: number; suspense: number }> = ({
  frame,
  suspense,
}) => {
  const date = at(frame, cues.dateIn, durations.cardReveal),
    cover = at(frame, cues.coverIn, durations.cardReveal);
  const hold = at(frame, beats.suspenseHold, durations.softIn),
    exit = at(frame, beats.secondImpact, durations.boardExit);
  const marker = at(frame, cues.markerIn, durations.markerDraw);
  return (
    <>
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: (1 - hold * 0.66) * (1 - exit),
          transform: `translateX(${-exit * 300}px)`,
        }}
      >
        <div
          className="micro"
          style={{
            position: "absolute",
            left: 88,
            top: 337,
            opacity: at(frame, cues.evidenceIn, durations.softIn),
            color: "var(--muted)",
          }}
        >
          FRAGMENTS / KAIROS
        </div>
        <div
          style={{
            position: "absolute",
            left: 84,
            top: 477,
            opacity: date,
            transform: `translate(${(1 - date) * -150}px,${(1 - date) * 90}px)`,
          }}
        >
          <div
            className="micro"
            style={{ color: "var(--muted)", marginBottom: 8 }}
          >
            DATE / SORTIE
          </div>
          <div
            style={{
              fontFamily: "Editorial",
              fontSize: 127,
              letterSpacing: "-.075em",
            }}
          >
            29<span style={{ color: "var(--accent)" }}>/</span>10
          </div>
          <div
            style={{
              height: 2,
              width: 300,
              background: "var(--accent)",
              transform: `scaleX(${date})`,
              transformOrigin: "left",
            }}
          />
        </div>
        <div
          style={{
            position: "absolute",
            left: 466,
            top: 421,
            transform: `translateY(${(1 - cover) * 260}px) rotate(${mix(-3, 1.5, cover)}deg)`,
            opacity: cover,
          }}
        >
          <ImageCrop
            src="assets/images/kairos-cover.jpg"
            width={510}
            height={620}
            zoom={1.04 + at(frame, cues.boardSettled, durations.scan) * 0.055}
            style={{ border: "1px solid #8d806b" }}
          />
          <div className="micro" style={{ paddingTop: 12 }}>
            KAIROS / EXTRAIT VISUEL
          </div>
          <span
            style={{
              position: "absolute",
              top: 12,
              left: 12,
              border: "1px solid #e7e2d5",
              width: 22,
              height: 22,
            }}
          />
        </div>
        <div
          style={{
            position: "absolute",
            left: 88,
            top: 822,
            color: "var(--paper)",
            opacity: at(frame, cues.lineIn, durations.labelIn),
          }}
        >
          <Waveform
            width={330}
            height={140}
            reveal={at(frame, cues.lineIn, durations.waveformDraw)}
            phase={frame * 0.025}
          />
          <div
            className="micro"
            style={{ color: "var(--muted)", marginTop: 14 }}
          >
            UN FICHIER. PAS UN HASARD.
          </div>
        </div>
        <ConnectorLine
          from={[242, 730]}
          to={[443, 1120]}
          progress={at(frame, cues.lineIn, durations.lineDraw)}
        />
        <EvidenceCard
          label="SUR CET IPHONE / FICHIERS"
          style={{
            left: 105,
            top: 1120,
            width: 738,
            ...reveal(frame, cues.fileIn),
          }}
        >
          <div
            style={{
              display: "flex",
              gap: 24,
              alignItems: "center",
              padding: "30px 26px",
            }}
          >
            <Img
              src={staticFile("assets/phone/files.png")}
              style={{ width: 66, height: 66, borderRadius: 15 }}
            />
            <div>
              <div
                style={{
                  fontFamily: "Evidence",
                  fontSize: 33,
                  letterSpacing: "-.04em",
                }}
              >
                ABEG_MASTER.wav
              </div>
              <div
                className="micro"
                style={{ color: "var(--muted)", fontSize: 17, marginTop: 9 }}
              >
                FICHIER VERROUILLÉ
              </div>
            </div>
            <div style={{ marginLeft: "auto", color: "var(--accent)" }}>
              <Lock size={49} />
            </div>
          </div>
        </EvidenceCard>
        <div
          style={{
            position: "absolute",
            left: 293,
            top: 1388,
            width: 653,
            ...reveal(frame, cues.messageIn),
          }}
        >
          <div
            className="micro"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 12,
            }}
          >
            <Img
              src={staticFile("assets/phone/messages.png")}
              style={{ width: 25, height: 25 }}
            />
            MESSAGES / PAAPII
          </div>
          <div
            style={{
              background: "var(--paper)",
              color: "var(--ink)",
              padding: "22px 28px",
              borderRadius: "25px 25px 25px 5px",
              fontSize: 38,
              fontFamily: "Evidence",
              letterSpacing: "-.045em",
            }}
          >
            « la date. »
          </div>
        </div>
        <Redaction
          progress={at(frame, cues.redactionIn, durations.interruption)}
          x={358}
          y={895}
          width={620}
          height={97}
          rotate={-1.5}
          label="DÉTAIL MASQUÉ"
        />
      </div>
      <svg
        viewBox="0 0 1080 1920"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          opacity: (1 - exit) * marker,
          color: "var(--accent)",
        }}
      >
        <circle
          cx={730}
          cy={588}
          r={74 + suspense * 6}
          fill="none"
          stroke="currentColor"
          strokeWidth={3}
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={1 - marker}
          transform="rotate(-78 730 588)"
        />
        <path
          d="M800 553l100-73h80"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
        />
      </svg>
      <div
        className="micro"
        style={{
          position: "absolute",
          left: 842,
          top: 438,
          opacity: marker * (1 - exit),
          color: "var(--accent)",
        }}
      >
        CE DÉTAIL.
      </div>
    </>
  );
};
