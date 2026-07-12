/**
 * Inline version of embroidery-4.svg (the shevitsa motif from the homepage
 * CTA section), split into its natural clusters of shapes. Each cluster is
 * wrapped in its own <g className="shevitsa-piece"> with a `--piece-dx` /
 * `--piece-dy` offset pointing away from the motif's center — see the
 * `shevitsa-piece-in` keyframes in globals.css. When played, every piece
 * starts out at that offset (as if scattered off-screen) and flies inward,
 * assembling into the full motif at its natural, centered position.
 */
export function ShevitsaAssembleIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 708.98 726.03"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <style>{`.cls-1{fill:#e19826}.cls-2{fill:#fff;opacity:.35}.cls-3{fill:#ee3c42}.cls-4{fill:#f17996}.cls-5{fill:#1f4fa1}`}</style>
      </defs>

      <g
        className="shevitsa-piece"
        style={{ "--piece-dx": "-49px", "--piece-dy": "584px", animationDelay: "40ms" } as React.CSSProperties}
      >
        <polygon className="cls-4" points="372.21 690.58 389.94 672.86 372.21 655.13 389.94 637.41 372.21 619.69 354.49 637.41 336.76 655.13 354.49 672.86 372.21 690.58" />
        <rect className="cls-4" x="306.51" y="678.05" width="25.07" height="25.07" transform="translate(-394.87 427.86) rotate(-45)" />
        <rect className="cls-4" x="306.51" y="642.6" width="25.07" height="25.07" transform="translate(-369.81 417.48) rotate(-45)" />
        <rect className="cls-4" x="306.51" y="607.15" width="25.07" height="25.07" transform="translate(-344.74 407.1) rotate(-45)" />
        <rect className="cls-4" x="271.06" y="642.6" width="25.07" height="25.07" transform="translate(-380.19 392.41) rotate(-45)" />
      </g>

      <g
        className="shevitsa-piece"
        style={{ "--piece-dx": "-149px", "--piece-dy": "324px", animationDelay: "0ms" } as React.CSSProperties}
      >
        <polygon className="cls-5" points="319.04 495.61 301.32 477.89 283.59 495.61 265.87 477.89 248.14 495.61 265.87 513.34 283.59 531.06 301.32 513.34 319.04 495.61" />
        <rect className="cls-5" x="306.51" y="536.26" width="25.07" height="25.07" transform="translate(-294.61 386.33) rotate(-45)" />
        <rect className="cls-5" x="271.06" y="536.25" width="25.07" height="25.07" transform="translate(-304.99 361.27) rotate(-45)" />
        <rect className="cls-5" x="235.61" y="536.26" width="25.07" height="25.07" transform="translate(-315.37 336.2) rotate(-45)" />
        <rect className="cls-5" x="271.06" y="571.7" width="25.07" height="25.07" transform="translate(-330.06 371.65) rotate(-45)" />
      </g>

      <g
        className="shevitsa-piece"
        style={{ "--piece-dx": "161px", "--piece-dy": "364px", animationDelay: "70ms" } as React.CSSProperties}
      >
        <polygon className="cls-5" points="478.56 584.24 496.28 566.51 478.56 548.79 496.28 531.06 478.56 513.34 460.83 531.06 443.11 548.79 460.83 566.51 478.56 584.24" />
        <rect className="cls-5" x="412.85" y="571.7" width="25.07" height="25.07" transform="translate(-288.53 471.91) rotate(-45)" />
        <rect className="cls-5" x="412.85" y="536.26" width="25.07" height="25.07" transform="translate(-263.46 461.53) rotate(-45)" />
        <rect className="cls-5" x="412.85" y="500.81" width="25.07" height="25.07" transform="translate(-238.39 451.15) rotate(-45)" />
        <rect className="cls-5" x="377.4" y="536.25" width="25.07" height="25.07" transform="translate(-273.84 436.46) rotate(-45)" />
      </g>

      <g
        className="shevitsa-piece"
        style={{ "--piece-dx": "-1px", "--piece-dy": "168px", animationDelay: "20ms" } as React.CSSProperties}
      >
        <rect className="cls-2" x="341.96" y="394.46" width="25.07" height="25.07" transform="translate(892.94 444.12) rotate(135)" />
        <rect className="cls-2" x="341.96" y="429.91" width="25.07" height="25.07" transform="translate(918 504.63) rotate(135)" />
        <rect className="cls-2" x="341.96" y="465.36" width="25.07" height="25.07" transform="translate(943.07 565.15) rotate(135)" />
        <rect className="cls-2" x="341.96" y="500.81" width="25.07" height="25.07" transform="translate(968.14 625.66) rotate(135)" />
      </g>

      <g
        className="shevitsa-piece"
        style={{ "--piece-dx": "-209px", "--piece-dy": "534px", animationDelay: "90ms" } as React.CSSProperties}
      >
        <polygon className="cls-2" points="212.69 708.31 230.42 690.58 248.14 672.86 265.87 655.13 283.59 637.41 301.32 619.69 319.04 601.96 336.76 584.24 354.49 566.51 372.21 548.79 354.49 531.06 336.76 548.79 319.04 566.51 301.32 584.24 283.59 601.96 265.87 619.69 248.14 637.41 230.42 655.13 212.69 672.86 194.97 690.58 177.24 672.86 159.52 655.13 141.8 637.41 124.07 655.13 141.8 672.86 159.52 690.58 177.24 708.31 194.97 726.03 212.69 708.31" />
        <polygon className="cls-2" points="177.24 601.96 159.52 584.24 141.8 601.96 124.07 619.69 141.8 637.41 159.52 619.69 177.24 601.96" />
        <rect className="cls-2" x="182.44" y="624.88" width="25.07" height="25.07" transform="translate(-393.61 324.56) rotate(-45)" />
        <rect className="cls-2" x="182.44" y="589.43" width="25.07" height="25.07" transform="translate(-368.55 314.17) rotate(-45)" />
      </g>

      <polygon className="shevitsa-piece cls-1" style={{ "--piece-dx": "177px", "--piece-dy": "-196px", animationDelay: "110ms" } as React.CSSProperties} points="460.83 282.92 478.56 265.2 460.83 247.47 443.11 229.75 425.39 247.47 407.66 265.2 425.39 282.92 443.11 300.65 460.83 282.92" />
      <polygon className="shevitsa-piece cls-1" style={{ "--piece-dx": "177px", "--piece-dy": "158px", animationDelay: "30ms" } as React.CSSProperties} points="460.83 460.17 478.56 442.44 460.83 424.72 443.11 406.99 425.39 424.72 407.66 442.44 425.39 460.17 443.11 477.89 460.83 460.17" />
      <polygon className="shevitsa-piece cls-4" style={{ "--piece-dx": "283px", "--piece-dy": "264px", animationDelay: "130ms" } as React.CSSProperties} points="514.01 513.34 531.73 495.61 514.01 477.89 496.28 460.17 478.56 477.89 460.83 495.61 478.56 513.34 496.28 531.06 514.01 513.34" />
      <polygon className="shevitsa-piece cls-4" style={{ "--piece-dx": "283px", "--piece-dy": "-302px", animationDelay: "60ms" } as React.CSSProperties} points="514.01 229.75 531.73 212.02 514.01 194.3 496.28 176.58 478.56 194.3 460.83 212.02 478.56 229.75 496.28 247.47 514.01 229.75" />
      <polygon className="shevitsa-piece cls-4" style={{ "--piece-dx": "-285px", "--piece-dy": "-302px", animationDelay: "100ms" } as React.CSSProperties} points="230.42 229.75 248.14 212.02 230.42 194.3 212.69 176.58 194.97 194.3 177.24 212.02 194.97 229.75 212.69 247.47 230.42 229.75" />
      <polygon className="shevitsa-piece cls-4" style={{ "--piece-dx": "-285px", "--piece-dy": "264px", animationDelay: "10ms" } as React.CSSProperties} points="230.42 513.34 248.14 495.61 230.42 477.89 212.69 460.17 194.97 477.89 177.24 495.61 194.97 513.34 212.69 531.06 230.42 513.34" />
      <polygon className="shevitsa-piece cls-1" style={{ "--piece-dx": "-179px", "--piece-dy": "158px", animationDelay: "80ms" } as React.CSSProperties} points="283.59 460.17 301.32 442.44 283.59 424.72 265.87 406.99 248.14 424.72 230.42 442.44 248.14 460.17 265.87 477.89 283.59 460.17" />
      <polygon className="shevitsa-piece cls-1" style={{ "--piece-dx": "-179px", "--piece-dy": "-196px", animationDelay: "50ms" } as React.CSSProperties} points="283.59 282.92 301.32 265.2 283.59 247.47 265.87 229.75 248.14 247.47 230.42 265.2 248.14 282.92 265.87 300.65 283.59 282.92" />
      <polygon className="shevitsa-piece cls-2" style={{ "--piece-dx": "-1px", "--piece-dy": "-162px", animationDelay: "140ms" } as React.CSSProperties} points="372.21 300.65 389.94 282.92 372.21 265.2 354.49 247.47 336.76 265.2 319.04 282.92 336.76 300.65 354.49 318.37 372.21 300.65" />
      <polygon className="shevitsa-piece cls-2" style={{ "--piece-dx": "-1px", "--piece-dy": "-20px", animationDelay: "0ms" } as React.CSSProperties} points="372.21 371.54 389.94 353.82 372.21 336.1 354.49 318.37 336.76 336.09 319.04 353.82 336.76 371.54 354.49 389.27 372.21 371.54" />
      <polygon className="shevitsa-piece cls-2" style={{ "--piece-dx": "141px", "--piece-dy": "-20px", animationDelay: "120ms" } as React.CSSProperties} points="443.11 371.54 460.83 353.82 443.11 336.1 425.39 318.37 407.66 336.09 389.94 353.82 407.66 371.54 425.39 389.27 443.11 371.54" />
      <polygon className="shevitsa-piece cls-2" style={{ "--piece-dx": "-143px", "--piece-dy": "-20px", animationDelay: "20ms" } as React.CSSProperties} points="301.32 371.54 319.04 353.82 301.32 336.1 283.59 318.37 265.87 336.09 248.14 353.82 265.87 371.54 283.59 389.27 301.32 371.54" />

      <g
        className="shevitsa-piece"
        style={{ "--piece-dx": "521px", "--piece-dy": "-36px", animationDelay: "60ms" } as React.CSSProperties}
      >
        <rect className="cls-3" x="678.72" y="341.29" width="25.07" height="25.07" transform="translate(-47.73 592.42) rotate(-45)" />
        <polygon className="cls-3" points="638.08 389.27 655.8 406.99 673.53 389.27 655.8 371.54 673.53 353.82 655.8 336.1 673.53 318.37 655.8 300.65 638.08 318.37 620.35 336.1 602.63 353.82 620.35 371.54 638.08 389.27" />
        <polygon className="cls-3" points="584.91 300.65 567.18 318.37 549.46 336.1 531.73 353.82 549.46 371.54 567.18 389.27 584.91 406.99 602.63 424.72 620.35 442.44 638.08 424.72 620.35 406.99 602.63 389.27 584.91 371.54 602.63 353.82 584.91 336.1 602.63 318.37 620.35 300.65 638.08 282.92 620.35 265.2 602.63 282.92 584.91 300.65" />
        <polygon className="cls-3" points="531.73 460.17 549.46 477.89 567.18 460.17 584.91 477.89 602.63 460.17 584.91 442.44 567.18 424.72 549.46 406.99 531.73 389.27 514.01 371.54 496.28 353.82 514.01 336.1 531.73 318.37 549.46 300.65 567.18 282.92 584.91 265.2 602.63 247.47 584.91 229.75 567.18 247.47 549.46 229.75 531.73 247.47 549.46 265.2 531.73 282.92 514.01 265.2 496.28 282.92 514.01 300.65 496.28 318.37 478.56 300.65 460.83 318.37 478.56 336.1 460.83 353.82 478.56 371.54 460.83 389.27 478.56 406.99 496.28 389.27 514.01 406.99 496.28 424.72 514.01 442.44 531.73 424.72 549.46 442.44 531.73 460.17" />
      </g>

      <g
        className="shevitsa-piece"
        style={{ "--piece-dx": "-9px", "--piece-dy": "-446px", animationDelay: "150ms" } as React.CSSProperties}
      >
        <rect className="cls-2" x="341.96" y="4.52" width="25.07" height="25.07" transform="translate(91.77 255.66) rotate(-45)" />
        <polygon className="cls-2" points="389.94 70.23 407.66 52.5 389.94 34.78 372.21 52.5 354.49 34.78 336.76 52.5 319.04 34.78 301.32 52.5 319.04 70.23 336.76 87.95 354.49 105.68 372.21 87.95 389.94 70.23" />
        <polygon className="cls-2" points="301.32 123.4 319.04 141.13 336.76 158.85 354.49 176.58 372.21 158.85 389.94 141.13 407.66 123.4 425.39 105.68 443.11 87.95 425.39 70.23 407.66 87.95 389.94 105.68 372.21 123.4 354.49 105.68 336.76 123.4 319.04 105.68 301.32 87.95 283.59 70.23 265.87 87.95 283.59 105.68 301.32 123.4" />
        <polygon className="cls-2" points="460.83 176.58 478.56 158.85 460.83 141.13 478.56 123.4 460.83 105.68 443.11 123.4 425.39 141.13 407.66 158.85 389.94 176.58 372.21 194.3 354.49 212.02 336.76 194.3 319.04 176.58 301.32 158.85 283.59 141.13 265.87 123.4 248.14 105.68 230.42 123.4 248.14 141.13 230.42 158.85 248.14 176.58 265.87 158.85 283.59 176.58 265.87 194.3 283.59 212.02 301.32 194.3 319.04 212.02 301.32 229.75 319.04 247.47 336.76 229.75 354.49 247.47 372.21 229.75 389.94 247.47 407.66 229.75 389.94 212.02 407.66 194.3 425.39 212.02 443.11 194.3 425.39 176.58 443.11 158.85 460.83 176.58" />
      </g>

      <g
        className="shevitsa-piece"
        style={{ "--piece-dx": "-459px", "--piece-dy": "-36px", animationDelay: "110ms" } as React.CSSProperties}
      >
        <rect className="cls-3" x="5.19" y="341.29" width="25.07" height="25.07" transform="translate(-245 116.16) rotate(-45)" />
        <polygon className="cls-3" points="70.9 318.37 53.17 300.65 35.45 318.37 53.17 336.09 35.45 353.82 53.17 371.54 35.45 389.27 53.17 406.99 70.9 389.27 88.62 371.54 106.35 353.82 88.62 336.1 70.9 318.37" />
        <polygon className="cls-3" points="124.07 406.99 141.8 389.27 159.52 371.54 177.24 353.82 159.52 336.1 141.8 318.37 124.07 300.65 106.35 282.92 88.62 265.2 70.9 282.92 88.62 300.65 106.35 318.37 124.07 336.09 106.35 353.82 124.07 371.54 106.35 389.27 88.62 406.99 70.9 424.72 88.62 442.44 106.35 424.72 124.07 406.99" />
        <polygon className="cls-3" points="177.24 247.47 159.52 229.75 141.8 247.47 124.07 229.75 106.35 247.47 124.07 265.2 141.8 282.92 159.52 300.65 177.24 318.37 194.97 336.1 212.69 353.82 194.97 371.54 177.24 389.27 159.52 406.99 141.8 424.72 124.07 442.44 106.35 460.17 124.07 477.89 141.8 460.17 159.52 477.89 177.24 460.17 159.52 442.44 177.24 424.72 194.97 442.44 212.69 424.72 194.97 406.99 212.69 389.27 230.42 406.99 248.14 389.27 230.42 371.54 248.14 353.82 230.42 336.1 248.14 318.37 230.42 300.65 212.69 318.37 194.97 300.65 212.69 282.92 194.97 265.2 177.24 282.92 159.52 265.2 177.24 247.47" />
      </g>
    </svg>
  );
}
