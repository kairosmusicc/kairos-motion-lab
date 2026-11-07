import { interpolate } from "remotion";
import { ease } from "./easing";
import { masterSpec } from "../audio/timeline";
export const frameAt = (seconds: number) =>
  Math.round(seconds * masterSpec.fps);
export const at = (
  frame: number,
  seconds: number,
  span: number,
  easing = ease.out,
) =>
  interpolate(frame, [frameAt(seconds), frameAt(seconds + span)], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing,
  });
export const mix = (a: number, b: number, t: number) => a + (b - a) * t;
/** Integer hash: stable across preview, parallel rendering and repeated exports. */
export const noise = (index: number, seed = 71) => {
  let n = Math.imul(index + seed, 0x45d9f3b);
  n = Math.imul(n ^ (n >>> 16), 0x45d9f3b);
  return ((n ^ (n >>> 16)) >>> 0) / 4294967295;
};
