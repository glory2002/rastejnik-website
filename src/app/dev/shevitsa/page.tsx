"use client";

import { useEffect, useState } from "react";
import { ShevitsaAssembleIcon } from "@/components/icons/ShevitsaAssembleIcon";

/** Temporary preview to replay the assemble transition. */
export default function ShevitsaPreviewPage() {
  const [key, setKey] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => setKey((k) => k + 1), 3800);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div
      key={key}
      className="shevitsa-stage-enter fixed inset-0 z-[100] overflow-hidden bg-[color-mix(in_srgb,var(--color-secondary)_9%,white)]"
      aria-hidden="true"
    >
      <div className="shevitsa-stage-space absolute left-1/2 top-1/2 w-[min(52vw,400px)] -translate-x-1/2 -translate-y-1/2 sm:w-[min(46vw,460px)]">
        <ShevitsaAssembleIcon className="h-auto w-full overflow-visible" />
      </div>
    </div>
  );
}
