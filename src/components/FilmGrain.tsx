import React from "react";
export const FilmGrain: React.FC<{ frame: number }> = ({ frame }) => (
  <svg
    width="1080"
    height="1920"
    style={{
      position: "absolute",
      inset: 0,
      opacity: 0.065,
      mixBlendMode: "soft-light",
      pointerEvents: "none",
    }}
  >
    <filter id="grain">
      <feTurbulence
        type="fractalNoise"
        baseFrequency=".72"
        numOctaves="2"
        stitchTiles="stitch"
        seed={11 + (Math.floor(frame / 2) % 47)}
      />
      <feColorMatrix type="saturate" values="0" />
    </filter>
    <rect width="100%" height="100%" filter="url(#grain)" />
  </svg>
);
