import {bundle} from '@remotion/bundler';
import {renderMedia,renderStill,selectComposition} from '@remotion/renderer';
import {mkdirSync,readFileSync,writeFileSync,existsSync,rmSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import path from 'node:path';
import {variants,hiddenClueSchema} from '../src/experiments/hooks';
import {boardTimes,v2Spec,music} from '../src/audio/beat-grid';

const args=process.argv.slice(2);
const option=(name:string)=>args.includes(name)?args[args.indexOf(name)+1]:undefined;
const props=hiddenClueSchema.parse({...variants.v2,...(option('--props')?JSON.parse(readFileSync(option('--props')!,'utf8')):{})});
if(!props.audioSrc || !existsSync(path.join('public',props.audioSrc))) throw Error('V2 requires the real master. Silent export is forbidden.');
const sha=createHash('sha256').update(readFileSync(path.join('public',props.audioSrc))).digest('hex');
if(sha!==music.sha256) throw Error('Master changed: rerun analysis and verify the new grid.');
// Bundled browser is the default. Explicit env override is only for user-approved environments.
const browserExecutable=process.env.REMOTION_BROWSER_EXECUTABLE || undefined;
const out=path.resolve('out');mkdirSync(out,{recursive:true});
const serveUrl=await bundle({entryPoint:path.resolve('src/index.ts'),publicDir:path.resolve('public')});
const composition=await selectComposition({serveUrl,id:'HiddenClueTrailer-v2',inputProps:props,browserExecutable});
if(composition.durationInFrames>45*composition.fps) throw Error('Duration exceeds 45 seconds');
const draft=args.includes('--draft');
const stills=args.includes('--stills-only');
const scale=draft?.5:1;
if(stills){
  mkdirSync(path.join(out,'v2-stills'),{recursive:true});
  for(const seconds of boardTimes){
    await renderStill({serveUrl,composition,inputProps:props,browserExecutable,frame:Math.round(seconds*composition.fps),scale:.5,imageFormat:'png',output:path.join(out,'v2-stills',`${seconds.toFixed(2)}.png`)});
    console.log(`Still ${seconds.toFixed(2)}s`);
  }
  const repeat=path.join(out,'v2-stills/repeat.png');
  await renderStill({serveUrl,composition,inputProps:props,browserExecutable,frame:Math.round(boardTimes[4]*composition.fps),scale:.5,imageFormat:'png',output:repeat});
  const digest=(p:string)=>createHash('sha256').update(readFileSync(p)).digest('hex');
  if(digest(repeat)!==digest(path.join(out,'v2-stills',`${boardTimes[4].toFixed(2)}.png`)))throw Error('Nondeterministic frame');
  rmSync(repeat);
  execFileSync('python',['scripts/contact-sheet.py'],{stdio:'inherit'});
}else{
  const target=path.join(out,`HiddenClueTrailer-v2${draft?'-draft':''}.mp4`);
  const intermediate=path.join(out,`.v2-${draft?'draft':'master'}.mp4`);
  let last=-1;
  await renderMedia({serveUrl,composition,inputProps:props,browserExecutable,outputLocation:intermediate,codec:'h264',pixelFormat:'yuv420p',crf:draft?24:17,scale,imageFormat:'jpeg',jpegQuality:draft?85:95,concurrency:2,
    onProgress:({progress})=>{const p=Math.floor(progress*20);if(p!==last){console.log(`${draft?'Draft':'Master'} ${Math.min(p*5,100)}%`);last=p;}}});
  execFileSync('ffmpeg',['-y','-v','error','-i',intermediate,'-map','0:v:0','-map','0:a:0','-c','copy','-movflags','+faststart','-metadata','title=KAIROS — Hidden Clue V2',target],{stdio:'inherit'});
  rmSync(intermediate);
  writeFileSync(path.join(out,`HiddenClueTrailer-v2${draft?'-draft':''}-manifest.json`),JSON.stringify({composition:composition.id,spec:v2Spec,scale,props,audioSha256:sha,events:music.events,realAudio:true},null,2));
  console.log(target);
}
