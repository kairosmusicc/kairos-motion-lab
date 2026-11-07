import { bundle } from "@remotion/bundler";
import {
  renderMedia,
  renderStill,
  selectComposition,
} from "@remotion/renderer";
import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { hiddenClueSchema, variants } from "../src/experiments/hooks";
import { beats, cues, durations, masterSpec } from "../src/audio/timeline";
import { frameAt } from "../src/motion/timing";

const args = process.argv.slice(2);
const value = (name: string) =>
  args.includes(name) ? args[args.indexOf(name) + 1] : undefined;
const variant = value("--variant") || "v1";
if (!variants[variant])
  throw new Error(`Unknown variant ${variant}. V1 only registers v1.`);
const overrides = value("--props")
  ? JSON.parse(readFileSync(value("--props")!, "utf8"))
  : {};
const candidates = readdirSync("public/assets/audio").filter((f) =>
  /^master-track\.(wav|mp3|m4a|aac|ogg)$/i.test(f),
);
if (candidates.length > 1 && overrides.audioSrc === undefined)
  throw new Error(
    "Keep one master-track file, or set audioSrc explicitly through --props.",
  );
const inputProps = hiddenClueSchema.parse({
  ...variants[variant],
  audioSrc: candidates[0] ? `assets/audio/${candidates[0]}` : null,
  ...overrides,
});
if (inputProps.audioSrc) {
  const location = path.resolve("public", inputProps.audioSrc);
  if (
    !location.startsWith(path.resolve("public/assets/audio") + path.sep) ||
    !existsSync(location)
  )
    throw new Error(
      "audioSrc must reference an existing public/assets/audio file.",
    );
}
const browserExecutable =
  process.env.CHROME_PATH ||
  (existsSync("/usr/bin/chromium") ? "/usr/bin/chromium" : null);
const out = path.resolve(value("--out") || "out");
mkdirSync(out, { recursive: true });
const base = `HiddenClueTrailer-${inputProps.variant}`;
console.log(
  `Bundling ${base}; ${inputProps.audioSrc ? "real master attached" : "silent placeholder — no master provided"}`,
);
const serveUrl = await bundle({
  entryPoint: path.resolve("src/index.ts"),
  publicDir: path.resolve("public"),
});
const composition = await selectComposition({
  serveUrl,
  id: "HiddenClueTrailer",
  inputProps,
  browserExecutable,
});
const points = [
  ["01-hook", cues.clueTitle + durations.titleReveal],
  ["02-evidence", cues.boardSettled + 0.3],
  ["03-hold", cues.unnoticedTitle + durations.titleReveal],
  ["04-puzzle", cues.nearReveal + 0.12],
  ["05-cta", cues.ctaIn + durations.ctaReveal],
] as const;
for (const [name, seconds] of points) {
  await renderStill({
    serveUrl,
    composition,
    inputProps,
    browserExecutable,
    frame: frameAt(seconds),
    imageFormat: "png",
    output: path.join(out, `${base}-${name}.png`),
  });
  console.log(`Still ${name} @ ${seconds.toFixed(2)}s`);
}
// A same-frame repeat tests deterministic rendering, including the seeded SVG grain.
const repeated = path.join(out, `${base}-repeat.png`);
await renderStill({
  serveUrl,
  composition,
  inputProps,
  browserExecutable,
  frame: frameAt(points[1][1]),
  imageFormat: "png",
  output: repeated,
});
const digest = (file: string) =>
  createHash("sha256").update(readFileSync(file)).digest("hex");
const deterministic =
  digest(repeated) === digest(path.join(out, `${base}-02-evidence.png`));
rmSync(repeated);
if (!deterministic)
  throw new Error("Same-frame PNG rendering is not deterministic.");
if (!args.includes("--stills-only")) {
  const intermediate = path.join(out, `.${base}-intermediate.mp4`);
  let last = -1;
  await renderMedia({
    serveUrl,
    composition,
    inputProps,
    browserExecutable,
    codec: "h264",
    crf: 17,
    pixelFormat: "yuv420p",
    imageFormat: "png",
    outputLocation: intermediate,
    concurrency: 2,
    onProgress: ({ progress }) => {
      const step = Math.floor(progress * 10);
      if (step !== last) {
        last = step;
        console.log(`Render ${Math.min(step * 10, 100)}%`);
      }
    },
  });
  const final = path.join(out, `${base}.mp4`);
  // FFmpeg remux: preserve the rendered pixels/audio, place moov first for social playback.
  execFileSync(
    "ffmpeg",
    [
      "-y",
      "-v",
      "error",
      "-i",
      intermediate,
      "-map",
      "0:v:0",
      "-map",
      "0:a?",
      "-c",
      "copy",
      "-movflags",
      "+faststart",
      "-metadata",
      `title=KAIROS — ${inputProps.variant}`,
      final,
    ],
    { stdio: "inherit" },
  );
  rmSync(intermediate);
  console.log(final);
}
writeFileSync(
  path.join(out, `${base}-manifest.json`),
  JSON.stringify(
    {
      composition: composition.id,
      width: composition.width,
      height: composition.height,
      fps: composition.fps,
      frames: composition.durationInFrames,
      durationSeconds: beats.end,
      audio: inputProps.audioSrc ? "master" : "silent-placeholder",
      inputProps,
      beats,
      cues,
      deterministicStill: deterministic,
      stills: points.map(([name, seconds]) => ({
        name,
        frame: frameAt(seconds),
        seconds,
      })),
      format: masterSpec,
    },
    null,
    2,
  ),
);
