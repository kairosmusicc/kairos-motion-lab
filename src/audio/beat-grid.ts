import grid from '../../design/beat-grid.json';
/** Measured master events. Edit analysis, not independent component clocks. */
export const music = grid;
export const beats = grid.events;
export const v2Spec = {width: 1080, height: 1920, fps: 30, duration: grid.finalCut, frames: grid.frames};
export const editorial = {
  filmIn: grid.beats[2],
  avaitIn: grid.beats[6],
  bracketIn: grid.beats[9],
  firstReveal: beats.firstReveal,
  cardOpen: beats.firstReveal + .8,
  traceIn: beats.firstReveal + 1.8,
  coverIn: beats.systemOpen,
  dateIn: beats.systemOpen + 1.25,
  lockIn: beats.systemOpen + 2.35,
  personIn: beats.destabilize,
  remainderIn: beats.destabilize + 1.35,
  engine: beats.puzzleStart,
  fold: beats.puzzleFold,
  tile: grid.transients.find(t => Math.abs(t.time - 29.433) < .05)!.time,
  grid: grid.transients.find(t => Math.abs(t.time - 31.838) < .05)!.time,
  converge: beats.compression,
  question: beats.finalSnap + .12,
  domain: beats.collapse,
};
export const boardTimes = [.9,3.8,6.85,10.8,14.6,17.8,20.8,24.5,26.8,28.6,31.9,34.1,36.3,39.2,41.5,42.65,43.3,44.35];
