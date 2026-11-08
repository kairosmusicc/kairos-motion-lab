# V3 review / changelog

## Source truth
Inspected source boards across the picture proxy and all six excerpts, then full-size watch, message and consultation frames. Proxy picture ends at 81.9s; complementary clips contain the later rupture and consultation. Misleading clip names were corrected in the shot selection rather than trusted. The only re-typeset message is a verified on-screen fragment at proxy 70s. Exact in/out points, original and derived hashes are in source-moments.json.

## First real draft
Rendered sound-enabled MP4 after a first designed board. Reviewed decoded overview frames across the full 44.8s, plus dense transition and ending samples. Native Chromium playback and seeking succeeded; real audio decoded, no media or JS error. The first board also exposed an API issue: current @remotion/media requires objectFit as a prop, not just a style; fixed before the actual draft.

Visible weaknesses and changes:
- Watch-detail entrance initially showed the table before the wrist. Trimmed the macro to the genuine 11.7–13.3s moment so the first image contains the watch.
- Source captions survived a shallow bottom crop and exposed unnecessary dialogue. Deepened the crop for non-watch clips; retained only the actual message artwork and its verified typographic fragment.
- The consultation close-up was centered on the torso, losing the face. Moved its crop to the real face and changed the wide room window to retain the subject and candle.
- Entry keyframes waited before moving, making several responses late to the music. Moved target poses to the actual named attacks, retaining a short controlled settlement.
- An empty dial floated below the message. Suppressed it there; it returns as architectural rails, then aligns with the rupture and consultation windows.
- V2's cards, album-art mystery, arbitrary codes and website CTA are absent from this composition. No new private messages or diagnosis were invented.

The revised beat-board has recognizably different focal structures: circular filmed wrist, verified message and face, walking/street split, three train panels, slipping frame, consultation wide/close, clean final question. The actual film, rather than an unrelated interface fiction, now carries the curiosity gap.

## Initial delivery limits (before references were supplied)
The separate Guess photograph and motion screen recording were not found. The actual filmed watch is used without claiming an exact brand/dial reading or inventing product detail. The available blue illustrated artist logo was deliberately omitted from the picture to keep the neutral palette; a small text credit is used. The 4:3 proxies limit macro detail; no generated photo or artificial reconstruction substitutes for them.

## Revised draft gate
The revised MP4 was decoded and sampled again over the whole timeline, with denser transition/end samples. The real wrist is present in the opening, the consultation face stays inside its crop, and dialogue subtitles are excluded. The native Chromium player played audio and sought the review positions without JS/media error. The second draft revealed a delivery-format issue: default JPEG encoding retained a full-range BT.601 tag. Converted the draft correctly to limited-range Rec.709 with FFmpeg and set Remotion's documented colorSpace='bt709' for all subsequent V3 exports. This changes encoding, not the narrative or source selection.

Normalized draft: 540×960, 30fps, 1344 frames, 44.800s, H.264 yuv420p/Rec.709 + AAC; 5,753,639 bytes. Actual decoded master-audio correlation: 0.9999684738003887. Original and derived source hashes verified. Only after this review was the full-resolution PNG-intermediate master started.

## Initial delivery creative judgment
The wrist is a recognizable recurring detail rather than a fictional password device. The transition from circumference to rails gives the journey a visual rule. The consultation wide/close and recurring wrist provide a late question, not a plot explanation. The sharp hook and final action are readable on a phone; the middle lets pictures carry information rather than adding large explanatory copy. The source's own rupture is kept in a controlled aperture and desaturated rather than supplemented with a glitch pack. The remaining limitation is the supplied proxy resolution, especially for macro watch detail; the absent Guess photograph and motion reference are not claimed to have been used.

## Initial delivery validation (d2e361b)
- Final master: 44.800000s, 1344 frames, 1080×1920, 30fps, H.264 yuv420p / Rec.709 limited range, stereo AAC; 15,537,243 bytes.
- Real-master decoded PCM correlation: 0.9999684738003887. The supplied soundtrack is present, not a silent placeholder or substitute. Only the soundtrack is mixed; prepared picture clips are silent and muted in Remotion.
- Full FFmpeg decode: no error. Chromium native playback and ten seeks: no JS/media error, audio decoded at full master dimensions.
- Full-resolution master frames at 20.8s (three train windows), 36.6s (consultation face) and 43.9s (CTA) inspected. The crop changes survive full-resolution export and the final action is clean.
- Same-frame still repeat passed during both beat-board generations. Typecheck and original/derived source hash checks passed. The Studio loads the V3 composition and editable props without JS error.
- Delivery draft: 44.8s / 540×960 / 5,753,639 bytes. Beat-board: 2,104,346 bytes. Storyboard source sheet: 1,336,225 bytes.
- Main hook, question and CTA remain data props. No unrelated app lore, arbitrary password, invented film dialogue, analytics or production deployment was introduced. V1/V2 source and exports remain preserved.

## Supplied-reference follow-up
The user identified reference paths on motion-v2. A fresh fetch found new commits through b565a8b: Guess photo, motion reference and the same existing artist logo. Film-source blobs are unchanged. Restored only these supplied references, without merging branches or touching main.

Studied the full 19.983s reference through 25 frame samples. Its useful principles are semantic object continuity, foreground occlusion and hierarchy. Added a four-sector bezel from the original Guess photograph, first inspected at 1.5s and 8s. The calendar/brand/hand-reading area is excluded; no product date becomes a film clue. Reused the ring at the late wrist recall. Replaced the message's generic shutter with the opening bezel, removed redundant shutters and gave the consultation transition a horizontal table-edge reveal. Source footage and narration remain unchanged.

HQ clarification: the carriage (proxy 57–64s) and notification (68.9–71.9s) have no matching HQ excerpt among supplied files. The file named train.mp4 is the outdoor rupture. Both proxy exceptions are explicitly recorded; every other selected film moment uses the supplied HQ excerpts.

Reference-draft inspection found an unintended street insert at the end of the original watch selection. Checked the actual cut in journey.mp4 at 0.1s intervals: the wrist remains through 12.8s, street begins at 12.9s. Tightened the selected source out to 12.8s and held its final genuine frame for 0.6s to preserve the choreography. Extended the macro derivative to 1.7s with that held tail, so it remains valid through the hook transition. No original source file is changed.

## Supplied-reference revised draft gate
The revised 44.8s draft was played in native Chromium and sampled again at the wrist/message handover. The street-cut artifact is absent; the gold sectors separate around the genuine filmed wrist and give way to the message window. Calendar, dial reading and brand lettering remain excluded. Redundant shutters were removed so the object transition carries the movement. This improves continuity without adding a new narrative claim.

Draft: 540×960, 30fps, 1344 frames, H.264 Rec.709 limited range + AAC; 4,513,938 bytes. Real-master PCM correlation: 0.9999684738003887. Native playback and ten seeks: no media or JS error. Repeat rendering at 9.2s (with the supplied watch photograph active) produced identical PNG hashes. The full master was started only after this review.

## Supplied-reference master delivery
Final revised master: 44.800s, 1080×1920, 30fps, 1344 frames, H.264 yuv420p / Rec.709 limited range + AAC; 15,619,703 bytes. SHA256: c050b12af50742f87b2f773c21e3d4b98474bbe2e2de3868143c8e0918d32ca7. Real-master decoded PCM correlation: 0.9999684738003887. Full FFmpeg decode completed without error; Chromium played the 1080×1920 MP4 and sought ten positions without JS or media errors.

Inspected final-export frames at 10.15s, 34.4s and 43.9s: the watch insert stays on the genuine wrist, the cabinet view keeps the subject and candle, and the closing action is readable. The updated board was reviewed as a whole for hierarchy and spatial continuity. The design alternates circular detail, message window, architectural panels, controlled perceptual slip and the room reveal; it avoids repeating centered title cards. This is a restrained graphic teaser, not a plot solution. The two proxy-only shots remain the visible source-quality limitation.

Deliverables: master 15,619,703 bytes; sound-enabled draft 4,513,938 bytes; beat-board 2,128,039 bytes; source storyboard 1,336,226 bytes. Typecheck, source/reference hash checks, deterministic repeated still and diff whitespace checks passed. No unrelated lore, invented dialogue, arbitrary code or film explanation was added. No main merge or production deployment.
