const shevitsaTones = ["green", "pink", "blue", "orange"] as const;

/**
 * Square shevitsa mark.
 * Featured: two-color. Regular: monochrome green / pink / blue / orange.
 * Assembled at rest; outer pixels scatter when an ancestor is hovered.
 */
export function ShevitsaMark({
  index,
  featured = false,
  tone,
  className = "absolute z-[2]",
}: {
  index: number;
  featured?: boolean;
  tone?: (typeof shevitsaTones)[number];
  className?: string;
}) {
  const toneClass = featured
    ? index % 2 === 0
      ? " news-shevitsa--duo"
      : " news-shevitsa--duo-alt"
    : ` news-shevitsa--${tone ?? shevitsaTones[index % shevitsaTones.length]}`;

  return (
    <span
      aria-hidden
      className={`news-shevitsa pointer-events-none${toneClass} ${className}`}
    >
      <svg
        className="news-shevitsa__svg"
        viewBox="0 0 146.607 147.514"
        fill="none"
      >
        <g className="news-shevitsa__spark news-shevitsa__spark--far news-shevitsa__spark--br">
          <path
            className="news-shevitsa__a"
            d="M146.607 147.228L146.607 130.965L130.443 130.965L130.443 147.228L146.607 147.228Z"
          />
        </g>
        <g className="news-shevitsa__spark news-shevitsa__spark--br">
          <path
            className="news-shevitsa__a"
            d="M130.443 130.965L130.443 114.701L114.28 114.701L114.28 130.965L130.443 130.965Z"
          />
        </g>
        <path
          className="news-shevitsa__a"
          d="M97.8324 147.514L97.8324 114.701L113.996 114.701L113.996 98.1522L146.607 98.1522L146.607 81.8886L97.8324 81.8886L81.3852 81.8886L81.3852 147.514L97.8324 147.514Z"
        />
        <g className="news-shevitsa__spark news-shevitsa__spark--far news-shevitsa__spark--tl">
          <path
            className="news-shevitsa__a"
            d="M16.4472 16.2636L16.4472 2.85092e-06L0.283616 2.14439e-06L0.283615 16.2636L16.4472 16.2636Z"
          />
        </g>
        <g className="news-shevitsa__spark news-shevitsa__spark--tl">
          <path
            className="news-shevitsa__a"
            d="M32.6106 32.5274L32.6106 16.2638L16.447 16.2638L16.447 32.5274L32.6106 32.5274Z"
          />
        </g>
        <path
          className="news-shevitsa__a"
          d="M49.0579 2.14439e-06L49.0579 32.8125L32.6108 32.8125L32.6108 49.0761L1.60892e-06 49.0761L8.85548e-07 65.6251L49.0579 65.6251L65.2215 65.6251L65.2215 2.85092e-06L49.0579 2.14439e-06Z"
        />
        <g className="news-shevitsa__spark news-shevitsa__spark--far news-shevitsa__spark--tr">
          <path
            className="news-shevitsa__b"
            d="M146.607 16.2636L146.607 2.85092e-06L130.443 2.14439e-06L130.443 16.2636L146.607 16.2636Z"
          />
        </g>
        <g className="news-shevitsa__spark news-shevitsa__spark--tr">
          <path
            className="news-shevitsa__b"
            d="M130.443 32.5274L130.443 16.2638L114.28 16.2638L114.28 32.5274L130.443 32.5274Z"
          />
        </g>
        <path
          className="news-shevitsa__b"
          d="M146.607 49.0761L113.996 49.0761L113.996 32.8125L97.8324 32.8125L97.8324 7.18928e-07L81.3852 0L81.3852 49.0761L81.3852 65.6251L146.607 65.6251L146.607 49.0761Z"
        />
        <g className="news-shevitsa__spark news-shevitsa__spark--far news-shevitsa__spark--bl">
          <path
            className="news-shevitsa__b"
            d="M16.4472 147.228L16.4472 130.965L0.283616 130.965L0.283615 147.228L16.4472 147.228Z"
          />
        </g>
        <g className="news-shevitsa__spark news-shevitsa__spark--bl">
          <path
            className="news-shevitsa__b"
            d="M32.6107 130.965L32.6107 114.701L16.4471 114.701L16.4471 130.965L32.6107 130.965Z"
          />
        </g>
        <path
          className="news-shevitsa__b"
          d="M3.04321e-06 98.1522L32.6108 98.1522L32.6108 114.701L49.0579 114.701L49.0579 147.514L65.2215 147.514L65.2215 98.1522L65.2215 81.8886L3.75411e-06 81.8886L3.04321e-06 98.1522Z"
        />
        <path
          className="news-shevitsa__b"
          d="M65.2215 81.8889L81.3851 81.8889L81.3851 65.6253L65.2215 65.6253L65.2215 81.8889Z"
        />
      </svg>
    </span>
  );
}
