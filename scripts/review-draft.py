"""Decode the actual MP4 for temporal review, not source-only snapshots."""
from pathlib import Path
import subprocess,sys,json
import numpy as np
from PIL import Image,ImageDraw,ImageFont
root=Path(__file__).resolve().parents[1]
source=Path(sys.argv[1] if len(sys.argv)>1 else root/'out/HiddenClueTrailer-v2-draft.mp4')
label=sys.argv[2] if len(sys.argv)>2 else 'draft-review'
folder=root/'out'/label
folder.mkdir(parents=True,exist_ok=True)
# Half-second full decoded coverage, plus fine samples of the transformation section.
sets={'overview-1':np.arange(.5,15,.75),'overview-2':np.arange(15,30,.75),'overview-3':np.arange(30,44.8,.75),'engine':np.arange(25.6,35.2,.4),'ending':np.arange(40.8,44.8,.2)}
font=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',16)
for name,times in sets.items():
 w,h,gap,cols=180,320,18,7
 rows=int(np.ceil(len(times)/cols))
 sheet=Image.new('RGB',(cols*w+(cols+1)*gap,rows*(h+32)+(rows+1)*gap),'#191c19');draw=ImageDraw.Draw(sheet)
 for i,t in enumerate(times):
  data=subprocess.check_output(['ffmpeg','-v','error','-ss',str(float(t)),'-i',str(source),'-frames:v','1','-vf',f'scale={w}:{h}','-f','rawvideo','-pix_fmt','rgb24','-'])
  image=Image.frombytes('RGB',(w,h),data)
  x=gap+(i%cols)*(w+gap);y=gap+(i//cols)*(h+32+gap)
  sheet.paste(image,(x,y));draw.text((x,y+h+6),f'{t:.2f}s',font=font,fill='#ede9df')
 sheet.save(folder/f'{name}.png')
# Track coarse composition-change energy after downsampling: grain alone cannot hide dead holds.
raw=subprocess.check_output(['ffmpeg','-v','error','-i',str(source),'-vf','fps=10,scale=90:160','-f','rawvideo','-pix_fmt','gray','-'])
frames=np.frombuffer(raw,dtype=np.uint8).reshape(-1,160,90).astype(float)
delta=np.mean(abs(np.diff(frames,axis=0)),axis=(1,2))
report={'source':str(source),'sampleFps':10,'meanPixelDelta':float(delta.mean()),'belowOnePixelStepFraction':float(np.mean(delta<1)),'oneSecondMotion':[round(float(delta[i:i+10].mean()),3) for i in range(0,len(delta),10)]}
(folder/'temporal-review.json').write_text(json.dumps(report,indent=2)+'\n')
print(json.dumps(report,indent=2))
