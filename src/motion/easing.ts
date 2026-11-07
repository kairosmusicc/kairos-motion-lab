import { Easing } from "remotion";
export const ease = {
  out: Easing.bezier(0.16, 1, 0.3, 1),
  inOut: Easing.bezier(0.76, 0, 0.24, 1),
  in: Easing.bezier(0.7, 0, 0.84, 0),
};
