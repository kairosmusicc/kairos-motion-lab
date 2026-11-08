"""Create short, silent, deterministic editorial assets from inspected real source moments."""
from pathlib import Path
import subprocess,json,hashlib
root=Path(__file__).resolve().parents[1]
folder=root/'public/assets/film/v3';folder.mkdir(parents=True,exist_ok=True)
shots=[('watch','journey.mp4',10.1,3.3,False,'Overhead table, real wristwatch, cup and phone'),('walk','message.mp4',1.5,4,True,'Walking figure between trees and bollards'),('phone','court-metrage-proxy.mp4',68.9,3,True,'Station close face and actual message overlay'),('departure','journey.mp4',.2,3.4,True,'Street face and doorway'),('train','court-metrage-proxy.mp4',57,7,True,'Real carriage, vertical rails and doorway'),('slip','train.mp4',3.1,3,True,'Original outdoor perceptual rupture, not a train shot'),('cabinet','cabinet.mp4',1.1,4.6,True,'Consultation wide shot, candle and foreground wrist'),('face','rupture.mp4',5.5,4,True,'Consultation close-up')]
records=[]
for key,name,start,duration,crop,description in shots:
    original=root/'public/assets/film'/name;target=folder/f'{key}.mp4'
    vf=('crop=iw:trunc(ih*.80/2)*2:0:0,' if crop else '')+'setsar=1,fps=30,format=yuv420p'
    subprocess.run(['ffmpeg','-v','error','-y','-ss',str(start),'-i',str(original),'-t',str(duration),'-an','-vf',vf,'-c:v','libx264','-crf','17','-preset','fast','-movflags','+faststart',str(target)],check=True)
    records.append(dict(id=key,source=f'public/assets/film/{name}',posterTime={'watch':12.0,'phone':70.0,'train':59.0}.get(key,round(start+.4,3)),sourceIn=start,sourceOut=round(start+duration,3),description=description,sourceSha256=hashlib.sha256(original.read_bytes()).hexdigest(),derived=f'assets/film/v3/{key}.mp4',derivedSha256=hashlib.sha256(target.read_bytes()).hexdigest(),subtitleCrop=crop,retainedHeightFraction=.8 if crop else 1,usedInPicture=True))
    print(key,flush=True)
(root/'design/v3/source-moments.json').write_text(json.dumps({'pictureProxyDuration':81.9,'proxyContainerDuration':82.800998,'verifiedMessageFragment':"j'ai besoin de te dire un truc",'quoteSource':'court-metrage-proxy.mp4 @ 70.0s','missingReferences':['separate Guess watch photograph','screen-recorded motion reference'],'shots':records},indent=2)+'\n')

subprocess.run(['ffmpeg','-v','error','-y','-ss','1.6','-i',str(folder/'watch.mp4'),'-t','1.6','-an','-vf','crop=340:340:155:610,setsar=1','-c:v','libx264','-crf','17','-preset','fast','-movflags','+faststart',str(folder/'watch-detail.mp4')],check=True)

p=root/'design/v3/source-moments.json'
data=json.loads(p.read_text());data['derivedCrops']=[{'asset':'assets/film/v3/watch-detail.mp4','parent':'assets/film/v3/watch.mp4','parentIn':1.6,'duration':1.6,'crop':[155,610,340,340],'note':'Actual filmed wrist, no stock Guess substitute.'}]
p.write_text(json.dumps(data,indent=2)+'\n')
