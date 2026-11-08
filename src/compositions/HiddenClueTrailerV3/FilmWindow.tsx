import React from 'react';
import {Sequence,staticFile,useVideoConfig} from 'remotion';
import {Video} from '@remotion/media';
export type WindowPose={x:number;y:number;w:number;h:number;radius?:number;rotate?:number;opacity?:number;scale?:number;objectX?:number;blur?:number};
/** Keep video/geometry on the same clock; all picture audio is deliberately muted. */
export const FilmWindow:React.FC<{name:string;shot:string;start:number;end:number;pose:WindowPose;rate?:number;style?:React.CSSProperties}> = ({name,shot,start,end,pose:p,rate=.7,style})=>{
 const {fps}=useVideoConfig();
 return <Sequence name={name} from={Math.round(start*fps)} durationInFrames={Math.round((end-start)*fps)} layout="none">
  <div style={{position:'absolute',left:p.x,top:p.y,width:p.w,height:p.h,overflow:'hidden',borderRadius:p.radius??2,opacity:p.opacity??1,transform:`rotate(${p.rotate??0}deg)`,filter:p.blur?`blur(${p.blur}px)`:undefined,...style}}>
   <Video name={name} src={staticFile(`assets/film/v3/${shot}.mp4`)} muted playbackRate={rate} objectFit="cover" style={{width:'100%',height:'100%',objectPosition:`${p.objectX??50}% 45%`,transform:`scale(${p.scale??1})`}}/>
  </div>
 </Sequence>;
};
