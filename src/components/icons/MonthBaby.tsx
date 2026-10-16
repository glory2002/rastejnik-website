import fs from "fs";
import path from "path";

/**
 * Head groups are drawn at a similar size inside each file, but the viewBoxes
 * differ, so on the card some heads render almost twice as tall as others.
 * These factors bring the 0–1 year heads to about the same height.
 */
const HEAD_SCALE: Record<string, number> = {
  "14": 0.5,
  "15": 0.65,
  "16": 0.9,
  "17": 1.1,
  "19": 1.19,
  "20": 0.77,
  "21": 1.13,
  "22": 1.1,
  "23": 0.81,
  "24": 1.16,
  "25": 1.26,
};

/**
 * Inlines a month illustration so the head group (`.baby-head`) can animate.
 * An `<img>` would freeze that CSS. Class names are prefixed per file because
 * each SVG reuses `.cls-1`, `.cls-2`, … with different colors.
 */
export function MonthBaby({
  src,
  className,
}: {
  src: string;
  className?: string;
}) {
  const file = path.join(process.cwd(), "public", src.replace(/^\//, ""));
  const raw = fs.readFileSync(file, "utf8");
  const id = src.match(/month-(\d+)/)?.[1] ?? "x";
  const prefix = `m${id}-`;

  let svg = raw.replace(/<\?xml[^?]*\?>\s*/, "");
  svg = svg.replace(/\.cls-/g, `.${prefix}cls-`);
  svg = svg.replace(/class="([^"]*)"/g, (_, classes: string) => {
    const next = classes
      .split(/\s+/)
      .filter(Boolean)
      .map((name) => (name.startsWith("cls-") ? prefix + name : name))
      .join(" ");
    return `class="${next}"`;
  });
  svg = svg.replace(/\bid="[^"]*"/, `id="month-baby-${id}"`);
  svg = svg.replace(
    /<svg\b([^>]*)>/,
    `<svg$1 class="h-full w-full overflow-visible" aria-hidden="true" focusable="false">`,
  );

  const scale = (HEAD_SCALE[id] ?? 1) * 1.15;

  return (
    <span
      className={className}
      style={{ transform: `scale(${scale})` }}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
