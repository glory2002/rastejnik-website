/**
 * Inline version of baby-2.svg (crawling baby reaching for a checkered block).
 * The block sits in its own <g className="baby-cube"> and the leading hand is
 * its own <circle className="baby-hand"> so both can be animated independently
 * on hover — see the keyframes in globals.css, triggered by the ancestor
 * Tailwind `group` class.
 */
export function BabyCrawlIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 126.22 105.16" className={className} aria-hidden="true">
      <defs>
        <style>{`.cls-1{fill:#f17996}.cls-2{fill:#f3ab53}.cls-3{fill:#1d8652}`}</style>
      </defs>
      <g className="baby-cube">
        <path
          className="cls-1"
          d="M27.85,105.16H0v-27.85h27.85v27.85ZM1.62,103.53h24.6v-24.6H1.62v24.6Z"
        />
        <g>
          <rect className="cls-3" x="23.53" y="78.88" width="2.74" height="2.74" />
          <rect className="cls-3" x="20.78" y="81.63" width="2.74" height="2.74" />
          <polygon
            className="cls-3"
            points="26.27 87.12 20.78 87.12 20.78 84.37 18.04 84.37 18.04 78.88 15.3 78.88 15.3 87.12 15.3 89.86 26.27 89.86 26.27 87.12"
          />
          <rect className="cls-3" x="1.58" y="100.83" width="2.74" height="2.74" />
          <rect className="cls-3" x="4.32" y="98.09" width="2.74" height="2.74" />
          <polygon
            className="cls-3"
            points="1.58 95.35 7.06 95.35 7.06 98.09 9.81 98.09 9.81 103.58 12.55 103.58 12.55 95.35 12.55 92.6 1.58 92.6 1.58 95.35"
          />
          <rect className="cls-1" x="1.58" y="78.88" width="2.74" height="2.74" />
          <rect className="cls-1" x="4.32" y="81.63" width="2.74" height="2.74" />
          <polygon
            className="cls-1"
            points="9.81 78.88 9.81 84.37 7.06 84.37 7.06 87.12 1.58 87.12 1.58 89.86 9.81 89.86 12.55 89.86 12.55 78.88 9.81 78.88"
          />
          <rect className="cls-1" x="23.53" y="100.83" width="2.74" height="2.74" />
          <rect className="cls-1" x="20.78" y="98.09" width="2.74" height="2.74" />
          <polygon
            className="cls-1"
            points="18.04 103.58 18.04 98.09 20.78 98.09 20.78 95.35 26.27 95.35 26.27 92.6 18.04 92.6 15.3 92.6 15.3 103.58 18.04 103.58"
          />
          <rect
            className="cls-1"
            x="12.55"
            y="89.86"
            width="2.74"
            height="2.74"
            transform="translate(105.15 77.31) rotate(90)"
          />
        </g>
      </g>
      <path
        className="cls-3"
        d="M54.96,40.97l-19.99,29.73,10,8.2,12.56-18.97,4.87,4.87v17.69h13.58v-14.35h14.1v.74c0,6.53,5.29,11.82,11.82,11.82h21.35c2.42,0,3.83-2.74,2.42-4.7l-3.6-5.01c-.93-1.3-2.44-2.07-4.04-2.07h-11.03v-15.59c0-6.76-5.54-12.21-12.3-12.08-15.39.29-39.73.61-39.73-.26Z"
      />
      <circle className="cls-2" cx="28.17" cy="31.51" r="4.59" />
      <circle className="cls-2" cx="77.79" cy="31.51" r="4.59" />
      <path
        className="cls-2"
        d="M45.77,3.87h14.43c9.71,0,17.6,7.88,17.6,17.6v12.77c0,9.26-7.52,16.78-16.78,16.78h-16.07c-9.26,0-16.78-7.52-16.78-16.78v-12.77c0-9.71,7.88-17.6,17.6-17.6Z"
      />
      <g>
        <circle cx="40.23" cy="31.51" r="3.37" />
        <circle cx="65.73" cy="31.51" r="3.37" />
        <path d="M53.62,45.21c-2.39,0-4.53-1.6-5.21-3.89l1.39-.41c.5,1.68,2.07,2.85,3.82,2.85s3.32-1.17,3.82-2.85l1.39.42c-.68,2.29-2.83,3.88-5.21,3.88Z" />
      </g>
      <circle className="cls-2 baby-hand" cx="39.01" cy="76.02" r="7.08" />
      <circle className="cls-2" cx="69.08" cy="81.64" r="7.08" />
      <polygon
        className="cls-3"
        points="60.89 3.64 57.25 0 53.62 3.64 49.98 0 46.34 3.64 53.62 10.91 60.89 3.64"
      />
    </svg>
  );
}
