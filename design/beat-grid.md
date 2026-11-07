# Master analysis

- Decoded duration: 109.830385s; MP3 container: 109.871020s.
- Tempo: 133.636 BPM (hop quantized), refined 133.295 BPM.
- Analysis: first 45s; mono 22050Hz; FFT 1024; hop 220 (~9.98ms).
- Final cut: 44.800s, 1344 frames at 30fps. Last measured attack 44.738s.
- No half-second RMS window falls below −50dBFS: restraint is musical, not digital silence.
- Beat/bar inference is uncertain; do not claim the bar grid is ground truth.

## Named measured attacks

| Event | Seconds | Nearest 30fps frame |
|---|---:|---:|
| openingHit | 0.639 | 19 |
| firstReveal | 6.336 | 190 |
| systemOpen | 10.237 | 307 |
| falseResolution | 15.944 | 478 |
| destabilize | 19.835 | 595 |
| unnoticed | 24.045 | 721 |
| puzzleStart | 25.542 | 766 |
| puzzleTurn | 26.440 | 793 |
| puzzleFold | 27.937 | 838 |
| puzzlePeak | 33.644 | 1009 |
| compression | 35.140 | 1054 |
| compressAgain | 37.545 | 1126 |
| closeIn | 38.443 | 1153 |
| finalCluster | 40.837 | 1225 |
| finalCompress | 42.334 | 1270 |
| finalSnap | 42.793 | 1284 |
| collapse | 43.840 | 1315 |
| finalImpact | 44.738 | 1342 |

## Energy and sections

- uneasy-start (0.00–6.34s): Sparse onset; tension rises; no literal silence.
- system-opens (6.34–15.94s): Discrete attacks open the visual system.
- false-understanding (15.94–25.54s): Large onset at 19.84 disrupts the apparent resolution.
- puzzle-engine (25.54–35.14s): Repeated attacks and rising density; alternate micro and macro responses.
- compression (35.14–40.84s): Convergence; continuous low-frequency tension remains.
- peak-collapse (40.84–44.80s): Dense attack cluster; final measured hit precedes the 44.8s cut.

## Method and reproducibility

Run `.venv/bin/python scripts/analyze-audio.py`. JSON stores the complete estimated beat grid, 45 strongest onsets, half-second RMS/dBFS curve and real waveform envelope. Visual events use measured attacks; the tempo does not manufacture a regular grid.

## Source credit

Music: Violation by Soundridemusic. Source metadata links https://youtu.be/tT35z4DZb3M. Retain attribution in publication captions. No source artwork/attached video image is used.
