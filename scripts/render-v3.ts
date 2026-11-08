import {bundle} from '@remotion/bundler';
import {selectComposition,renderStill,renderMedia} from '@remotion/renderer';
import {mkdirSync,readFileSync,writeFileSync,rmSync,existsSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import path from 'node:path';
import {v3Defaults,v3Schema} from '../src/compositions/HiddenClueTrailerV3/props';
import {V3,cue,v3Board,reelUrl} from '../src/audio/v3-timeline';
import grid from '../design/beat-grid.json';
const args=process.argv.slice(2),draft=args.includes('--draft'),stills=args.includes('--stills-only');
const propsFile=args.includes('--props')?args[args.indexOf('--props')+1]:undefined;
const props=v3Schema.parse({...v3Defaults,...(propsFile?JSON.parse(readFileSync(propsFile,'utf8')):{})}),browserExecutable=process.env.REMOTION_BROWSER_EXECUTABLE;
const audio='public/assets/audio/tension-suspense.mp3';
if(createHash('sha256').update(readFileSync(audio)).digest('hex')!==grid.sha256)throw Error('Real master changed: analyze before rendering');
for(const shot of ['watch','watch-detail','walk','phone','departure','train','slip','cabinet','face'])if(!existsSync(`public/assets/film/v3/${shot}.mp4`))throw Error(`Missing real film asset ${shot}`);
const references=JSON.parse(readFileSync('design/v3/references.json','utf8'));
for(const ref of references.assets)if(createHash('sha256').update(readFileSync(ref.path)).digest('hex')!==ref.sha256)throw Error(`Reference changed: ${ref.path}`);
mkdirSync('out',{recursive:true});
const serveUrl=await bundle({entryPoint:path.resolve('src/index.ts'),publicDir:path.resolve('public')});
const composition=await selectComposition({serveUrl,id:'HiddenClueTrailer-v3',inputProps:props,browserExecutable});
if(stills){
 rmSync('out/v3-stills',{recursive:true,force:true});mkdirSync('out/v3-stills',{recursive:true});
 for(const time of v3Board){await renderStill({serveUrl,composition,inputProps:props,browserExecutable,frame:Math.round(time*30),scale:.5,output:`out/v3-stills/${time.toFixed(2)}.png`});console.log(`Still ${time}`);}
 await renderStill({serveUrl,composition,inputProps:props,browserExecutable,frame:Math.round(v3Board[4]*30),scale:.5,output:'out/v3-stills/repeat.png'});
 const hash=(p:string)=>createHash('sha256').update(readFileSync(p)).digest('hex');
 if(hash('out/v3-stills/repeat.png')!==hash(`out/v3-stills/${v3Board[4].toFixed(2)}.png`))throw Error('Film frame nondeterminism');rmSync('out/v3-stills/repeat.png');
 writeFileSync('out/v3-stills/frames.json',JSON.stringify(v3Board));
 execFileSync('python',['scripts/contact-sheet-v3.py'],{stdio:'inherit'});
}else{
 const file=`out/HiddenClueTrailer-v3${draft?'-draft':''}.mp4`,intermediate=`out/.v3-${draft?'draft':'master'}.mp4`;let previous=-1;
 await renderMedia({serveUrl,composition,inputProps:props,browserExecutable,codec:'h264',pixelFormat:'yuv420p',colorSpace:'bt709',imageFormat:draft?'jpeg':'png',jpegQuality:draft?86:undefined,scale:draft?.5:1,crf:draft?23:17,concurrency:2,outputLocation:intermediate,onProgress:({progress})=>{const n=Math.floor(progress*20);if(n!==previous){console.log(`${draft?'Draft':'Master'} ${n*5}%`);previous=n;}}});
 execFileSync('ffmpeg',['-v','error','-y','-i',intermediate,'-map','0:v:0','-map','0:a:0','-c','copy','-movflags','+faststart',file]);rmSync(intermediate);
 writeFileSync(file.replace('.mp4','-manifest.json'),JSON.stringify({composition:composition.id,props,spec:V3,cue,sourceMoments:'design/v3/source-moments.json',audioSha256:grid.sha256,references:'design/v3/references.json',colorSpace:'bt709',destination:reelUrl},null,2));console.log(file);
}
writeFileSync('out/HiddenClueTrailer-v3-caption.txt',`Regarde encore.\nVoir le film : ${reelUrl}\n`);
