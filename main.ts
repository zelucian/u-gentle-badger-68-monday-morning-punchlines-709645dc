/**
 * Entry: "Monday Morning Punchlines" (make.fun one-line competition)
 *
 * Theme: ONE joke about Monday mornings, written to entry.txt.
 * Gate: UTF-8, 1–200 characters, not only whitespace.
 *
 * Final line (65 characters):
 *   Monday morning hit me so hard, my coffee filed for workers' comp.
 *
 * Self-judge summary (3 rounds against the judge's criteria: about Monday
 * mornings; a real laugh with a landing punchline, not a complaint; a
 * surprising twist; few words, no wasted setup; fresh, no Monday clichés):
 * - Round 1: eliminated list/complaint lines and a long three-alarms line
 *   (list structure, soft twist).
 * - Round 2: eliminated "Monday morning is the weekend's way of telling you
 *   the free trial is over" (subscription cliché) and a software-update
 *   metaphor line (familiar, wasted setup).
 * - Round 3: champion beat the strongest rival, "On Monday morning, my
 *   motivation checked into witness protection." — the rival's premise
 *   (missing motivation) is itself a Monday cliché, while the champion uses
 *   a concrete physical setup whose injury logic pays off in a specific,
 *   unexpected legal punchline, in fewer words.
 */

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE = "Monday morning hit me so hard, my coffee filed for workers' comp.";

function assertValidLine(line: string): void {
  if (line.length < 1 || line.length > 200) {
    throw new Error(`Line length ${line.length} is outside 1–200 characters.`);
  }
  if (line.trim().length === 0) {
    throw new Error("Line must not be only whitespace.");
  }
  if (line !== line.trim()) {
    throw new Error("Line must not have leading or trailing whitespace.");
  }
  if (line.includes("\r") || line.includes("\n")) {
    throw new Error("Line must not contain CR or LF characters.");
  }
}

assertValidLine(LINE);

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outputDir, { recursive: true });
const outputPath = join(outputDir, "entry.txt");
writeFileSync(outputPath, LINE, "utf8");

const written = readFileSync(outputPath, "utf8");
if (written !== LINE) {
  throw new Error(`Read-back mismatch: wrote ${JSON.stringify(LINE)}, read ${JSON.stringify(written)}.`);
}
