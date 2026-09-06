const TILE_SRC = "/images/specialist-frieze.svg";
/** Enough tiles for the widest card; extras wrap into zero-height rows. */
const TILE_SLOTS = 16;

export function SpecialistCardFrieze() {
  return (
    <div
      aria-hidden
      className="grid h-5 w-full overflow-hidden [--frieze-h:1.25rem] sm:h-6 sm:[--frieze-h:1.5rem]"
      style={{
        gridTemplateColumns:
          "repeat(auto-fit, minmax(calc(var(--frieze-h) * 80 / 28), 1fr))",
        gridTemplateRows: "var(--frieze-h)",
        gridAutoRows: 0,
      }}
    >
      {Array.from({ length: TILE_SLOTS }, (_, index) => (
        <img
          key={index}
          src={TILE_SRC}
          alt=""
          className="h-full w-full"
        />
      ))}
    </div>
  );
}
