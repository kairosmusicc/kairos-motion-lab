import { at } from "./timing";
import { durations } from "../audio/timeline";
/** A clipped editorial reveal, no cartoon bounce. */
export const reveal = (frame: number, onset: number) => {
  const p = at(frame, onset, durations.cardReveal);
  return {
    opacity: p,
    transform: `translateY(${(1 - p) * 92}px)`,
    clipPath: `inset(0 0 ${(1 - p) * 100}% 0)`,
  };
};
