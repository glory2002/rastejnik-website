import Image from "next/image";

/** Document mark for PDF resource cards. */
export function PdfPlaceholder({
  className = "h-20 w-auto sm:h-[5.75rem]",
}: {
  className?: string;
}) {
  return (
    <Image
      src="/images/pdf-icon.svg"
      alt=""
      width={79}
      height={69}
      className={`shrink-0 object-contain ${className}`}
    />
  );
}
