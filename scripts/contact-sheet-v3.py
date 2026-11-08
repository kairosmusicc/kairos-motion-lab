from PIL import Image,ImageDraw,ImageFont
from pathlib import Path
import json,math
root=Path(__file__).resolve().parents[1];times=json.loads((root/'out/v3-stills/frames.json').read_text())
w,h,gap,cols=270,480,22,6;rows=math.ceil(len(times)/cols)
sheet=Image.new('RGB',(cols*w+(cols+1)*gap,rows*(h+42)+(rows+1)*gap),'#181b18');d=ImageDraw.Draw(sheet);font=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',17)
for i,t in enumerate(times):
 x=gap+i%cols*(w+gap);y=gap+i//cols*(h+42+gap);sheet.paste(Image.open(root/f'out/v3-stills/{t:.2f}.png').convert('RGB').resize((w,h),Image.Resampling.LANCZOS),(x,y));d.text((x,y+h+9),f'{i+1:02d} / {t:.2f}s',font=font,fill='#ede9df')
sheet.save(root/'out/HiddenClueTrailer-v3-beat-board.png')
# Storyboard includes actual source moments and their local source timecodes, not a fake global film timeline.
moments=json.loads((root/'design/v3/source-moments.json').read_text())['shots']
board=Image.new('RGB',(3*500+4*24,math.ceil(len(moments)/3)*350+24),'#181b18');draw=ImageDraw.Draw(board)
for i,m in enumerate(moments):
 import subprocess
 data=subprocess.check_output(['ffmpeg','-v','error','-ss',str(m.get('posterTime',m['sourceIn']+.4)),'-i',str(root/m['source']),'-frames:v','1','-vf','scale=480:270','-f','rawvideo','-pix_fmt','rgb24','-'])
 im=Image.frombytes('RGB',(480,270),data);x=24+i%3*524;y=24+i//3*350;board.paste(im,(x,y));draw.text((x,y+280),m['id'].upper(),font=font,fill='#ede9df');draw.text((x,y+305),f"{Path(m['source']).name} / {m['sourceIn']}–{m['sourceOut']}s",font=font,fill='#c8b18b')
board.save(root/'out/HiddenClueTrailer-v3-storyboard.png')
