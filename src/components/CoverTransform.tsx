import React from 'react';
import {staticFile} from 'remotion';
import {editorial as E,beats as B} from '../audio/beat-grid';
import {reveal as enter,range} from '../motion/choreography';
import {tokens as T} from '../design/tokens';
/** One genuine artwork: window strips → image band → type aperture → six cells. */
export const CoverTransform:React.FC<{time:number;width:number;height:number}> = ({time:t,width:w,height:h}) => {
  const type=enter(t,E.grid,.48)*(1-enter(t,B.puzzlePeak,.48));
  const cells=enter(t,B.puzzlePeak,.48);
  const band=enter(t,E.tile,.55);
  const gutter=range(t,[[E.engine,48],[B.puzzleTurn,16],[E.fold,2],[E.tile,28],[E.grid,10],[B.puzzlePeak,22]]);
  const travel=range(t,[[E.engine,110],[B.puzzleTurn,0],[E.tile,-60],[E.grid,0],[B.puzzlePeak,35]]);
  return <svg width={Math.max(w,1)} height={Math.max(h,1)} viewBox={`0 0 ${Math.max(w,1)} ${Math.max(h,1)}`} style={{position:'absolute',inset:0}}>
    <defs>
      <clipPath id="cover-strips">
        {Array.from({length:3},(_,i)=><rect key={i} x={i*w/3+gutter/2} y={16+(i%2?1:-1)*travel} width={Math.max(0,w/3-gutter)} height={Math.max(0,h-32)} />)}
      </clipPath>
      <clipPath id="cover-type">
        <text x={w/2} y={h*.57} textAnchor="middle" style={{fontFamily:T.font.display,fontWeight:750,fontSize:w*.232,letterSpacing:'-.07em'}}>KAIROS</text>
      </clipPath>
      <clipPath id="cover-cells">
        {Array.from({length:6},(_,i)=>{
          const col=i%3,row=Math.floor(i/3),inset=8+10*Math.abs(Math.sin(i+t*.7));
          return <rect key={i} x={col*w/3+inset} y={row*h/2+inset} width={Math.max(0,w/3-inset*2)} height={Math.max(0,h/2-inset*2)}/>;
        })}
      </clipPath>
    </defs>
    <g opacity={(1-type)*(1-cells)} clipPath="url(#cover-strips)">
      <image href={staticFile('assets/images/kairos-cover.jpg')} x={-w*.1} y={-h*.06} width={w*1.2} height={h*1.12} preserveAspectRatio="xMidYMid slice"/>
      <rect x={0} y={h*.48} width={w} height={Math.max(0,48*(1-band))} fill={T.color.ink}/>
    </g>
    <g opacity={type}>
      <text x={w/2} y={h*.57} textAnchor="middle" fill="none" stroke={T.color.bone} strokeWidth={1.5} style={{fontFamily:T.font.display,fontWeight:750,fontSize:w*.232,letterSpacing:'-.07em'}}>KAIROS</text>
      <g clipPath="url(#cover-type)"><image href={staticFile('assets/images/kairos-cover.jpg')} x={0} y={-h*.12} width={w} height={h*1.3} preserveAspectRatio="xMidYMid slice"/></g>
      <path d={`M24 ${h*.68} H${24+(w-48)*enter(t,E.grid,.9)}`} stroke={T.color.accent} strokeWidth={3}/>
    </g>
    <g opacity={cells} clipPath="url(#cover-cells)"><image href={staticFile('assets/images/kairos-cover.jpg')} x={0} y={0} width={w} height={h} preserveAspectRatio="xMidYMid slice"/></g>
  </svg>;
};
