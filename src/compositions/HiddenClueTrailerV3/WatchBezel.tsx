import React from 'react';
import {Img,staticFile} from 'remotion';
import {reveal as enter} from '../../motion/choreography';
/** Provided Guess photograph, cropped to its outer metal/markers only.
 * Calendar, branding and hand reading are inside the transparent aperture;
 * reference-product values are never presented as film evidence.
 */
export const WatchBezel:React.FC<{time:number;start:number;release:number;cx:number;cy:number;radius:number;strength?:number}> = ({time,start,release,cx,cy,radius:r,strength=.85})=>{
 const build=enter(time,start,.48),open=enter(time,release,.6);
 const opacity=build*(1-open)*strength;
 if(opacity<=0)return null;
 const d=r*2,scale=d/660;
 const mask=`radial-gradient(circle at center,transparent ${r*.88}px,#000 ${r*.88+1}px,#000 ${r*.985}px,transparent ${r*.985+1}px)`;
 return <div style={{position:'absolute',inset:0,pointerEvents:'none',opacity}}>
  {[0,1,2,3].map(i=>{
   const angle=(-45+i*90)*Math.PI/180;
   const offset=(1-build)*70+open*300;
   const polygons=['polygon(50% 0,100% 0,100% 50%,50% 50%)','polygon(50% 50%,100% 50%,100% 100%,50% 100%)','polygon(0 50%,50% 50%,50% 100%,0 100%)','polygon(0 0,50% 0,50% 50%,0 50%)'];
   return <div key={i} style={{position:'absolute',left:cx-r+Math.cos(angle)*offset,top:cy-r+Math.sin(angle)*offset,width:d,height:d,clipPath:polygons[i],transform:`rotate(${((1-build)*-3+open*4)*(i%2?1:-1)}deg)`,maskImage:mask,WebkitMaskImage:mask,filter:'saturate(.55) brightness(.94)'}}>
    <Img src={staticFile('assets/references/watch-guess.webp')} style={{position:'absolute',width:1080*scale,height:1437*scale,left:-210*scale,top:-376*scale,maxWidth:'none'}}/>
   </div>;
  })}
 </div>;
};
