"""Decode and seek an exported MP4 through Chromium's native player."""
from playwright.sync_api import sync_playwright
from pathlib import Path
import json,sys
name=sys.argv[1] if len(sys.argv)>1 else 'HiddenClueTrailer-v2-draft.mp4'
with sync_playwright() as p:
    browser=p.chromium.launch(executable_path='/usr/bin/chromium',headless=True,args=['--no-sandbox','--autoplay-policy=no-user-gesture-required'])
    page=browser.new_page(viewport={'width':540,'height':960})
    errors=[]
    page.on('pageerror',lambda e:errors.append(str(e)))
    page.goto('http://localhost:4178/')
    page.set_content(f'<body style="margin:0;background:#0b0d0c"><video id="v" playsinline preload="auto" style="width:540px;height:960px"></video></body>')
    page.evaluate('async (name)=>{v.src=URL.createObjectURL(await (await fetch("/out/"+name)).blob())}',name)
    page.wait_for_function('v.readyState>=2')
    page.evaluate('v.play()')
    page.wait_for_function('v.currentTime>.4')
    result=page.evaluate('({duration:v.duration,width:v.videoWidth,height:v.videoHeight,playing:!v.paused,audioBytes:v.webkitAudioDecodedByteCount,error:v.error})')
    for t in [8.8,9.5,26.8,28.4,30.2,32.5,34.1,41.5,43.3,44.35]:
        print('seek',t,flush=True)
        page.evaluate('(t)=>{v.pause();v.currentTime=t}',t)
        page.wait_for_function('(t)=>!v.seeking&&Math.abs(v.currentTime-t)<.05',arg=t)
        page.wait_for_function('v.readyState>=2')
        if t in [9.5,32.5,43.3]:page.screenshot(path=f'/tmp/kairos-native-{t}.png')
    result['errors']=errors
    assert not errors and not result['error']
    assert result['duration']<=45 and result['audioBytes']>0
    print(json.dumps(result,indent=2))
    browser.close()
