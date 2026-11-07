import { execFileSync } from "node:child_process";
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { createHash } from "node:crypto";
import { beats, cues, masterSpec } from "../src/audio/timeline";
import { hiddenClueSchema, variants } from "../src/experiments/hooks";
const assert = (condition: unknown, message: string) => {
  if (!condition) throw new Error(message);
};
assert(
  hiddenClueSchema.safeParse(variants.v1).success,
  "Default props invalid",
);
assert(
  !hiddenClueSchema.safeParse({ ...variants.v1, suspenseLevel: 2 }).success,
  "Out-of-range props accepted",
);
assert(beats.end >= 8 && beats.end <= 11, "Duration outside brief");
assert(
  Object.values(cues).every((t) => t >= 0 && t < beats.end),
  "Cue outside composition",
);
const walk = (dir: string): string[] =>
  readdirSync(dir, { withFileTypes: true }).flatMap((d) =>
    d.isDirectory() ? walk(path.join(dir, d.name)) : [path.join(dir, d.name)],
  );
for (const file of walk("src")) {
  const code = readFileSync(file, "utf8");
  assert(
    !/Date\.now\(|Math\.random\(/.test(code),
    `Non-deterministic source in ${file}`,
  );
  assert(
    !/animation\s*:|@keyframes/.test(code),
    `Wall-clock CSS animation in ${file}`,
  );
}
const assets = JSON.parse(readFileSync("public/assets/manifest.json", "utf8"));
for (const asset of assets.assets)
  assert(
    createHash("sha256")
      .update(readFileSync("public/assets/" + asset.path))
      .digest("hex") === asset.sha256,
    `Changed source asset ${asset.path}`,
  );
const output = process.argv[2] || "out/HiddenClueTrailer-v1.mp4";
const probe = JSON.parse(
  execFileSync(
    "ffprobe",
    [
      "-v",
      "error",
      "-count_frames",
      "-show_streams",
      "-show_format",
      "-of",
      "json",
      output,
    ],
    { encoding: "utf8" },
  ),
);
const video = probe.streams.find(
  (s: { codec_type: string }) => s.codec_type === "video",
);
assert(
  video.width === masterSpec.width && video.height === masterSpec.height,
  "Wrong master dimensions",
);
assert(video.avg_frame_rate === "30/1", "Wrong frame rate");
assert(
  Number(video.nb_read_frames) === Math.round(beats.end * masterSpec.fps),
  "Wrong frame count",
);
assert(
  Math.abs(Number(probe.format.duration) - beats.end) < 0.08,
  "Wrong output duration",
);
assert(
  video.pix_fmt === "yuv420p" && video.codec_name === "h264",
  "Not a social-ready H.264 output",
);
const manifest = JSON.parse(
  readFileSync(output.replace(/\.mp4$/, "-manifest.json"), "utf8"),
);
assert(manifest.deterministicStill, "Deterministic repeat failed");
const audio = probe.streams.some(
  (s: { codec_type: string }) => s.codec_type === "audio",
);
assert(
  audio === Boolean(manifest.inputProps.audioSrc),
  "Audio presence differs from supplied master",
);
console.log(
  `PASS ${video.width}×${video.height} / 30fps / ${video.nb_read_frames} frames / ${probe.format.duration}s / H.264; deterministic repeat; props, timing, source assets; ${audio ? "master audio" : "honest silent placeholder"}`,
);
