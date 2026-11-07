import React from 'react';
import {AbsoluteFill,staticFile,useCurrentFrame,useVideoConfig} from 'remotion';
import {Audio} from '@remotion/media';
import {HiddenClueProps} from '../../experiments/hooks';
import {beats as B,editorial as E} from '../../audio/beat-grid';
import {tokens as T} from '../../design/tokens';
import {range as r,pose,reveal as enter,progress,clamp} from '../../motion/choreography';
import {MorphFrame} from '../../components/MorphFrame';
import {EvidenceLabel} from '../../components/EvidenceLabel';
import {AudioTrace} from '../../components/AudioTrace';
import {MaskedType} from '../../components/MaskedType';
import {ConnectorLine} from '../../components/ConnectorLine';
import {ImageCrop} from '../../components/ImageCrop';
import {Lock} from '../../components/Lock';
import {FilmGrain} from '../../components/FilmGrain';

/** One changing stage. Persistent frame/rule/date/cover objects inherit musical states. */
export const HiddenClueTrailerV2:React.FC<HiddenClueProps> = (props) => {
  const frame=useCurrentFrame();
  const {fps,durationInFrames}=useVideoConfig();
  const t=frame/fps;
  const end=1-enter(t,B.collapse,.2);
  const opening=1-enter(t,E.engine,.24);
  const camera=r(t,[[0,1],[B.falseResolution,1],[B.falseResolution+1,1.035],[E.personIn,1],[E.engine,1],[B.compression,1],[B.closeIn,1.065],[B.finalCluster,1.025],[B.finalCompress,1]]);
  // The same sliver continuously opens into the archive, crop and closing frame.
  const x=pose(t,[[0,84],[B.firstReveal,84],[B.firstReveal+.8,84],[B.systemOpen,84],[B.falseResolution,150],[E.personIn,490],[E.engine,84],[B.puzzleFold,280],[E.tile,84],[E.grid,84],[B.puzzlePeak,150],[B.compression,190],[B.closeIn,150],[B.finalCluster,84],[B.finalCompress,475],[B.finalSnap,520],[B.collapse,540]]);
  const y=pose(t,[[0,580],[E.avaitIn,650],[B.firstReveal,850],[B.firstReveal+.9,850],[B.systemOpen,780],[B.falseResolution,530],[E.personIn,1000],[E.engine,610],[B.puzzleFold,740],[E.tile,560],[E.grid,620],[B.puzzlePeak,490],[B.compression,430],[B.closeIn,360],[B.finalCluster,450],[B.finalCompress,620],[B.finalSnap,800],[B.collapse,960]]);
  const w=pose(t,[[0,6],[B.openingHit,6],[B.openingHit+.8,620],[E.bracketIn,780],[B.firstReveal,912],[B.systemOpen,912],[B.falseResolution,780],[E.personIn,490],[E.engine,912],[B.puzzleFold,520],[E.tile,912],[E.grid,912],[B.puzzlePeak,780],[B.compression,700],[B.closeIn,780],[B.finalCluster,912],[B.finalCompress,130],[B.finalSnap,40],[B.collapse,0]]);
  const h=pose(t,[[0,6],[B.firstReveal,6],[B.firstReveal+1,480],[B.systemOpen,680],[B.falseResolution,840],[E.personIn,510],[E.engine,720],[B.puzzleTurn,300],[B.puzzleFold,8],[E.tile,740],[E.grid,650],[B.puzzlePeak,870],[B.compression,950],[B.closeIn,1120],[B.finalCluster,920],[B.finalCompress,520],[B.finalSnap,90],[B.collapse,0]]);
  const contentOpen=enter(t,E.cardOpen,.8)*(1-enter(t,B.finalCompress,.3));
  const cropOn=r(t,[[0,0],[E.coverIn-.1,0],[E.coverIn+.6,1],[E.personIn,1],[E.engine,1],[B.puzzleTurn,0],[B.puzzleFold,0],[E.tile,1],[E.grid,1],[B.puzzlePeak,1],[B.compression,1],[B.finalCompress,0]]);
  const traceOn=enter(t,E.traceIn,.5)*end;
  const lineY=pose(t,[[0,580],[E.avaitIn,650],[B.firstReveal,810],[B.systemOpen,1400],[B.falseResolution,1420],[E.personIn,1590],[E.engine,1370],[B.puzzleFold,744],[E.tile,1380],[E.grid,1330],[B.puzzlePeak,1440],[B.compression,1480],[B.finalCluster,1460],[B.finalCompress,1130],[B.finalSnap,845],[B.collapse,960]]);
  const lineW=pose(t,[[0,0],[B.openingHit,0],[B.openingHit+.7,300],[B.firstReveal,840],[B.systemOpen,912],[E.personIn,912],[E.engine,800],[B.puzzleFold,520],[E.tile,912],[B.compression,700],[B.finalCompress,130],[B.finalSnap,40],[B.collapse,0]]);
  const hook=props.hookLine1.match(/^(.*?)\s+(UN INDICE\.)$/i);
  const hookLead=hook?hook[1]:props.hookLine1;
  const hookImpact=hook?hook[2]:'';
  const leadWords=hookLead.split(' ');
  const leadFirst=leadWords.slice(0,-1).join(' ');
  const leadLast=leadWords.slice(-1).join(' ');
  const second=props.hookLine2.split(' ');
  const secondFirst=second.shift() || '';
  const secondRest=second.join(' ');
  const hookExit=1-enter(t,B.systemOpen-.25,.6);
  const secondOn=enter(t,E.personIn,.7)*(1-enter(t,E.engine,.35));
  const intensity=.8+.2*props.suspenseLevel;
  return <AbsoluteFill style={{background:T.color.ink,color:T.color.bone,fontFamily:T.font.display,overflow:'hidden'}}>
    <style>{`@font-face{font-family:Geist;src:url('${staticFile('assets/fonts/Geist-Variable.woff2')}') format('woff2');font-weight:100 900;font-display:block}@font-face{font-family:Evidence;src:url('${staticFile('assets/fonts/Evidence-Mono.ttf')}') format('truetype');font-display:block}`}</style>
    {props.audioSrc && <Audio src={staticFile(props.audioSrc)} trimBefore={Math.round(props.audioOffsetSeconds*fps)} volume={(f)=>props.audioGain*Math.max(0,Math.min(1,f/2,(durationInFrames-.1-f)/.8))} />}
    <AbsoluteFill style={{transform:`scale(${camera})`,transformOrigin:'50% 50%',opacity:end}}>
      {/* Fixed editorial margins anchor the continuous spatial system. */}
      <div style={{position:'absolute',left:84,top:110,width:912,display:'flex',justifyContent:'space-between',alignItems:'baseline'}}>
        <div style={{fontSize:42,fontWeight:650,letterSpacing:'-.05em'}}>KAIROS</div>
        <EvidenceLabel style={{fontSize:22}}>ARCHIVES / ÉTUDE VISUELLE</EvidenceLabel>
      </div>
      <div style={{position:'absolute',left:84,top:192,width:912,height:1,background:T.color.border,transform:`scaleX(${enter(t,B.openingHit,.8)})`,transformOrigin:'left'}}/>
      <EvidenceLabel style={{position:'absolute',left:84,top:1690,fontSize:22}}>MANII & PAAPII</EvidenceLabel>
      <EvidenceLabel accent style={{position:'absolute',right:84,top:1690,fontSize:22}}>ACCÈS PARTIEL</EvidenceLabel>

      {/* Opening typography is cut by the same moving rule that opens the card. */}
      <div style={{position:'absolute',left:84,top:r(t,[[0,398],[B.firstReveal,370],[B.systemOpen,270]]),opacity:hookExit}}>
        <MaskedType text={leadFirst} progress={enter(t,E.filmIn,.8)} size={143} stagger />
        <MaskedType text={leadLast} progress={enter(t,E.avaitIn,.8)} size={143} stagger style={{marginTop:8}}/>
      </div>
      <div style={{position:'absolute',left:84,top:r(t,[[0,675],[B.firstReveal,675],[B.firstReveal+.7,650],[B.systemOpen,300]]),opacity:hookExit,transform:`translateX(${r(t,[[0,0],[B.firstReveal,0],[B.firstReveal+.3,-8],[B.firstReveal+.9,0]])}px)`}}>
        <MaskedType text={hookImpact} progress={enter(t,B.firstReveal,.55)} size={169} width={930} stagger />
        <div style={{position:'absolute',left:r(t,[[B.firstReveal,0],[B.firstReveal+.6,800],[B.firstReveal+1,930]]),top:0,width:48,height:180,background:T.color.ink,opacity:1-enter(t,B.firstReveal+1,.2)}}/>
      </div>
      <EvidenceLabel accent style={{position:'absolute',left:86,top:925,opacity:enter(t,E.bracketIn,.5)*(1-enter(t,B.firstReveal,.1))}}>UNE IMAGE. UN DÉTAIL.</EvidenceLabel>

      <MorphFrame x={x} y={y} width={w} height={h} opacity={intensity}>
        <div style={{position:'absolute',inset:0,background:T.color.ink,opacity:contentOpen}}>
          <div style={{height:92,padding:'20px 28px',borderBottom:`1px solid ${T.color.border}`,display:'flex',alignItems:'center',justifyContent:'space-between'}}>
            <span style={{fontSize:w<550?29:38,letterSpacing:'-.04em'}}>Fichiers</span>
            <EvidenceLabel accent style={{fontSize:20}}>ARCHIVES</EvidenceLabel>
          </div>
          {/* Genuine artwork; crop deliberately follows the artists, never circles a fake film clue. */}
          <div style={{position:'absolute',left:24,right:24,top:112,height:Math.max(0,h*.58-100),overflow:'hidden',opacity:cropOn}}>
            <ImageCrop src="assets/images/kairos-cover.jpg" width={Math.max(0,w-48)} height={Math.max(0,h*.58-100)} zoom={r(t,[[E.coverIn,1.3],[B.falseResolution,1.05],[E.personIn,1.1],[E.tile,1.35],[E.grid,1],[B.compression,1.13],[B.finalCluster,1.3]])} panY={r(t,[[E.coverIn,40],[B.falseResolution,0],[E.tile,-20],[B.compression,20]])}/>
            <div style={{position:'absolute',left:0,bottom:0,width:'100%',height:6,background:T.color.accent,transform:`scaleX(${enter(t,E.coverIn,.8)})`,transformOrigin:'left'}}/>
          </div>
          <div style={{position:'absolute',left:28,top:h*.63,width:Math.max(0,w-56),opacity:1-enter(t,B.puzzleTurn,.3)+enter(t,E.tile,.4)}}>
            <div style={{fontSize:w<550?30:44,fontWeight:560,letterSpacing:'-.05em',whiteSpace:'nowrap'}}>ABEG_MASTER.wav</div>
            <EvidenceLabel style={{fontSize:w<550?19:25,marginTop:8}}>FICHIER VERROUILLÉ</EvidenceLabel>
          </div>
          <div style={{position:'absolute',left:28,bottom:24,display:'flex',gap:16,alignItems:'center',opacity:enter(t,E.lockIn,.45)}}>
            <Lock size={w<550?36:48}/><EvidenceLabel style={{fontSize:w<550?18:23}}>CONTENU NON OUVERT</EvidenceLabel>
          </div>
        </div>
      </MorphFrame>

      {/* Live audio edge: same baseline, from waveform to indicator to underline. */}
      <div style={{position:'absolute',left:pose(t,[[0,84],[E.personIn,84],[B.puzzleFold,280],[E.tile,84],[B.compression,190],[B.finalCompress,475],[B.finalSnap,520]]),top:lineY-44,color:T.color.accent,opacity:traceOn}}>
        <AudioTrace time={t} width={Math.max(1,lineW)} height={88} reveal={enter(t,E.traceIn,.7)} collapse={r(t,[[0,0],[B.falseResolution,.2],[E.personIn,.8],[E.engine,0],[B.puzzleFold,1],[E.tile,.2],[E.grid,.55],[B.compression,.6],[B.finalCompress,1]])}/>
      </div>

      {/* Date is context, never transposed into a solved password. */}
      <div style={{position:'absolute',left:pose(t,[[0,84],[B.falseResolution,84],[E.personIn,84],[E.engine,84],[B.puzzleTurn,180],[B.puzzleFold,280],[E.tile,84],[E.grid,160],[B.puzzlePeak,84],[B.compression,220],[B.finalCluster,100],[B.finalCompress,400]]),top:pose(t,[[0,1480],[B.falseResolution,1440],[E.personIn,1170],[E.engine,400],[B.puzzleTurn,570],[B.puzzleFold,580],[E.tile,1380],[E.grid,1380],[B.puzzlePeak,1410],[B.compression,1480],[B.finalCluster,310],[B.finalCompress,600]]),opacity:enter(t,E.dateIn,.6)*(1-enter(t,B.compression,.3)+enter(t,B.finalCluster,.3))*(1-enter(t,B.finalCompress,.25))}}>
        <div style={{display:'flex',alignItems:'baseline',gap:pose(t,[[0,12],[E.engine,12],[B.puzzleTurn,70],[B.puzzleFold,12],[E.tile,20],[B.compression,12]]),fontSize:pose(t,[[0,110],[E.personIn,90],[E.engine,172],[B.puzzleFold,150],[E.tile,90],[E.grid,140],[B.compression,100],[B.finalCluster,152]]),fontWeight:550,letterSpacing:'-.08em',lineHeight:1,color:T.color.bone}}>
          <span>29</span><span style={{color:T.color.accent,transform:`rotate(${pose(t,[[0,0],[B.puzzleTurn,8],[B.puzzleFold,-7],[E.tile,0]])}deg)`}}>/</span><span>10</span>
        </div>
        <EvidenceLabel style={{fontSize:21,marginTop:14}}>DATE / SANS LÉGENDE</EvidenceLabel>
      </div>

      {/* Continuous line from card to date, mutating into a type rail. */}
      <div style={{opacity:enter(t,B.falseResolution,.7)*(1-enter(t,E.engine,.3))}}>
        <ConnectorLine from={[x+20,y+h-20]} to={[108,1510]} progress={enter(t,B.falseResolution,.8)} color={T.color.accent}/>
      </div>

      {/* Second headline grows out of the archive's left margin. */}
      <div style={{position:'absolute',left:84,top:400,opacity:1-enter(t,E.engine,.25),transform:`translateY(${(1-secondOn)*24}px)`}}>
        <MaskedType text={secondFirst} progress={enter(t,E.personIn,.7)} size={164} width={940} stagger />
        <div style={{marginTop:28}}>
          {secondRest.length>22 ? <MaskedType text={secondRest} progress={enter(t,E.remainderIn,.85)} size={Math.min(90,880/(secondRest.length*.55))} width={930}/> : <>
            <MaskedType text={secondRest.split(' ').slice(0,2).join(' ')} progress={enter(t,E.remainderIn,.65)} size={142} width={920}/>
            <MaskedType text={secondRest.split(' ').slice(2).join(' ')} progress={enter(t,E.remainderIn+.35,.7)} size={143} width={960} style={{marginTop:12}}/>
          </>}
        </div>
      </div>

      {/* One opaque rule occludes content during each purposeful change of state. */}
      {[E.engine,B.puzzleTurn,E.tile,B.puzzlePeak,B.finalCompress].map((hit,i)=>{
        const p=progress(t,hit,.42);
        const active=p>0&&p<1;
        return active?<div key={hit} style={{position:'absolute',left:84,top:y-20+p*(h+50),height:20+Math.sin(p*Math.PI)*90,width:912,background:i%2?T.color.ink:T.color.bone,transform:`scaleX(${Math.sin(p*Math.PI)})`,transformOrigin:i%2?'right':'left'}}/>:null;
      })}

      {/* Engine remembers the same frame as a measured grid, not a fabricated feed. */}
      <div style={{position:'absolute',left:84,top:255,opacity:enter(t,E.engine,.4)*(1-enter(t,B.compression,.4))}}>
        <MaskedType text="KAIROS" progress={enter(t,E.engine,.45)} size={132} width={912} outline/>
        <EvidenceLabel style={{marginTop:14,fontSize:23}}>IMAGE / SON / MÉMOIRE</EvidenceLabel>
      </div>
      <svg viewBox="0 0 1080 1920" style={{position:'absolute',inset:0,width:'100%',height:'100%',opacity:enter(t,E.grid,.5)*(1-enter(t,B.compression,.5)),pointerEvents:'none'}}>
        {[1,2].map(i=><path key={i} d={`M${84+304*i} 620 V1270 M84 ${620+216*i} H996`} stroke={T.color.bone} strokeWidth={1} strokeDasharray="5 12" opacity={.45}/>)}
      </svg>

      <div style={{position:'absolute',left:84,top:250,opacity:enter(t,B.compression,.6)*(1-enter(t,B.finalCluster,.3))}}>
        <EvidenceLabel accent style={{fontSize:30}}>ACCÈS PARTIEL.</EvidenceLabel>
        <div style={{width:230,height:2,background:T.color.accent,marginTop:16,transform:`scaleX(${enter(t,B.compression,.8)})`,transformOrigin:'left'}}/>
      </div>
    </AbsoluteFill>

    {/* Question is not another scene: it occupies the space left by the closing edge. */}
    <div style={{position:'absolute',left:84,top:660,zIndex:4,opacity:enter(t,E.question,.22)}}>
      <MaskedType text={props.finalQuestion} progress={enter(t,E.question,.3)} size={145} width={930} stagger/>
      <div style={{marginTop:48,width:140,height:3,background:T.color.accent,transform:`scaleX(${enter(t,E.domain,.2)})`,transformOrigin:'left'}}/>
      <div style={{fontSize:58,fontWeight:450,letterSpacing:'-.05em',marginTop:34,overflow:'hidden'}}>
        <div style={{transform:`translateY(${(1-enter(t,E.domain,.26))*120}%)`}}>{props.cta}</div>
      </div>
    </div>
    <FilmGrain frame={frame}/>
    {/* A tiny real-audio meter: useful rhythm during restraint, never a permanent visualizer. */}
    <div style={{position:'absolute',left:84,top:1780,width:912,height:1,background:T.color.border,opacity:end}}/>
  </AbsoluteFill>;
};
