import {execFileSync} from 'node:child_process';
import {readFileSync,readdirSync,existsSync,statSync,writeFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
import {music,v2Spec,editorial,boardTimes} from '../src/audio/beat-grid';
import {variants,hiddenClueSchema} from '../src/experiments/hooks';
assert(hiddenClueSchema.safeParse(variants.v2).success);
assert(!hiddenClueSchema.safeParse({...variants.v2,suspenseLevel:2}).success);
assert.equal(v2Spec.frames,1344);assert(v2Spec.duration<=45);
assert(Object.values(editorial).every(t=>t>=0&&t<v2Spec.duration));
assert(boardTimes.every(t=>t>=0&&t<v2Spec.duration));
const walk=(d:string):string[]=>readdirSync(d,{withFileTypes:true}).flatMap(f=>f.isDirectory()?walk(`${d}/${f.name}`):[`${d}/${f.name}`]);
for(const file of walk('src')){
 const code=readFileSync(file,'utf8');
 assert(!/Math\.random\(|Date\.now\(|setInterval\(|setTimeout\(|@keyframes|animation\s*:/.test(code),`Real-time dependency: ${file}`);
}
const source=readFileSync('src/compositions/HiddenClueTrailer/HiddenClueTrailerV2.tsx','utf8');
assert(!/02:43|1029/.test(source),'Forbidden explicit narrative text');
assert(source.includes('AudioTrace'),'Real trace missing');
const master=readFileSync(`public/${variants.v2.audioSrc}`);
assert.equal(createHash('sha256').update(master).digest('hex'),music.sha256);
assert(master.length>1000000);
console.log('PASS props, deterministic source, central cues, narrative constraints, analyzed real master');
if(process.argv.includes('--source-only')) process.exit(0);
const file=process.argv[2]||'out/HiddenClueTrailer-v2.mp4';
assert(existsSync(file),'Final render not found');
const probe=JSON.parse(execFileSync('ffprobe',['-v','error','-count_frames','-show_streams','-show_format','-of','json',file],{encoding:'utf8'}));
const video=probe.streams.find((s:{codec_type:string})=>s.codec_type==='video');
const audio=probe.streams.find((s:{codec_type:string})=>s.codec_type==='audio');
assert.equal(video.width,1080);assert.equal(video.height,1920);assert.equal(video.avg_frame_rate,'30/1');
assert.equal(Number(video.nb_read_frames),1344);assert.equal(video.codec_name,'h264');assert.equal(video.pix_fmt,'yuv420p');
assert(audio,'Real soundtrack missing');assert(Number(probe.format.duration)<=45);
assert(Math.abs(Number(probe.format.duration)-44.8)<.05);
const decode=(input:string)=>execFileSync('ffmpeg',['-v','error','-i',input,'-vn','-ac','1','-ar','8000','-t','44.8','-f','f32le','-'],{maxBuffer:20*1024*1024});
const a=decode(file),b=decode(`public/${variants.v2.audioSrc}`);
const av=new Float32Array(a.buffer,a.byteOffset,Math.floor(a.length/4)),bv=new Float32Array(b.buffer,b.byteOffset,Math.floor(b.length/4));
let aa=0,bb=0,ab=0;
for(let i=8000;i<Math.min(av.length,bv.length)-8000;i++){aa+=av[i]*av[i];bb+=bv[i]*bv[i];ab+=av[i]*bv[i];}
const correlation=ab/Math.sqrt(aa*bb);assert(correlation>.95,`Soundtrack does not match master: ${correlation}`);
console.log(`PASS master ${video.width}×${video.height}; ${probe.format.duration}s; ${video.nb_read_frames} frames; H.264+${audio.codec_name}; master PCM correlation ${correlation.toFixed(6)}; ${statSync(file).size} bytes`);

const artifacts=['out/HiddenClueTrailer-v2-beat-board.png','out/HiddenClueTrailer-v2-draft.mp4',file];
writeFileSync('out/HiddenClueTrailer-v2-validation.json',JSON.stringify({
  durationSeconds:Number(probe.format.duration),width:video.width,height:video.height,
  fps:30,frames:Number(video.nb_read_frames),codec:video.codec_name,pixelFormat:video.pix_fmt,
  audio:{codec:audio.codec_name,masterSha256:music.sha256,decodedPcmCorrelation:correlation},
  remotionVersion:JSON.parse(readFileSync('package.json','utf8')).dependencies.remotion,
  repeatedStillCheck:'passed during npm run stills',
  artifacts:artifacts.map(path=>({path,bytes:statSync(path).size,sha256:createHash('sha256').update(readFileSync(path)).digest('hex')})),
  compositionSha256:createHash('sha256').update(readFileSync('src/compositions/HiddenClueTrailer/HiddenClueTrailerV2.tsx')).digest('hex'),
},null,2)+'\n');
