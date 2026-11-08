import React from 'react';
/** Abstract marks, never a fabricated clock reading. Perimeter becomes architectural rails. */
export const Dial:React.FC<{cx:number;cy:number;radius:number;open:number;straighten:number;opacity:number;rotation?:number}> = ({cx,cy,radius:r,open,straighten,opacity,rotation=0})=><svg viewBox="0 0 1080 1920" style={{position:'absolute',inset:0,width:'100%',height:'100%',pointerEvents:'none',opacity}}>
 <circle cx={cx} cy={cy} r={r} fill="none" stroke="#c8b18b" strokeWidth={2} pathLength={1} strokeDasharray="1" strokeDashoffset={1-open} transform={`rotate(${-90+rotation} ${cx} ${cy})`} opacity={1-straighten}/>
 {Array.from({length:48},(_,i)=>{
  const angle=(i/48*2*Math.PI)-Math.PI/2+rotation*Math.PI/180;
  const len=i%4===0?28:10;
  const x=cx+Math.cos(angle)*r,y=cy+Math.sin(angle)*r;
  const targetX=84+(i%24)/23*912,targetY=i<24?640:1420;
  return <line key={i} x1={x*(1-straighten)+targetX*straighten} y1={y*(1-straighten)+targetY*straighten} x2={(cx+Math.cos(angle)*(r-len))*(1-straighten)+targetX*straighten} y2={(cy+Math.sin(angle)*(r-len))*(1-straighten)+(targetY+(i<24?len:-len))*straighten} stroke={i%4?'#ddd8cc':'#c8b18b'} strokeWidth={i%4?1.3:2.4}/>
 })}
</svg>;
