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
