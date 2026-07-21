/**
 * Just the head — cropped straight out of `BabyRattleIcon` / `baby-1.svg`
 * (same shape reused in `BabyCrawlIcon`). Used as a small avatar glyph
 * wherever a full spot illustration would be too busy, e.g. the dashboard's
 * child-switcher tabs.
 */
export function BabyHeadIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="18 -2 42 37.5" className={className} aria-hidden="true">
      <circle fill="#f3ab53" cx="22.99" cy="20.66" r="3" />
      <circle fill="#f3ab53" cx="55.42" cy="20.66" r="3" />
      <path
        fill="#f3ab53"
        d="M34.49,2.59h9.43c6.35,0,11.5,5.15,11.5,11.5v8.35c0,6.05-4.91,10.96-10.96,10.96h-10.5c-6.05,0-10.96-4.91-10.96-10.96v-8.35c0-6.35,5.15-11.5,11.5-11.5Z"
      />
      <circle cx="30.87" cy="20.66" r="2.21" />
      <circle cx="47.54" cy="20.66" r="2.21" />
      <path d="M39.62,29.61c-1.56,0-2.96-1.04-3.41-2.54l.91-.27c.33,1.1,1.35,1.86,2.5,1.86s2.17-.76,2.49-1.86l.91.27c-.44,1.49-1.84,2.54-3.4,2.54Z" />
      <polygon
        fill="#1d8652"
        points="44.37 2.38 42 0 39.62 2.38 37.24 0 34.87 2.38 39.62 7.13 44.37 2.38"
      />
    </svg>
  );
}
