const PAIRS = [
  { a: "#E9B063", b: "#476ABF" },
  { a: "#1F8652", b: "#F27A97" },
] as const;

/** Contact-pattern shevitsa, rotated 45° into a diamond list mark. */
export function ListShevitsa({
  pair,
  className = "h-8 w-8 shrink-0 sm:h-9 sm:w-9",
}: {
  pair: 0 | 1;
  className?: string;
}) {
  const { a, b } = PAIRS[pair];

  return (
    <svg
      aria-hidden
      viewBox="-32 -32 211 212"
      className={className}
    >
      <g transform="rotate(45 73.3 73.757)">
        <path d="M146.607 147.228V130.965H130.443V147.228H146.607Z" fill={a} />
        <path d="M130.443 130.965V114.701H114.28V130.965H130.443Z" fill={a} />
        <path
          d="M97.832 147.514V114.701H113.996V98.152H146.607V81.889H81.385V147.514H97.832Z"
          fill={a}
        />
        <path d="M16.447 16.264V0H0.284V16.264H16.447Z" fill={a} />
        <path d="M32.611 32.527V16.264H16.447V32.527H32.611Z" fill={a} />
        <path
          d="M49.058 0V32.813H32.611V49.076H0V65.625H65.222V0H49.058Z"
          fill={a}
        />
        <path d="M146.607 16.264V0H130.443V16.264H146.607Z" fill={b} />
        <path d="M130.443 32.527V16.264H114.28V32.527H130.443Z" fill={b} />
        <path
          d="M146.607 49.076H113.996V32.813H97.832V0H81.385V65.625H146.607V49.076Z"
          fill={b}
        />
        <path d="M16.447 147.228V130.965H0.284V147.228H16.447Z" fill={b} />
        <path d="M32.611 130.965V114.701H16.447V130.965H32.611Z" fill={b} />
        <path
          d="M0 98.152H32.611V114.701H49.058V147.514H65.222V81.889H0V98.152Z"
          fill={b}
        />
        <path d="M65.222 81.889H81.385V65.625H65.222V81.889Z" fill={b} />
      </g>
    </svg>
  );
}
