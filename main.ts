// Deadpan forecast for a city that does not exist.
// Writes exactly one line (1-160 chars) to /output/entry.txt,
// or to $MAKEFUN_OUTPUT_DIR/entry.txt when that variable is set.
import { mkdirSync, writeFileSync, rmSync, readdirSync } from "node:fs";
import { join } from "node:path";

const FORECAST =
  "In Blorven, expect light rain of small umbrellas this afternoon, 19 degrees, with a 40% chance the umbrellas arrive already open and judging you.";

function fail(message: string): never {
  console.error(`error: ${message}`);
  process.exit(1);
}

const chars = [...FORECAST];
if (FORECAST.length === 0 || FORECAST.trim().length === 0) {
  fail("forecast line is empty or only whitespace");
}
if (chars.length < 1 || chars.length > 160) {
  fail(`forecast line is ${chars.length} characters, outside the 1-160 range`);
}
if (FORECAST.includes("\n") || FORECAST.includes("\r")) {
  fail("forecast line must be a single line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
// Clear only the contents of the output dir, never the dir itself.
for (const entry of readdirSync(outDir)) {
  rmSync(join(outDir, entry), { recursive: true, force: true });
}

writeFileSync(join(outDir, "entry.txt"), FORECAST, "utf8");
console.log(`wrote ${chars.length} characters to ${join(outDir, "entry.txt")}`);
