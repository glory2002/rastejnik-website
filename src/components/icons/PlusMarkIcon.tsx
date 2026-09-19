/** Same plus polygon as `public/images/plus-icon.svg` — no disc, so it can tint. */
export function PlusMarkIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 245 245"
      fill="currentColor"
      aria-hidden
    >
      <polygon points="245 81.67 163.33 81.67 163.33 0 81.67 0 81.67 81.67 0 81.67 0 163.33 81.67 163.33 81.67 245 163.33 245 163.33 163.33 245 163.33 245 81.67" />
    </svg>
  );
}
