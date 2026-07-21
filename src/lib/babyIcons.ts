import fs from "fs";
import path from "path";

/**
 * Baby illustrations are added one at a time (baby-1.svg, baby-2.svg, ...).
 * Reading the actual files lets each new one automatically join the
 * rotation for every age card instead of needing a code change per icon.
 */
export function getBabyIcons(): string[] {
  const imagesDir = path.join(process.cwd(), "public", "images");
  const files = fs
    .readdirSync(imagesDir)
    .filter((file) => /^baby-\d+\.svg$/.test(file))
    .sort(
      (a, b) =>
        Number(a.match(/\d+/)![0]) - Number(b.match(/\d+/)![0]),
    );
  return files.length > 0 ? files.map((file) => `/images/${file}`) : [];
}
