const rotateClass = {
  down: "",
  up: "rotate-180",
  left: "rotate-90",
  right: "-rotate-90",
} as const;

/** Same chevron as the dropdown / primary button arrow. */
export function FormChevron({
  direction = "down",
  className = "",
}: {
  direction?: "up" | "down" | "left" | "right";
  className?: string;
}) {
  return (
    <svg
      className={`h-2.5 w-3.5 shrink-0 text-primary ${rotateClass[direction]} ${className}`}
      viewBox="0 0 22 14.2411"
      fill="none"
      aria-hidden
    >
      <path
        transform="translate(22 0) rotate(90)"
        d="M4.74702 1.56625L2.71633e-07 6.30549L4.74702 10.9553L6.82041e-07 15.6945L4.74702 20.4337L14.2411 10.9553L4.74702 1.56625Z"
        fill="currentColor"
      />
    </svg>
  );
}
