import grid from '../../design/beat-grid.json';
const nearest=(time:number)=>grid.transients.reduce((a,b)=>Math.abs(a.time-time)<Math.abs(b.time-time)?a:b).time;
export const V3={fps:30,width:1080,height:1920,frames:1344,end:44.8};
export const cue={
 hook:0,hookImpact:grid.events.openingHit,second:grid.beats[5],
 watch:nearest(5.438),message:grid.events.systemOpen,journey:grid.events.falseResolution,
 train:grid.events.destabilize,recall:grid.events.unnoticed,split:grid.events.puzzleStart,
 rupture:grid.events.puzzleFold,slip:nearest(29.433),echo:nearest(31.838),
 cabinet:grid.events.puzzlePeak,face:grid.events.compression,return:grid.events.compressAgain,
 question:nearest(39.031),clear:grid.events.finalCluster,cta:grid.events.finalCompress,
 ctaDetail:grid.events.collapse,lastHit:grid.events.finalImpact,
};
export const v3Board=[.8,2,3.8,6.4,9.2,11.5,14.5,16.9,20.8,24.7,26.5,28.8,31.5,34.4,36.6,38.2,40.3,43.9];
export const reelUrl='https://www.instagram.com/reel/DfFiuwHIyyN/';
