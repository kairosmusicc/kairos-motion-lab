import React from 'react';
import {AbsoluteFill,staticFile,useCurrentFrame,useVideoConfig} from 'remotion';
import {Audio} from '@remotion/media';
import {cue as C} from '../../audio/v3-timeline';
import {range as r,reveal as enter,progress,pose} from '../../motion/choreography';
import {MaskedType} from '../../components/MaskedType';
import {FilmGrain} from '../../components/FilmGrain';
import {FilmWindow} from './FilmWindow';
import {Dial} from './Dial';
import {V3Props} from './props';
export {v3Schema} from './props';
const ink='#0b0d0c',white='#f2efe7',gold='#c8b18b';
const label:React.CSSProperties={fontSize:23,letterSpacing:'.11em',fontFamily:'Geist',fontWeight:450};
export const HiddenClueTrailerV3:React.FC<V3Props> = (props)=>{
 const frame=useCurrentFrame(),{fps,durationInFrames}=useVideoConfig(),t=frame/fps;
 const alive=1-enter(t,C.clear,.35);
 const first=1-enter(t,C.second-.15,.3),second=enter(t,C.second,.3)*(1-enter(t,C.watch,.35));
 const circleX=pose(t,[[0,780],[C.watch,540],[C.message,250],[C.journey,540],[C.train,540],[C.rupture,540],[C.cabinet,540],[C.face,703],[C.question,793]]);
 const circleY=pose(t,[[0,1250],[C.watch,1000],[C.message,1280],[C.journey,1050],[C.train,1050],[C.rupture,1000],[C.cabinet,890],[C.face,1195],[C.return,1155],[C.question,1395]]);
 const radius=pose(t,[[0,230],[C.second,370],[C.watch,465],[C.message,150],[C.journey,420],[C.train,450],[C.rupture,460],[C.cabinet,390],[C.face,300],[C.question,300]]);
 const straight=enter(t,C.journey,.8)*(1-enter(t,C.rupture,.6));
 const slip=enter(t,C.rupture,.5)*(1-enter(t,C.cabinet,.6));
 const after=enter(t,C.question,.4);
 const hookWords=props.hookLine1.split(' '),main1=hookWords.slice(0,-2).join(' '),main2=hookWords.slice(-2).join(' ');
 const questionWords=props.finalQuestion.split(' '),questionLead=questionWords.slice(0,-2).join(' '),questionTail=questionWords.slice(-2).join(' ');
 const firstWord=props.hookLine2.split(' ')[0],rest=props.hookLine2.split(' ').slice(1).join(' ');
 const shutter=(at:number,width:number)=>{
  const p=progress(t,at,.48);return p>0&&p<1?<div key={at} style={{position:'absolute',left:-width+(1080+width)*p,top:580,width,height:1040,background:ink,transform:'skewX(-7deg)'}}/>:null;
 };
 return <AbsoluteFill style={{background:ink,color:white,fontFamily:'Geist',overflow:'hidden'}}>
  <style>{`@font-face{font-family:Geist;src:url('${staticFile('assets/fonts/Geist-Variable.woff2')}') format('woff2');font-weight:100 900;font-display:block}`}</style>
  <Audio name="Real suspense master" src={staticFile('assets/audio/tension-suspense.mp3')} volume={f=>.65*Math.max(0,Math.min(1,f/2,(durationInFrames-.1-f)/.8))}/>
  {/* Opening: first frame is already composed, no dead pre-roll. */}
  <FilmWindow name="Hook — real wrist" shot="watch-detail" start={0} end={C.second+.3} rate={.55} pose={{x:550,y:1020,w:460,h:460,radius:230,objectX:50,scale:1.07}}/>
  <FilmWindow name="Hook — doorway" shot="train" start={C.second-.1} end={C.watch+.3} rate={.7} pose={{x:pose(t,[[C.second-.15,1040],[C.second,84]]),y:950,w:912,h:600,radius:pose(t,[[C.second,300],[C.watch,6]]),objectX:50}}/>
  <div style={{position:'absolute',left:84,top:255,opacity:first}}>
   <MaskedType text={main1} progress={enter(t,0,.28)} size={105} width={930}/>
   <MaskedType text={main2} progress={enter(t,C.hookImpact,.32)} size={169} width={940} style={{marginTop:22}} stagger/>
  </div>
  <div style={{position:'absolute',left:84,top:240,opacity:second,transform:`translateX(${(1-enter(t,C.second,.55))*-80}px)`}}>
   <MaskedType text={firstWord} progress={enter(t,C.second,.35)} size={153} width={930}/>
   <MaskedType text={rest.split(' ').slice(0,2).join(' ')} progress={enter(t,C.second+.3,.35)} size={110} width={920} style={{marginTop:25}}/>
   <MaskedType text={rest.split(' ').slice(2).join(' ')} progress={enter(t,C.second+.6,.4)} size={139} width={930} style={{marginTop:8}}/>
  </div>
  {/* Circle/rim is the connective graphic organism. */}
  <div style={{opacity:alive}}>
   <FilmWindow name="Time — wrist in context" shot="watch" start={C.watch} end={C.message+.35} rate={.62} pose={{x:540-pose(t,[[C.watch-.1,260],[C.watch,912]])/2,y:1000-pose(t,[[C.watch-.1,260],[C.watch,912]])/2,w:pose(t,[[C.watch-.1,260],[C.watch,912]]),h:pose(t,[[C.watch-.1,260],[C.watch,912]]),radius:456,objectX:37}}/>
   <FilmWindow name="Message — real station notification" shot="phone" start={C.message} end={C.journey+.3} rate={.48} pose={{x:84,y:pose(t,[[C.message-.1,800],[C.message,670]]),w:912,h:600,radius:12,objectX:50,scale:1.02}}/>
   <div style={{position:'absolute',left:84,top:310,opacity:enter(t,C.watch,.35)*(1-enter(t,C.message,.25))}}>
    <MaskedType text="UN DÉTAIL." progress={enter(t,C.watch,.6)} size={115} width={910}/>
    <div style={{height:2,background:gold,width:230*enter(t,C.watch,.8),marginTop:30}}/>
   </div>
   <div style={{position:'absolute',left:84,top:320,opacity:enter(t,C.message,.3)*(1-enter(t,C.journey,.25))}}>
    <MaskedType text="j'ai besoin" progress={enter(t,C.message,.6)} size={109} width={930}/>
    <MaskedType text="de te dire un truc" progress={enter(t,C.message+.65,.6)} size={94} width={930} style={{marginTop:10}}/>
    <div style={{...label,fontSize:20,color:gold,marginTop:22}}>FRAGMENT DU FILM</div>
   </div>
   {/* Physical movement becomes three architectural rails, not stock transition wipes. */}
   <FilmWindow name="Journey — walking" shot="walk" start={C.journey} end={C.train+.3} rate={.8} pose={{x:84,y:pose(t,[[C.journey-.1,710],[C.journey,390]]),w:540,h:1090,radius:pose(t,[[C.journey-.1,280],[C.journey,3]]),objectX:56}}/>
   <FilmWindow name="Journey — street face" shot="departure" start={C.journey} end={C.train+.3} rate={.75} pose={{x:pose(t,[[C.journey-.1,1080],[C.journey,650]]),y:670,w:346,h:810,objectX:50}}/>
   {[0,1,2].map(i=><FilmWindow key={i} name={`Train — window ${i+1}`} shot="train" start={C.train} end={C.rupture+.2} rate={.75} pose={{x:pose(t,[[C.train,84+i*320],[C.recall,84+i*315],[C.split,84+i*315]])+Math.sin(i*2+t*.65)*5,y:pose(t,[[C.train,450+i*90],[C.recall,500+i*40],[C.split,580-i*60]]),w:290,h:pose(t,[[C.train,900],[C.recall,960],[C.split,700+i*80]]),objectX:15+i*35,scale:1.06}}/>)}
   <FilmWindow name="Recall — wrist detail" shot="watch-detail" start={C.recall} end={C.split+.2} rate={.65} pose={{x:pose(t,[[C.recall-.1,1080],[C.recall,655]]),y:1170,w:342,h:320,radius:180,objectX:50,scale:1.02}}/>
   <div style={{position:'absolute',left:84,top:285,opacity:enter(t,C.journey,.4)*(1-enter(t,C.rupture,.2))}}>
    <div style={{...label,color:gold}}>KAIROS · LE COURT MÉTRAGE</div>
    <div style={{width:912,height:2,background:'#72736b',marginTop:28,transform:`scaleX(${enter(t,C.journey,1)})`,transformOrigin:'left'}}/>
   </div>
   {/* Rupture: one frame loses registration; the real film supplies the disturbance. */}
   <FilmWindow name="Reality slip — original rupture" shot="slip" start={C.rupture} end={C.cabinet+.35} rate={.5} pose={{x:84+Math.sin(t*1.7)*12*slip,y:510,w:912,h:1000,radius:pose(t,[[C.rupture,15],[C.slip,440],[C.echo,12]]),rotate:Math.sin(t*1.2)*.8*props.suspenseLevel,objectX:50}} style={{filter:'saturate(.5)'}}/>
   <FilmWindow name="Reality slip — stable train sliver" shot="train" start={C.rupture} end={C.cabinet} rate={.8} pose={{x:pose(t,[[C.rupture,180],[C.slip,690],[C.echo,140]]),y:450,w:170,h:1040,opacity:.65,objectX:65}}/>
   <FilmWindow name="Cabinet — reveal" shot="cabinet" start={C.cabinet} end={C.question+.4} rate={.7} pose={{x:84,y:pose(t,[[C.cabinet-.1,1040],[C.cabinet,520]]),w:912,h:740,radius:pose(t,[[C.cabinet-.1,460],[C.cabinet,18]]),objectX:80}}/>
   <FilmWindow name="Cabinet — closer" shot="face" start={C.face} end={C.clear+.2} rate={.65} pose={{x:pose(t,[[C.face-.1,1080],[C.face,410],[C.question,500]]),y:pose(t,[[C.face,800],[C.return,760],[C.question,1000]]),w:586,h:790,radius:pose(t,[[C.face,8],[C.question,300]]),objectX:15,scale:1.03,opacity:1-enter(t,C.clear,.3)}}/>
   <FilmWindow name="Return — wrist remembered" shot="watch-detail" start={C.return} end={C.question+.15} rate={.65} pose={{x:84,y:450,w:350,h:350,radius:200,objectX:50,scale:1.02,opacity:1-enter(t,C.question,.2)}}/>
   <Dial cx={circleX} cy={circleY} radius={radius} open={enter(t,0,.6)} straighten={straight} opacity={(1-enter(t,C.message,.2)+enter(t,C.journey,.3))*r(t,[[0,.85],[C.message,0],[C.journey,.65],[C.train,.4],[C.rupture,.65],[C.cabinet,.3],[C.face,.15],[C.question,.15]])} rotation={r(t,[[0,-18],[C.watch,40],[C.message,70],[C.journey,120],[C.rupture,185],[C.cabinet,210]])}/>
   {[C.message,C.train,C.split,C.slip,C.cabinet].map(hit=>shutter(hit,180))}
  </div>
  {/* End: viewer-directed question, then a clear Instagram action; URL lives in delivery metadata. */}
  <div style={{position:'absolute',left:84,top:350,opacity:after*(1-enter(t,C.cta,.24))}}>
   <MaskedType text={questionLead} progress={enter(t,C.question,.45)} size={91} width={930}/>
   <MaskedType text={questionTail} progress={enter(t,C.question+.3,.5)} size={153} width={930} style={{marginTop:18}}/>
  </div>
  <div style={{position:'absolute',left:84,top:630,opacity:enter(t,C.cta,.25)}}>
   <MaskedType text={props.cta.split(' ').slice(0,-1).join(' ')} progress={enter(t,C.cta,.34)} size={149} width={930}/>
   <MaskedType text={props.cta.split(' ').slice(-1).join(' ')} progress={enter(t,C.cta+.15,.35)} size={160} width={930} style={{marginTop:8}}/>
   <div style={{width:150*enter(t,C.cta+.3,.5),height:2,background:gold,marginTop:50}}/>
   <div style={{fontSize:43,letterSpacing:'-.035em',marginTop:34,opacity:enter(t,C.ctaDetail-.65,.3)}}>Voir le film sur Instagram</div>
  </div>
  <div style={{position:'absolute',left:84,top:112,...label,opacity:1-enter(t,C.cta,.2)}}>KAIROS</div>
  <div style={{position:'absolute',right:84,top:112,...label,fontSize:20,color:gold,opacity:1-enter(t,C.cta,.2)}}>UN FILM DE MANII & PAAPII</div>
  <div style={{position:'absolute',left:84,top:1710,...label,fontSize:24,opacity:enter(t,C.cta,.3)}}>PAAPII & MANII</div>
  <FilmGrain frame={frame}/>
 </AbsoluteFill>;
};
