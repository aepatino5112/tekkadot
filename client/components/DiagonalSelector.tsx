import Link from "next/link";

const DiagonalSelector = () => {
  return (
    <section className="relative w-screen h-[36rem] sm:h-[44rem] md:h-[55.438rem] overflow-visible -mx-4 sm:-mx-10 mt-8 mb-30">
      {/* Left half (products) */}
      <Link
        href="/products"
        aria-label="Go to products"
        className="absolute inset-0 z-10 clip-left group"
      >
        <div className="absolute inset-0 bg-[url(/selector/products.jpg)] bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-[1.08]"></div>
      </Link>

      {/* Right half (nfts) */}
      <Link
        href="/nfts"
        aria-label="Go to nfts"
        className="absolute inset-0 z-10 clip-right group"
      >
        <div className="absolute inset-0 bg-[url(/selector/nfts.jpg)] bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-[1.08]"></div>
      </Link>

      {/* Headings: responsive sizes & positions */}
      <div className="absolute inset-0 z-30 pointer-events-none">
        <h2
          className="absolute text-white-500 font-black drop-shadow-lg drop-shadow-custom"
          style={{
            top: "clamp(6rem, 8vh, 10rem)",
            left: "clamp(1rem, 5vw, 5rem)",
            fontSize: "clamp(2.8rem, 9vw, 10rem)",
            letterSpacing: "0.04em",
          }}
        >
          PRODUCTS
        </h2>

        <h2
          className="absolute text-white-500 font-black drop-shadow-lg drop-shadow-custom"
          style={{
            bottom: "clamp(6rem, 8vh, 10rem)",
            right: "clamp(1rem, 5vw, 5rem)",
            fontSize: "clamp(2.8rem, 9vw, 10rem)",
            letterSpacing: "0.04em",
          }}
        >
          NFTs
        </h2>
      </div>
    </section>
  );
};

export default DiagonalSelector;
