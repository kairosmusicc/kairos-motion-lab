import React from "react";
import { Composition } from "remotion";
import { HiddenClueTrailer } from "./compositions/HiddenClueTrailer/HiddenClueTrailer";
import { hiddenClueSchema, variants } from "./experiments/hooks";
import { beats, masterSpec } from "./audio/timeline";
import "./styles.css";
export const RemotionRoot: React.FC = () => (
  <Composition
    id="HiddenClueTrailer"
    component={HiddenClueTrailer}
    schema={hiddenClueSchema}
    defaultProps={variants.v1}
    fps={masterSpec.fps}
    width={masterSpec.width}
    height={masterSpec.height}
    durationInFrames={Math.round(beats.end * masterSpec.fps)}
  />
);
