import React from "react";
import { Composition, Folder } from "remotion";
import { HiddenClueTrailer } from "./compositions/HiddenClueTrailer/HiddenClueTrailer";
import { hiddenClueSchema, variants } from "./experiments/hooks";
import { beats, masterSpec } from "./audio/timeline";
import "./styles.css";
import {HiddenClueTrailerV2} from "./compositions/HiddenClueTrailer/HiddenClueTrailerV2";
import {v2Spec} from "./audio/beat-grid";
import {HiddenClueTrailerV3,v3Schema} from "./compositions/HiddenClueTrailerV3/HiddenClueTrailerV3";
import {V3} from "./audio/v3-timeline";
export const RemotionRoot: React.FC = () => (
  <>
  <Composition id="HiddenClueTrailer-v3" component={HiddenClueTrailerV3} schema={v3Schema} defaultProps={{hookLine1:"LE FILM AVAIT UN INDICE.",hookLine2:"PERSONNE NE L'A REMARQUÉ.",finalQuestion:"TU CROIS AVOIR COMPRIS ?",cta:"REGARDE ENCORE.",variant:"v3",suspenseLevel:.75,destination:"https://www.instagram.com/reel/DfFiuwHIyyN/"}} fps={V3.fps} width={V3.width} height={V3.height} durationInFrames={V3.frames}/>

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
