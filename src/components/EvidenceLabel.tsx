import React from 'react';
import {tokens as T} from '../design/tokens';
export const EvidenceLabel:React.FC<{children:React.ReactNode;style?:React.CSSProperties;accent?:boolean}> = ({children,style,accent=false}) => <div style={{fontFamily:T.font.mono,fontSize:25,letterSpacing:'.07em',lineHeight:1.4,color:accent?T.color.accent:T.color.muted,...style}}>{children}</div>;
