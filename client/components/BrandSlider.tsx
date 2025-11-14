"use client";
import BrandCard from "@/components/BrandCard";

const DEFAULT_BRANDS = new Array(9).fill("/images/applelogo.png"); // demo: same logo for all cards

type BrandSliderProps = {
  brands?: string[];
  speedSeconds?: number;
  gapRem?: number;
};

const BrandSlider = ({
  brands = DEFAULT_BRANDS,
  speedSeconds = 18,
  gapRem = 1,
}: BrandSliderProps) => {
  const items = brands.map((src, i) => (
    <div
      key={`${src}-${i}`}
      aria-hidden
      className="
        flex-shrink-0
        px-2
        /* larger, responsive min widths so cards are noticeably wider */
        min-w-[9.5rem] sm:min-w-[12rem] md:min-w-[14rem] lg:min-w-[16rem]
      "
    >
      <BrandCard imageSrc={src} alt={`brand-${i}`} />
    </div>
  ));

  return (
    <div className="brand-slider relative w-full overflow-hidden py-6">
      <div
        className="brand-track flex items-center"
        style={
          {
            ["--scroll-duration" as any]: `${speedSeconds}s`,
            ["--brand-gap" as any]: `${gapRem}rem`,
          } as React.CSSProperties
        }
        aria-hidden
      >
        <div className="brand-track-group inline-flex items-center gap-4">
          {items}
        </div>
        <div className="brand-track-group inline-flex items-center gap-4">
          {items}
        </div>
      </div>
    </div>
  );
};

export default BrandSlider;
