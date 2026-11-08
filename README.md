# KAIROS MOTION LAB — V3

The latest composition is **HiddenClueTrailer-v3**, a film-derived vertical teaser. It preserves the Remotion engine and older compositions but replaces V2's archive/phone-fiction direction with genuine film images: wrist, message, journey, train windows, perceptual rupture and consultation. The picture ends with **Regarde encore.** Target: https://www.instagram.com/reel/DfFiuwHIyyN/ (kept in metadata and caption, not printed as a long URL in the video).

## V3 commands

```sh
npm install
npm run prepare:v3
npm run typecheck
npm run studio -- --no-open
export REMOTION_BROWSER_EXECUTABLE=/usr/bin/chromium
npm run stills:v3
npm run draft:v3
npm run check:v3 -- out/HiddenClueTrailer-v3-draft.mp4
npm run render:v3
npm run check:v3
```

Chromium is the explicitly user-authorized fallback in this managed environment. On an unrestricted machine, omit the environment variable to use Remotion's bundled browser. Remotion 4.0.541 / React / TypeScript; no new animation engine or 3D library.

Final spec: 1080×1920 / 30fps / 44.8s / H.264 yuv420p limited-range Rec.709 + real AAC soundtrack. Master uses PNG intermediate frames. FFmpeg finalizes faststart; film audio is muted in both prepared assets and composition. The suspense master is SHA-256 checked before rendering, then compared against the decoded MP4 audio. No silent placeholder is permitted.

### V3 deliverables

- `out/HiddenClueTrailer-v3.mp4`
- `out/HiddenClueTrailer-v3-draft.mp4`
- `out/HiddenClueTrailer-v3-beat-board.png`
- `out/HiddenClueTrailer-v3-storyboard.png` — source frames with local file timecodes.
- `out/HiddenClueTrailer-v3-caption.txt` — actual destination link for publication.
- Manifests and validation JSON next to the MP4s.

### Source truth / design

- `design/v3/creative-direction.md`, `storyboard.md`, `beat-grid.md` / `.json`, `review.md`.
- `design/v3/source-moments.json`: exact source file in/out, descriptive content, original/derived SHA-256 and macro crop provenance.
- `src/audio/v3-timeline.ts`: named events from the already-analyzed real master, not invented beats.
- `src/compositions/HiddenClueTrailerV3/`: FilmWindow (shared video/crop clock), Dial (watch-derived geometry), props and orchestration.
- `scripts/prepare-v3-sources.py`: short silent crops from supplied footage. Source files are never overwritten.

The proxy's picture is 81.9s, while its audio/container extends to 82.801s; late story material comes from the complementary excerpts. Do not infer scene identity from file names: `watch.mp4` is mostly waking/departure and `train.mp4` is the outdoor rupture. Actual train and notification shots come from the proxy. All quoted dialogue was verified on a real frame; no private conversation, diagnosis or hidden code was invented.

The supplied Guess photograph and motion reference are now fetched from origin/motion-v2 (b565a8b). The photo provides a four-sector metal bezel around genuine film footage; its product calendar and hand reading are masked, never used as invented clues. The motion recording guides semantic transforms, foreground masks and hierarchy; none of its footage appears in the teaser. Original hashes and roles are in `design/v3/references.json`. The artist logo matches the existing local copy; the picture retains only a small text credit. The project stays independent of kairos-experience at runtime, and that repository is unchanged.

HQ excerpts are used wherever available. Only the actual carriage and station notification remain proxy-sourced: no equivalent HQ views exist among the supplied files. HQ train.mp4 contains the outdoor rupture rather than the carriage. These two source-quality exceptions are documented explicitly.

V1/V2 are retained. Their original default `render`, `draft`, `stills`, `check` commands still target V2: use the explicit `*:v3` commands above for the latest piece.

---

# V2 preserved documentation

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

The default renderer uses Remotion's bundled browser (`npx remotion browser ensure`). In this managed environment the download host remotion.media is blocked. The user explicitly authorized installed Chromium for this task. In this managed environment, run `export REMOTION_BROWSER_EXECUTABLE=/usr/bin/chromium` before `npm run stills`, `npm run draft` and `npm run render`. No system-browser override is selected automatically by the V2 script.

Outputs:

- `out/HiddenClueTrailer-v2-beat-board.png` — 18 measured-state thumbnails, includes same-frame determinism check.
- `out/HiddenClueTrailer-v2-draft.mp4` — 540×960, real soundtrack, 30fps, 44.8 seconds.
- `out/HiddenClueTrailer-v2.mp4` — H.264 / yuv420p / AAC, 1080×1920 / 30fps / 44.8 seconds, FFmpeg faststart remux.
- Each video has a manifest with actual master SHA-256, props and measured musical events.
- `out/HiddenClueTrailer-v2-validation.json` records final ffprobe facts, audio correlation and artifact hashes.

The three V2 delivery artifacts and manifests are versioned on `motion-v2`; temporary review sheets, first-pass exports and V1 output remain ignored.

V2 refuses a missing, silent-substitute or changed master. `npm run check:v2` checks dimensions, codec, frame count, duration and the actual decoded soundtrack against the master PCM (correlation >0.95). It also checks the props, central event bounds, source determinism and narrative constraints. These checks do not replace creative review of the board and sound-enabled draft. `python scripts/review-draft.py` samples the actual decoded MP4 at overview and transition intervals; `python scripts/playback-smoke.py` tests the native Chromium player against a local `python -m http.server 4178 --bind 127.0.0.1`. The review log records visible defects and resulting changes.

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

The Zod schema and defaults live in `src/experiments/hooks.ts`. Keep `hookLine1`, `hookLine2`, `finalQuestion`, `cta`, `variant`, `suspenseLevel`. Audio properties choose the local analyzed master, start offset and gain. The art-directed V2 splits the default hook along semantic phrases; alternate text remains data and is not embedded as the main headline in JSX. Root.tsx has literal Studio defaults so its editor can save changes; the CLI uses the variant registry or `--props`. To export Studio-edited text through the CLI, save the props JSON and pass it with `--props`.

```sh
npm run render -- --props ./props.json
npm run render:v1
```

Do not change the V2 music without rerunning analysis and designing the synchronization. Gain is 0.65 to leave headroom on an over-full-scale decoded MP3; short frame-derived entry/exit de-click envelopes preserve the last actual hit. There are no invented sound effects or voiceovers.

## Structure / reuse

V2 reuses `ImageCrop`, `ConnectorLine`, `Lock`, `FilmGrain`, the props schema, composition registration and render/FFmpeg approach. Added `MorphFrame` (persistent changing edge), `MaskedType` (cropped typography), `EvidenceLabel` (shared annotation style), `AudioTrace` (real PCM RMS window) and `CoverTransform` (the same genuine artwork as strips, type aperture and six crop cells). Motion interpolation is stateless and lives in `src/motion/choreography.ts`. Every visual state derives from a Remotion frame. No runtime timers, unseeded randomness or CSS animations. No Three.js or extra animation engine.

V1 remains preserved in Git history at `3a6908e`; its legacy render/check scripts are retained for the prototype. V1's synthetic waveform and implied clock detail are not used in V2. V2 contains no film footage, no fabricated private messages, no solved password or unsupported film explanation.

## Asset provenance / licenses

Cover and phone assets are independent local copies; `public/assets/manifest.json` records provenance and SHA-256. Geist is locally hosted with its OFL; V1's DejaVu license is also bundled. The real audio is `public/assets/audio/tension-suspense.mp3`, SHA-256 recorded in the analysis. Source metadata credits **Music: Violation by Soundridemusic**, https://youtu.be/tT35z4DZb3M. Preserve this credit in publication captions; the video itself has only the requested domain CTA.

Official Remotion Agent Skills were installed with `npx remotion skills add`, and the create, markup, studio, render, docs and best-practices guidance was consulted. No platform analytics, external collection, production deployment or merge into main is part of this project.
