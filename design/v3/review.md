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

## Limits of supplied reference material
The separate Guess photograph and motion screen recording were not found. The actual filmed watch is used without claiming an exact brand/dial reading or inventing product detail. The available blue illustrated artist logo was deliberately omitted from the picture to keep the neutral palette; a small text credit is used. The 4:3 proxies limit macro detail; no generated photo or artificial reconstruction substitutes for them.

## Revised draft gate
The revised MP4 was decoded and sampled again over the whole timeline, with denser transition/end samples. The real wrist is present in the opening, the consultation face stays inside its crop, and dialogue subtitles are excluded. The native Chromium player played audio and sought the review positions without JS/media error. The second draft revealed a delivery-format issue: default JPEG encoding retained a full-range BT.601 tag. Converted the draft correctly to limited-range Rec.709 with FFmpeg and set Remotion's documented colorSpace='bt709' for all subsequent V3 exports. This changes encoding, not the narrative or source selection.

Normalized draft: 540×960, 30fps, 1344 frames, 44.800s, H.264 yuv420p/Rec.709 + AAC; 5,753,639 bytes. Actual decoded master-audio correlation: 0.9999684738003887. Original and derived source hashes verified. Only after this review was the full-resolution PNG-intermediate master started.

## Creative judgment
The wrist is a recognizable recurring detail rather than a fictional password device. The transition from circumference to rails gives the journey a visual rule. The consultation wide/close and recurring wrist provide a late question, not a plot explanation. The sharp hook and final action are readable on a phone; the middle lets pictures carry information rather than adding large explanatory copy. The source's own rupture is kept in a controlled aperture and desaturated rather than supplemented with a glitch pack. The remaining limitation is the supplied proxy resolution, especially for macro watch detail; the absent Guess photograph and motion reference are not claimed to have been used.

## Final delivery validation
- Final master: 44.800000s, 1344 frames, 1080×1920, 30fps, H.264 yuv420p / Rec.709 limited range, stereo AAC; 15,537,243 bytes.
- Real-master decoded PCM correlation: 0.9999684738003887. The supplied soundtrack is present, not a silent placeholder or substitute. Only the soundtrack is mixed; prepared picture clips are silent and muted in Remotion.
- Full FFmpeg decode: no error. Chromium native playback and ten seeks: no JS/media error, audio decoded at full master dimensions.
- Full-resolution master frames at 20.8s (three train windows), 36.6s (consultation face) and 43.9s (CTA) inspected. The crop changes survive full-resolution export and the final action is clean.
- Same-frame still repeat passed during both beat-board generations. Typecheck and original/derived source hash checks passed. The Studio loads the V3 composition and editable props without JS error.
- Delivery draft: 44.8s / 540×960 / 5,753,639 bytes. Beat-board: 2,104,346 bytes. Storyboard source sheet: 1,336,225 bytes.
- Main hook, question and CTA remain data props. No unrelated app lore, arbitrary password, invented film dialogue, analytics or production deployment was introduced. V1/V2 source and exports remain preserved.
