import React from "react";
import { Composition, Folder } from "remotion";
import { HiddenClueTrailer } from "./compositions/HiddenClueTrailer/HiddenClueTrailer";
import { hiddenClueSchema, variants } from "./experiments/hooks";
import { beats, masterSpec } from "./audio/timeline";
import "./styles.css";
import {HiddenClueTrailerV2} from "./compositions/HiddenClueTrailer/HiddenClueTrailerV2";
import {v2Spec} from "./audio/beat-grid";
export const RemotionRoot: React.FC = () => (
  <>
  <Composition id="HiddenClueTrailer-v2" component={HiddenClueTrailerV2} schema={hiddenClueSchema} defaultProps={{
    hookLine1: "LE FILM AVAIT UN INDICE.",
    hookLine2: "PERSONNE NE L'A REMARQUÉ.",
    finalQuestion: "TU L'AS VU ?",
    cta: "kairosarchives.com",
    suspenseLevel: 0.8,
    variant: "v2",
    audioSrc: "assets/audio/tension-suspense.mp3",
    audioOffsetSeconds: 0,
    audioGain: 0.65,
  }} fps={v2Spec.fps} width={v2Spec.width} height={v2Spec.height} durationInFrames={v2Spec.frames}/>
  <Folder name="Prototype">
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
  </Folder>
  </>
);
