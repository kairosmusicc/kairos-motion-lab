# KAIROS MOTION LAB

Independent React / TypeScript / Remotion studio. **V2: HiddenClueTrailer-v2**, 1080×1920, 30fps, 1344 frames / 44.800 seconds. V1 remains under the Studio `Prototype` folder, with its original code and 9.5-second timeline. This repository never imports runtime assets from kairos-experience and does not modify that project.

## Install / preview / render

Node 22+, npm, FFmpeg and Python 3 with Pillow for the contact sheet. Remotion packages are pinned to **4.0.541**. Fonts and the genuine music master are local.

```sh
npm install
npm run typecheck
npm run studio -- --no-open
# Open the exact localhost URL printed by Studio.
npm run check:v2 -- --source-only
npm run stills
npm run draft
npm run render
npm run check:v2
```

The default renderer uses Remotion's bundled browser (`npx remotion browser ensure`). In this managed environment the download host remotion.media is blocked. If a user explicitly authorizes a compatible system Chromium, set `REMOTION_BROWSER_EXECUTABLE=/usr/bin/chromium` for the render commands. No system-browser override is selected automatically by the V2 script.

Outputs:

- `out/HiddenClueTrailer-v2-beat-board.png` — 18 measured-state thumbnails, includes same-frame determinism check.
- `out/HiddenClueTrailer-v2-draft.mp4` — 540×960, real soundtrack, 30fps, 44.8 seconds.
- `out/HiddenClueTrailer-v2.mp4` — H.264 / yuv420p / AAC, 1080×1920 / 30fps / 44.8 seconds, FFmpeg faststart remux.
- Each video has a manifest with actual master SHA-256, props and measured musical events.

V2 refuses a missing, silent-substitute or changed master. `npm run check:v2` checks dimensions, codec, frame count, duration and the actual decoded soundtrack against the master PCM (correlation >0.95). It also checks the props, central event bounds, source determinism and narrative constraints. These checks do not replace creative review of the board and sound-enabled draft.

## Analysis / design

```sh
python -m venv --system-site-packages .venv
.venv/bin/pip install -r scripts/analysis-requirements.txt
npm run analyze
```

`scripts/analyze-audio.py` decodes the first 45 seconds, measures log-spectral flux, onsets, beats, likely bars, strongest transients and half-second RMS energy. It writes `design/beat-grid.json` and `design/beat-grid.md`. The source is 109.830385 seconds decoded; MP3 container duration is 109.871020 seconds. Tempo estimates: 133.636 BPM at hop resolution, 133.295 BPM by autocorrelation refinement. A possible half-time interpretation and inferred bar phase are documented, not hidden.

- `design/creative-direction.md`: living-margin concept, palette, typography, motion grammar and narrative limits.
- `design/storyboard.md`: measured-state visual continuity and inspection frames.
- `design/review.md`: checkpoint findings and changes.
- `src/audio/beat-grid.ts`: typed named events derived from measured JSON, editorial offsets and master spec.
- `src/design/tokens.ts`: palette, font, spacing, stroke, radii and motion vocabulary.
- `experiments/hidden-clue-v2.json`: experiment metadata only; no analytics.

## Props / variants

The Zod schema and defaults live in `src/experiments/hooks.ts`. Keep `hookLine1`, `hookLine2`, `finalQuestion`, `cta`, `variant`, `suspenseLevel`. Audio properties choose the local analyzed master, start offset and gain. The art-directed V2 splits the default hook along semantic phrases; alternate text remains data and is not embedded as the main headline in JSX.

```sh
npm run render -- --props ./props.json
npm run render:v1
```

Do not change the V2 music without rerunning analysis and designing the synchronization. Gain is 0.65 to leave headroom on an over-full-scale decoded MP3; short frame-derived entry/exit de-click envelopes preserve the last actual hit. There are no invented sound effects or voiceovers.

## Structure / reuse

V2 reuses `ImageCrop`, `ConnectorLine`, `Lock`, `FilmGrain`, the props schema, composition registration and render/FFmpeg approach. Added `MorphFrame` (persistent changing edge), `MaskedType` (cropped typography), `EvidenceLabel` (shared annotation style) and `AudioTrace` (real PCM RMS window). Motion interpolation is stateless and lives in `src/motion/choreography.ts`. Every visual state derives from a Remotion frame. No runtime timers, unseeded randomness or CSS animations. No Three.js or extra animation engine.

V1 remains preserved in Git history at `3a6908e`; its legacy render/check scripts are retained for the prototype. V1's synthetic waveform and implied clock detail are not used in V2. V2 contains no film footage, no fabricated private messages, no solved password or unsupported film explanation.

## Asset provenance / licenses

Cover and phone assets are independent local copies; `public/assets/manifest.json` records provenance and SHA-256. Geist is locally hosted with its OFL; V1's DejaVu license is also bundled. The real audio is `public/assets/audio/tension-suspense.mp3`, SHA-256 recorded in the analysis. Source metadata credits **Music: Violation by Soundridemusic**, https://youtu.be/tT35z4DZb3M. Preserve this credit in publication captions; the video itself has only the requested domain CTA.

Official Remotion Agent Skills were installed with `npx remotion skills add`, and the create, markup, studio, render, docs and best-practices guidance was consulted. No platform analytics, external collection, production deployment or merge into main is part of this project.
