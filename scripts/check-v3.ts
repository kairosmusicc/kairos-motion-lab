import {execFileSync} from 'node:child_process';
import {readFileSync,writeFileSync,statSync} from 'node:fs';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
import {V3,cue,reelUrl} from '../src/audio/v3-timeline';
import grid from '../design/beat-grid.json';
const hash=(p:string)=>createHash('sha256').update(readFileSync(p)).digest('hex');
const source=JSON.parse(readFileSync('design/v3/source-moments.json','utf8'));
for(const shot of source.shots){assert.equal(hash(shot.source),shot.sourceSha256);assert.equal(hash(`public/${shot.derived}`),shot.derivedSha256);}
assert.equal(hash('public/assets/audio/tension-suspense.mp3'),grid.sha256);
assert(Object.values(cue).every(t=>t>=0&&t<V3.end));
const code=readFileSync('src/compositions/HiddenClueTrailerV3/HiddenClueTrailerV3.tsx','utf8');
assert(!/ABEG|1029|02:43|tout_gacher|kairosarchives\.com|Date\.now\(|Math\.random\(|@keyframes/.test(code));
assert(readFileSync('src/compositions/HiddenClueTrailerV3/FilmWindow.tsx','utf8').includes('muted playbackRate'));
assert.equal(reelUrl,'https://www.instagram.com/reel/DfFiuwHIyyN/');
const file=process.argv[2]||'out/HiddenClueTrailer-v3.mp4';
const probe=JSON.parse(execFileSync('ffprobe',['-v','error','-count_frames','-show_streams','-show_format','-of','json',file],{encoding:'utf8'}));
const video=probe.streams.find((s:{codec_type:string})=>s.codec_type==='video'),audio=probe.streams.find((s:{codec_type:string})=>s.codec_type==='audio');
const draft=file.includes('-draft');assert.equal(video.width,draft?540:1080);assert.equal(video.height,draft?960:1920);assert.equal(video.avg_frame_rate,'30/1');assert.equal(Number(video.nb_read_frames),1344);assert.equal(video.codec_name,'h264');assert.equal(video.pix_fmt,'yuv420p');assert.equal(video.color_space,'bt709');assert.equal(video.color_range,'tv');assert(audio);
assert(Number(probe.format.duration)<=45);assert(Math.abs(Number(probe.format.duration)-44.8)<.04);
const pcm=(p:string)=>execFileSync('ffmpeg',['-v','error','-i',p,'-vn','-ac','1','-ar','8000','-t','44.8','-f','f32le','-'],{maxBuffer:20*1024*1024});
const a=pcm(file),b=pcm('public/assets/audio/tension-suspense.mp3'),av=new Float32Array(a.buffer,a.byteOffset,a.length/4),bv=new Float32Array(b.buffer,b.byteOffset,b.length/4);let aa=0,bb=0,ab=0;
for(let i=8000;i<Math.min(av.length,bv.length)-8000;i++){aa+=av[i]*av[i];bb+=bv[i]*bv[i];ab+=av[i]*bv[i];}
const correlation=ab/Math.sqrt(aa*bb);assert(correlation>.99);
const report={file,duration:Number(probe.format.duration),bytes:statSync(file).size,width:video.width,height:video.height,fps:30,frames:1344,videoCodec:video.codec_name,pixelFormat:video.pix_fmt,colorSpace:video.color_space,colorRange:video.color_range,audioCodec:audio.codec_name,masterPcmCorrelation:correlation,masterSha256:grid.sha256,destination:reelUrl,remotion:'4.0.541',sourceMoments:'design/v3/source-moments.json',sha256:hash(file)};
writeFileSync(file.replace('.mp4','-validation.json'),JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify(report,null,2));
