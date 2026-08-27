/** Brand L-block mark (same geometry as icon-blue). Color via `currentColor`. */
export function InfoMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 70 70.433"
      className={className}
      aria-hidden
      overflow="visible"
    >
      <path d="M70 17.455V0H52.652V17.455H70Z" fill="currentColor" />
      <path d="M52.652 34.91V17.455H35.305V34.91H52.652Z" fill="currentColor" />
      <path
        d="M70 52.672H35V35.217H17.652V0H0V52.672V70.433H70V52.672Z"
        fill="currentColor"
      />
    </svg>
  );
}
