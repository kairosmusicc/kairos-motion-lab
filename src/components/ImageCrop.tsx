import React from "react";
import { Img, staticFile } from "remotion";
export const ImageCrop: React.FC<{
  src: string;
  width: number;
  height: number;
  zoom?: number;
  panX?: number;
  panY?: number;
  style?: React.CSSProperties;
}> = ({ src, width, height, zoom = 1, panX = 0, panY = 0, style }) => (
  <div style={{ width, height, overflow: "hidden", ...style }}>
    <Img
      src={staticFile(src)}
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
        transform: `translate(${panX}px,${panY}px) scale(${zoom})`,
      }}
    />
  </div>
);
