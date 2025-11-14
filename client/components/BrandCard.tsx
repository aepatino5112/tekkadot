import Image from "next/image";

type BrandCardProps = {
  imageSrc: string;
  alt?: string;
  className?: string;
};

const BrandCard = ({
  imageSrc,
  alt = "brand logo",
  className = "",
}: BrandCardProps) => {
  return (
    <div
      className={`rounded-2xl overflow-hidden shadow-sm transform-gpu transition hover:scale-[1.02] ${className}`}
      aria-hidden={false}
    >
      {/* portrait container: slightly wider and bigger card (height > width but less tall than before) */}
      <div
        className="relative w-full flex items-center justify-center"
        style={{
          aspectRatio: "3.8 / 5", // slightly wider (width/height ≈ 0.9) so card is less thin
          minHeight: "20rem", // increase height so larger cards feel more substantial
        }}
      >
        {/* background image layer with slightly reduced opacity (5% lower) */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/images/brandbg.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.95, // background 5% more transparent
          }}
          aria-hidden
        />

        {/* centered logo: keep slightly smaller relative to the now-larger card */}
        <div
          className="relative z-10"
          style={{
            width: "50%", // slightly larger logo proportion now that card is wider
            height: "50%",
            maxWidth: "11rem",
            maxHeight: "11rem",
          }}
        >
          <Image
            src={imageSrc}
            alt={alt}
            fill
            className="object-contain"
            priority
            style={{ opacity: 0.95 }} // logo 5% more transparent
          />
        </div>
      </div>
    </div>
  );
};

export default BrandCard;
