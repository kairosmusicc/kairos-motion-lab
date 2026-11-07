/** Stateless interpolation; all inputs are musical seconds from the central grid. */
export const clamp = (v:number) => Math.max(0,Math.min(1,v));
export const smooth = (v:number) => {const x=clamp(v); return x*x*(3-2*x);};
export const arrest = (v:number) => 1-Math.pow(1-clamp(v),4);
export const progress = (t:number,start:number,duration=.6) => clamp((t-start)/duration);
export const reveal = (t:number,start:number,duration=.6) => arrest(progress(t,start,duration));
export const range = (t:number,points:readonly (readonly [number,number])[],mode:'smooth'|'arrest'|'linear'='smooth') => {
  if(t<=points[0][0]) return points[0][1];
  for(let i=1;i<points.length;i++) if(t<points[i][0]) {
    const p=progress(t,points[i-1][0],points[i][0]-points[i-1][0]);
    const e=mode==='smooth'?smooth(p):mode==='arrest'?arrest(p):p;
    return points[i-1][1]+(points[i][1]-points[i-1][1])*e;
  }
  return points[points.length-1][1];
};
/** Layout poses hold their space, then travel around an attack; no six-second drift through type. */
export const pose = (t:number,points:readonly (readonly [number,number])[],duration=.72) => {
  let value=points[0][1];
  for(let i=1;i<points.length;i++){
    const start=points[i][0]-.06;
    const finish=Math.min(start+duration,i+1<points.length?points[i+1][0]-.06:start+duration);
    if(t<start) return value;
    if(t<finish) return value+(points[i][1]-value)*smooth(progress(t,start,finish-start));
    value=points[i][1];
  }
  return value;
};
