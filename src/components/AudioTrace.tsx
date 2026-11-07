import React from 'react';
import {music} from '../audio/beat-grid';
import {clamp} from '../motion/choreography';
/** Actual RMS envelope from master PCM, moving 2.5-second window. */
export const AudioTrace:React.FC<{time:number;width:number;height:number;collapse?:number;reveal?:number}> = ({time,width,height,collapse=0,reveal=1}) => {
  const count=120;
  const cursor=Math.floor(time*music.waveformRate);
  return <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{overflow:'hidden',clipPath:`inset(0 ${(1-reveal)*100}% 0 0)`}}>
    {Array.from({length:count},(_,i)=>{
      const index=Math.max(0,Math.min(music.waveform.length-1,cursor+i-count/2));
      const a=music.waveform[index];
      const h=2+a*(height-8)*(1-clamp(collapse));
      return <line key={i} x1={(i+.5)*width/count} x2={(i+.5)*width/count} y1={(height-h)/2} y2={(height+h)/2} stroke="currentColor" strokeWidth={Math.max(2,width/240)} strokeLinecap="round"/>;
    })}
  </svg>;
};
