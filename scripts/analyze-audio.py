"""Reproducible first-45s analysis: real PCM, spectral flux, librosa beat tracking.
Run .venv/bin/python scripts/analyze-audio.py; requires numpy/scipy/librosa 0.11.
"""
import json, subprocess, hashlib
from pathlib import Path
import numpy as np
from scipy import signal
import librosa

root = Path(__file__).resolve().parents[1]
source = root / 'public/assets/audio/tension-suspense.mp3'
probe = json.loads(subprocess.check_output(['ffprobe','-v','error','-show_format','-of','json',str(source)]))
sr, hop = 22050, 220
pcm = np.frombuffer(subprocess.check_output(['ffmpeg','-v','error','-i',str(source),'-vn','-ac','1','-ar',str(sr),'-f','f32le','-']),dtype='<f4')
y = pcm[:45*sr]
f,t,z = signal.stft(y,sr,nperseg=1024,noverlap=1024-hop,boundary='zeros')
flux = np.r_[0,np.maximum(np.diff(np.log1p(abs(z)*100),axis=1),0).sum(axis=0)]
flux = np.maximum(signal.savgol_filter(flux,5,2),0)
auto = signal.correlate(flux-flux.mean(),flux-flux.mean(),mode='full',method='fft')[len(flux)-1:]
lag = max(range(40,51),key=lambda i:auto[i])
delta = .5*(auto[lag-1]-auto[lag+1])/(auto[lag-1]-2*auto[lag]+auto[lag+1])
refined_bpm = 60*sr/(hop*(lag+delta))
onset = librosa.onset.onset_strength(y=y,sr=sr,hop_length=hop,n_fft=1024)
tempo, frames = librosa.beat.beat_track(onset_envelope=onset,sr=sr,hop_length=hop,start_bpm=132.5)
beat_times = librosa.frames_to_time(frames,sr=sr,hop_length=hop)
peaks,_ = signal.find_peaks(flux,distance=int(.25*sr/hop),prominence=np.percentile(flux,70)*.7)
strong = sorted(sorted(peaks,key=lambda p:flux[p],reverse=True)[:45])
transients = [{'time':round(float(t[p]),6),'strength':round(float(flux[p]),3)} for p in strong]
# Named events snap to measured transients, not guessed metronomic timestamps.
refs = {'openingHit':.65,'firstReveal':6.35,'systemOpen':10.25,'falseResolution':15.95,'destabilize':19.84,'unnoticed':24.06,'puzzleStart':25.55,'puzzleTurn':26.46,'puzzleFold':27.96,'puzzlePeak':33.66,'compression':35.15,'compressAgain':37.56,'closeIn':38.45,'finalCluster':40.86,'finalCompress':42.35,'finalSnap':42.81,'collapse':43.85,'finalImpact':44.76}
events = {name:min(transients,key=lambda p:abs(p['time']-ref))['time'] for name,ref in refs.items()}
energy=[]
for i in range(90):
    chunk=y[int(i*.5*sr):int((i+1)*.5*sr)]
    rms=float(np.sqrt(np.mean(chunk**2)))
    energy.append({'time':i*.5,'rms':round(rms,6),'dbfs':round(20*np.log10(max(rms,1e-8)),2)})
# Real waveform envelope, 48 samples/second; per-frame RMS drives a subtle meter.
envelope=[]
for i in range(45*48):
    a=y[int(i*sr/48):int((i+1)*sr/48)]
    envelope.append(round(float(np.sqrt(np.mean(a*a))),5))
normalizer=float(np.percentile(envelope,98))
trace=[round(min(v/normalizer,1),4) for v in envelope]
sections=[('uneasy-start',0,events['firstReveal'],'Sparse onset; tension rises; no literal silence.'),('system-opens',events['firstReveal'],events['falseResolution'],'Discrete attacks open the visual system.'),('false-understanding',events['falseResolution'],events['puzzleStart'],'Large onset at 19.84 disrupts the apparent resolution.'),('puzzle-engine',events['puzzleStart'],events['compression'],'Repeated attacks and rising density; alternate micro and macro responses.'),('compression',events['compression'],events['finalCluster'],'Convergence; continuous low-frequency tension remains.'),('peak-collapse',events['finalCluster'],44.8,'Dense attack cluster; final measured hit precedes the 44.8s cut.')]
data={'source':'public/assets/audio/tension-suspense.mp3','sha256':hashlib.sha256(source.read_bytes()).hexdigest(),'containerDuration':float(probe['format']['duration']),'decodedDuration':len(pcm)/sr,'analyzedSeconds':45,'sampleRate':sr,'hopSamples':hop,'method':'librosa onset+beat tracker; smoothed log-spectral flux; parabolic autocorrelation refinement','bpm':round(float(tempo[0]),6),'refinedBpm':round(float(refined_bpm),6),'tempoNote':'133.636 is hop-quantized; 133.295 refined. Half-time ~66.8 is plausible. Beat tracking is estimated, not a score.','beats':[round(float(x),6) for x in beat_times],'likelyBars':[round(float(x),6) for x in beat_times[1::4]],'barNote':'Inferred 4/4 with first strong hit chosen as phase; not verified musical downbeats.','transients':transients,'events':events,'energy':energy,'silenceWindowsBelowMinus50Db':[p['time'] for p in energy if p['dbfs'] < -50],'sections':[dict(name=a,start=b,end=c,note=d) for a,b,c,d in sections],'finalCut':44.8,'frames':1344,'fps':30,'waveformRate':48,'waveform':trace}
(root/'design').mkdir(exist_ok=True)
(root/'design/beat-grid.json').write_text(json.dumps(data,indent=2)+'\n')
lines=['# Master analysis','',f"- Decoded duration: {data['decodedDuration']:.6f}s; MP3 container: {data['containerDuration']:.6f}s.",f"- Tempo: {data['bpm']:.3f} BPM (hop quantized), refined {data['refinedBpm']:.3f} BPM.",'- Analysis: first 45s; mono 22050Hz; FFT 1024; hop 220 (~9.98ms).',f"- Final cut: 44.800s, 1344 frames at 30fps. Last measured attack {events['finalImpact']:.3f}s.",'- No half-second RMS window falls below −50dBFS: restraint is musical, not digital silence.','- Beat/bar inference is uncertain; do not claim the bar grid is ground truth.','', '## Named measured attacks','', '| Event | Seconds | Nearest 30fps frame |','|---|---:|---:|']
lines += [f'| {k} | {v:.3f} | {round(v*30)} |' for k,v in events.items()]
lines += ['','## Energy and sections','']+[f"- {a} ({b:.2f}–{c:.2f}s): {d}" for a,b,c,d in sections]
lines += ['','## Method and reproducibility','','Run `.venv/bin/python scripts/analyze-audio.py`. JSON stores the complete estimated beat grid, 45 strongest onsets, half-second RMS/dBFS curve and real waveform envelope. Visual events use measured attacks; the tempo does not manufacture a regular grid.','', '## Source credit','','Music: Violation by Soundridemusic. Source metadata links https://youtu.be/tT35z4DZb3M. Retain attribution in publication captions. No source artwork/attached video image is used.']
(root/'design/beat-grid.md').write_text('\n'.join(lines)+'\n')
print(json.dumps({k:data[k] for k in ['decodedDuration','bpm','refinedBpm','events','silenceWindowsBelowMinus50Db']},indent=2))
