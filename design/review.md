# Review log

## Before animation
V1 preserved at commit 3a6908e. Reused schema, local assets, grain, cover crop, lock and connector primitives. V1's synthetic trace and implied clock clue are not used by V2. Real MP3 validated before design; measurement generated before animation.

## First structural review
The first pass uses a single continuous frame, but risks becoming too border-led. Check crop size and repeated card content against the board. The two large typographic claims must dominate required information; secondary archival captions are atmosphere. Avoid interpreting those captions as film evidence.

## Render environment
Official Remotion skills installed through `npx remotion skills add`. Browser download blocked by restricted host policy (remotion.media, HTTP 403). The official remotion-render skill requires explicit user request before selecting a different browser. User has been asked whether installed Chromium may be used; no implicit override is made by the V2 renderer. Studio inspection uses installed Chromium to inspect the web interface, independently of rendering.

## Studio inspection iteration 1
Inspected the actual 1080×1920 composition inside Studio at 6.85, 14.6, 24.5, 31.9, 39.2 and 44.35 seconds. The first pass had a genuine hierarchy failure: date and frame drifted upward under the second headline. Replaced the long layout interpolation with short event-local pose changes; the title now keeps its negative space until the puzzle impact. Fixed the Studio props extraction by using literal defaults on the V2 registration. Removed zero-progress typographic slivers. No JavaScript errors on the corrected six-state inspection.

## Studio inspection iteration 2
The compression frame revealed a collision between the date caption and an unnecessary extra line of copy. Removed the extra copy and removed the date during compression; it only returns on the measured final-cluster hit. This makes the central archive the sole focal object. The closing question and domain are clean and legible in the preview. Sound-enabled exported draft and beat-board review remain mandatory; these preview checks are not being called a finished film.

## Validation status before export permission
- `npm install` / package lock update: passed.
- `npm run typecheck`: passed.
- `npm run check:v2 -- --source-only`: passed.
- `npm run studio -- --no-open`: active at http://localhost:3333; actual V2 preview inspected; props editor works after literal-default correction.
- Real MP3 decode and analysis: passed. First-44.8s stereo peak at gain 0.65 is 0.651, leaving headroom.
- `npm run render`: attempted with the bundled browser; failed before rendering with `EAI_AGAIN remotion.media`. Independent HTTPS check through the configured proxy returns 403 for the download host.
- Beat-board / sound-enabled exported draft / master MP4: not generated yet. No silent replacement or claim of final creative approval is made.
- Next authorized step: bundled-browser access, or explicit user request to use installed Chromium; then beat-board, draft review, iteration and final render/PCM correlation check.

## Export permission and first actual draft
User explicitly authorized `/usr/bin/chromium` for Remotion rendering and review. Beat-board rendered first, then the actual sound-enabled 540×960 draft. Initial exported draft: 44.800000s, H.264 + AAC, 3,809,870 bytes. Master PCM correlation after decode: 0.99996847. This is an audio-integrity check, not an aesthetic score.

Reviewed decoded MP4 frames across the whole timeline at 0.75s intervals, the engine at 0.4s intervals and ending at 0.2s intervals, alongside frame-change curves. Actual visual defects found:
- First headline lines drifted through one another at 8.75–9.5s. Held their reading positions and masked their exit instead; lowered the evolving rule to avoid striking through AVAIT.
- Files cards repeated too literally in the showcase. Replaced their internal content during the same persistent frame morph: artwork strips → collapsed rule → full image band → KAIROS image-type aperture → six crop cells → single locked archive.
- Date captions collided with waveforms in the engine and the final-cluster card header. Moved date clear of the audio line and suppressed its caption while fragmented / on the final recall.
- Cover dimmed gradually before the climax, weakening the image. It now stays present until the deliberate collapse.
- A shrinking frame lingered under TU L'AS VU ?. The system now disappears on the measured 42.793s snap before the question enters, leaving a clean end.
- Compression had a large unmotivated empty area. The lock becomes the dominant object there, closing during the measured late attacks.
- Opening restraint needed a focal micro-event. Added a measured travelling margin marker, not random shaking or a flashing effect.

The revised beat-board was inspected before the second draft. Its image-type aperture and triptych/grid now differ clearly from the archive card; the second headline remains readable; the end is uncluttered. No new explanation of the film or solved password was introduced.

## Second exported draft review
Reviewed the revised MP4 overview, engine and final-cluster sheets. The first headline no longer crosses itself; type remains readable while the archive opens. Image-strip / aperture / grid transformations are visibly distinct. The last frame no longer remains behind the question. The native Chromium player successfully played the actual H.264/AAC MP4 and sought all ten review positions, with audio decoded, duration 44.8s and no video or JS error. The initial native seek issue came from the local development server's missing Range behavior, so playback testing now loads the complete MP4 as a Blob before seeking.

One final defect remained: the waveform's upper edge touched the bottom of the opening hook. Moved its initial entry below the archive while keeping the later measured transitions. Regenerated the final beat-board and delivery draft after this correction. The evaluation favors clear reading holds over arbitrary constant movement; the frame-change metric is diagnostic, not a quality score. The intentionally quiet opening is retained in accordance with the musical macro structure.

## Delivery-draft gate before master
Regenerated the draft after the trace correction, inspected its decoded 9.5s and 43.3s frames and repeated the ten-position native Chromium playback check. The trace is now separated from the hook and file title. The question is on near-black without residual frame or interface chrome. Native result: 44.8s, 540×960, audible track decoded, no media error, no JS error. Only after this review was the 1080×1920 master started. The master uses PNG intermediate frames (draft uses JPEG) to avoid an extra lossy stage around fine typography.

## Creative judgment
The strongest section is now the artwork's passage through strips, the collapsed rule and the typographic aperture; it recalls the same asset without reading as identical UI cards. The opening is deliberately slow and asymmetric, with a travelling margin marker rather than constant noise. The second claim has a longer reading hold. Compression has a single lock-centered focal object; the question and sole domain CTA stay clean. This is a restrained editorial treatment, not a dense flashy montage. These are visual judgments from the rendered material, separate from codec/typecheck success; publication and audience response remain the user's creative decision.

## Final master validation
- Final file: `out/HiddenClueTrailer-v2.mp4`, 9,568,265 bytes.
- Actual MP4 duration: 44.800000 seconds; 1344 video frames; 1080×1920; 30fps; H.264 High / yuv420p, stereo AAC 48kHz.
- Full FFmpeg decode completed without errors. Native Chromium playback / ten seeks passed at the full master dimensions, audio decoding confirmed, no JS/media error.
- Actual decoded soundtrack correlation with the supplied master: 0.9999684738003887. No silent substitute. Entry/exit de-click envelopes and gain 0.65 preserve the real track.
- Final 9.5s hook, 32.5s type aperture and 44.35s domain frames inspected at 1080×1920. The opening typography and waveform remain separated; the aperture reads; the closing frame is clean.
- Same-frame PNG repeat checks passed during beat-board generation. Typecheck and source/narrative checks passed. Restricted sandbox prevented one Node ffprobe subprocess wait; reran the complete validation outside that restriction successfully without code workaround.
- Delivery draft: 44.800000 seconds, 540×960, 3,763,918 bytes. Beat-board: 1,779,755 bytes. Full measurements and SHA-256 hashes are in `out/HiddenClueTrailer-v2-validation.json`.
- No production deployment, no merge into main, no site-repository modification. Only motion-v2 is pushed.
