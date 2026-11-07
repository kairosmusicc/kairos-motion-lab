import React from 'react';
import {tokens as T} from '../design/tokens';
/** The same edge can be a rule, a crop, an archive or a boundary. */
export const MorphFrame:React.FC<{x:number;y:number;width:number;height:number;opacity?:number;weight?:number;children?:React.ReactNode}> = ({x,y,width,height,opacity=1,weight=2,children}) => (
  <div style={{position:'absolute',left:x,top:y,width,height,opacity,border:`${weight}px solid ${T.color.bone}`,borderRadius:T.radius.frame}}>
    <div style={{position:'absolute',inset:0,overflow:'hidden'}}>{children}</div>
    {[[-1,-1],[1,-1],[-1,1],[1,1]].map(([a,b],i)=><div key={i} style={{position:'absolute',width:16,height:16,left:a<0?-7:undefined,right:a>0?-7:undefined,top:b<0?-7:undefined,bottom:b>0?-7:undefined,borderLeft:a<0?`2px solid ${T.color.accent}`:undefined,borderRight:a>0?`2px solid ${T.color.accent}`:undefined,borderTop:b<0?`2px solid ${T.color.accent}`:undefined,borderBottom:b>0?`2px solid ${T.color.accent}`:undefined}}/>)}
  </div>
);
