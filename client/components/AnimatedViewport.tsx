import Image from "next/image";
import { type HeroImages } from "@/types/heroImages";

const imageList: HeroImages[] = [
  {
    src: "/hero/playstation5.svg",
    alt: "playstation 5",
    background: "/images/product.svg",
  },
  {
    src: "/hero/corneta.svg",
    alt: "corneta",
    background: "/images/product.svg",
  },
  { src: "/hero/switch.svg", alt: "switch", background: "/images/product.svg" },
  {
    src: "/hero/boredape.svg",
    alt: "bored ape",
    background: "/images/nft.svg",
  },
  { src: "/hero/laptop.svg", alt: "laptop", background: "/images/product.svg" },
  {
    src: "/hero/headset.svg",
    alt: "headset",
    background: "/images/product.svg",
  },
  {
    src: "/hero/dualsense.svg",
    alt: "dualsense",
    background: "/images/product.svg",
  },
];

const AnimatedViewport = () => {
  // responsive height: min/max with viewport fallback
  const cssImageHeight = "clamp(42rem, 56vh, 72rem)";

  return (
    <div
      className="w-full max-w-[72rem] rounded-2xl relative overflow-hidden mx-auto"
      style={
        {
          ["--image-height" as any]: cssImageHeight,
          height: "var(--image-height)",
        } as React.CSSProperties
      }
    >
      {/* Default background: static */}
      <Image
        src="/images/product.svg"
        alt="default background"
        fill
        className="object-cover absolute inset-0"
        priority
      />

      {/* Special background: only visible during its segment */}
      <Image
        src="/images/nft.svg"
        alt="nft background"
        fill
        className="object-cover absolute inset-0 opacity-0 animate-nft-bg"
      />

      <div
        className="absolute animate-slide flex flex-col top-0 left-0 right-0"
        // provide the CSS variable directly on the animated element so keyframes resolve reliably
        style={
          {
            ["--image-height" as any]: cssImageHeight,
          } as React.CSSProperties
        }
      >
        {imageList.map((img, index) => (
          <div
            key={index}
            className="w-full relative shrink-0"
            style={{ height: "var(--image-height)" } as React.CSSProperties}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              // make the special NFT image scale down on small screens and a bit larger on md+
              className={`object-contain relative z-10 ${
                index === 3
                  ? "scale-100 md:scale-[0.50] sm:scale-[0.6]"
                  : "scale-100"
              }`}
            />
          </div>
        ))}
        {imageList.map((img, index) => (
          <div
            key={`repeat-${index}`}
            className="w-full relative shrink-0"
            style={{ height: "var(--image-height)" } as React.CSSProperties}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className={`object-contain relative z-10 ${
                index === 3
                  ? "scale-100 md:scale-[0.50] sm:scale-[0.6]"
                  : "scale-100"
              }`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnimatedViewport;
