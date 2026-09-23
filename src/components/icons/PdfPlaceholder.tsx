/** Document placeholder for PDF resource cards. */
export function PdfPlaceholder({
  className = "h-[9.75rem] w-auto sm:h-[11rem]",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 120 154"
      className={className}
      aria-hidden
    >
      <path
        d="M20 8h58l26 26v108c0 5-4 9-9 9H26c-5 0-9-4-9-9V17c0-5 4-9 9-9Z"
        fill="#fffdf8"
        stroke="#6d954b"
        strokeWidth="3.25"
        strokeLinejoin="round"
      />
      <path
        d="M78 8v20c0 3.6 2.9 6.5 6.5 6.5H110"
        fill="#f3f6f0"
        stroke="#6d954b"
        strokeWidth="3.25"
        strokeLinejoin="round"
      />
      <text
        x="60"
        y="84"
        textAnchor="middle"
        fill="#385d30"
        fontSize="24"
        fontWeight="600"
        fontFamily="inherit"
      >
        PDF
      </text>
      <rect
        x="54"
        y="96"
        width="12"
        height="12"
        fill="#e9b063"
        transform="rotate(45 60 102)"
      />
      <rect
        x="43"
        y="112"
        width="13"
        height="13"
        fill="#6d954b"
        transform="rotate(45 49.5 118.5)"
      />
      <rect
        x="64"
        y="115"
        width="9"
        height="9"
        fill="#476abf"
        transform="rotate(45 68.5 119.5)"
      />
    </svg>
  );
}
