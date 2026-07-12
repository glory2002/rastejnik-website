/**
 * Inline version of baby-1.svg (seated baby holding a rattle).
 * The rattle is isolated in its own <g className="rattle-toy"> so it can be
 * animated independently — see the `.rattle-toy` keyframes in globals.css,
 * triggered by hovering the nearest ancestor with the Tailwind `group` class.
 */
export function BabyRattleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 66.34 65.92" className={className} aria-hidden="true">
      <defs>
        <style>{`.cls-1{fill:#f17996}.cls-2{fill:#f3ab53}.cls-3{fill:#1d8652}`}</style>
      </defs>
      <g>
        <path
          className="cls-3"
          d="M40.3,32.46l-9.6.05-5.55,4.24-7.12-1.47-1.36,6.91,8.38,2.54,3.64-1.51.2,9.29-5,2.42-1.61-2.44c-1.15-1.74-3.37-2.42-5.29-1.6h0c-2.3.98-3.29,3.71-2.14,5.94l3.9,7.59c.69,1.35,2.34,1.88,3.69,1.21l7.62-4.33,10.24-.06v-28.77Z"
        />
        <path
          className="cls-3"
          d="M37.87,32.46l9.6.05,5.55,4.24,7.12-1.47,1.36,6.91-8.38,2.54-3.64-1.51-.2,9.29,5,2.42,1.61-2.44c1.15-1.74,3.37-2.42,5.29-1.6h0c2.3.98,3.29,3.71,2.14,5.94l-3.9,7.59c-.69,1.35-2.34,1.88-3.69,1.21l-7.38-4.33-10.48-.06v-28.77Z"
        />
      </g>
      <g className="rattle-toy">
        <rect
          className="cls-1"
          x="15.34"
          y="31.63"
          width="4.05"
          height="16.95"
          transform="translate(-15.1 10.85) rotate(-24.57)"
        />
        <circle className="cls-1" cx="20.22" cy="46.34" r="3.03" />
        <g>
          <g>
            <rect
              className="cls-3"
              x="12.96"
              y="14.75"
              width="1.74"
              height="1.74"
              transform="translate(-5.24 7.16) rotate(-24.57)"
            />
            <rect
              className="cls-3"
              x="12.1"
              y="17.05"
              width="1.74"
              height="1.74"
              transform="translate(-6.28 7.02) rotate(-24.57)"
            />
            <polygon
              className="cls-3"
              points="16.43 19.22 13.26 20.66 12.54 19.08 10.95 19.8 9.5 16.64 7.92 17.36 10.09 22.11 10.82 23.7 17.15 20.8 16.43 19.22"
            />
          </g>
          <g>
            <rect
              className="cls-3"
              x="6.08"
              y="33.21"
              width="1.74"
              height="1.74"
              transform="translate(-13.54 5.98) rotate(-24.57)"
            />
            <rect
              className="cls-3"
              x="6.94"
              y="30.91"
              width="1.74"
              height="1.74"
              transform="translate(-12.51 6.12) rotate(-24.57)"
            />
            <polygon
              className="cls-3"
              points="4.35 30.49 7.51 29.04 8.24 30.62 9.82 29.9 11.27 33.07 12.86 32.34 10.68 27.59 9.96 26.01 3.62 28.9 4.35 30.49"
            />
          </g>
          <g>
            <rect
              className="cls-1"
              x=".28"
              y="20.54"
              width="1.74"
              height="1.74"
              transform="translate(-8.8 2.42) rotate(-24.57)"
            />
            <rect
              className="cls-1"
              x="2.59"
              y="21.4"
              width="1.74"
              height="1.74"
              transform="translate(-8.95 3.46) rotate(-24.57)"
            />
            <polygon
              className="cls-1"
              points="4.75 18.81 6.2 21.98 4.62 22.7 5.34 24.29 2.17 25.73 2.9 27.32 7.65 25.15 9.23 24.42 6.34 18.08 4.75 18.81"
            />
          </g>
          <g>
            <rect
              className="cls-1"
              x="18.75"
              y="27.42"
              width="1.74"
              height="1.74"
              transform="translate(-9.99 10.72) rotate(-24.57)"
            />
            <rect
              className="cls-1"
              x="16.44"
              y="26.56"
              width="1.74"
              height="1.74"
              transform="translate(-9.84 9.68) rotate(-24.57)"
            />
            <polygon
              className="cls-1"
              points="16.02 30.89 14.57 27.72 16.16 27 15.43 25.42 18.6 23.97 17.88 22.38 13.13 24.56 11.54 25.28 14.44 31.62 16.02 30.89"
            />
          </g>
          <rect
            className="cls-3"
            x="9.52"
            y="23.98"
            width="1.74"
            height="1.74"
            transform="translate(28.67 5.07) rotate(65.43)"
          />
        </g>
        <path
          className="cls-1"
          d="M10.45,33.67c-1.02,0-2.05-.18-3.04-.55-2.17-.81-3.9-2.42-4.86-4.53-.97-2.11-1.05-4.47-.24-6.64.81-2.17,2.42-3.9,4.53-4.86,4.35-1.99,9.51-.07,11.51,4.29.97,2.11,1.05,4.47.24,6.64-.81,2.17-2.42,3.9-4.53,4.86-1.15.53-2.38.79-3.6.79ZM10.43,17.36c-1.06,0-2.13.22-3.16.69-1.85.85-3.26,2.36-3.97,4.27-.71,1.91-.63,3.98.21,5.83.84,1.85,2.36,3.26,4.27,3.97,1.91.71,3.98.64,5.83-.21h0c1.85-.85,3.26-2.36,3.97-4.27.71-1.91.63-3.98-.21-5.83-1.28-2.8-4.05-4.45-6.94-4.45Z"
        />
      </g>
      <g>
        <circle className="cls-2" cx="22.99" cy="20.66" r="3" />
        <circle className="cls-2" cx="55.42" cy="20.66" r="3" />
        <path
          className="cls-2"
          d="M34.49,2.59h9.43c6.35,0,11.5,5.15,11.5,11.5v8.35c0,6.05-4.91,10.96-10.96,10.96h-10.5c-6.05,0-10.96-4.91-10.96-10.96v-8.35c0-6.35,5.15-11.5,11.5-11.5Z"
        />
        <g>
          <circle cx="30.87" cy="20.66" r="2.21" />
          <circle cx="47.54" cy="20.66" r="2.21" />
          <path d="M39.62,29.61c-1.56,0-2.96-1.04-3.41-2.54l.91-.27c.33,1.1,1.35,1.86,2.5,1.86s2.17-.76,2.49-1.86l.91.27c-.44,1.49-1.84,2.54-3.4,2.54Z" />
        </g>
      </g>
      <circle className="cls-2" cx="17.2" cy="37.68" r="4.62" />
      <circle className="cls-2" cx="61.72" cy="37.68" r="4.62" />
      <polygon
        className="cls-3"
        points="44.37 2.38 42 0 39.62 2.38 37.24 0 34.87 2.38 39.62 7.13 44.37 2.38"
      />
    </svg>
  );
}
