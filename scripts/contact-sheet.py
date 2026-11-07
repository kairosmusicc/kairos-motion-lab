from PIL import Image, ImageDraw, ImageFont
from pathlib import Path
import json
root=Path(__file__).resolve().parents[1]
times=json.loads((root/'out/v2-stills/frames.json').read_text())
w,h,gap=270,480,22
sheet=Image.new('RGB',(6*w+7*gap,3*(h+42)+4*gap),'#181b18')
d=ImageDraw.Draw(sheet)
font=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',17)
for i,t in enumerate(times):
    x=gap+(i%6)*(w+gap);y=gap+(i//6)*(h+42+gap)
    frame=Image.open(root/f'out/v2-stills/{t:.2f}.png').convert('RGB').resize((w,h),Image.Resampling.LANCZOS)
    sheet.paste(frame,(x,y));d.text((x,y+h+10),f'{i+1:02d} / {t:.2f}s',font=font,fill='#ede9df')
sheet.save(root/'out/HiddenClueTrailer-v2-beat-board.png')
print('Beat-board saved')
