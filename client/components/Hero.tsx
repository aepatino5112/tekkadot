import AnimatedViewport from "./AnimatedViewport";

const Hero = () => {
  return (
    <section className="flex flex-col-reverse md:flex-row items-center justify-between gap-9 md:gap-6 py-2 px-4 md:px-0">
      <div className="flex flex-col justify-center gap-6 md:gap-9 w-full md:w-2/3 text-center md:text-left min-w-0">
        <div>
          <h1 className="font-semibold text-black-500 dark:text-white-500">
            Shop Transparently.
            <br />
            Own Permanently.
            <br />
            Your Experience.
          </h1>
        </div>
        <div>
          <h4 className="font-light text-black-500 dark:text-white-500">
            Trade tech products and NFTs with wallet-based identity, crypto-only
            payments in DOT, and community-driven provenance.
          </h4>
        </div>
      </div>

      <div className="w-full md:w-1/2 flex justify-center md:justify-end mb-6 md:mb-0">
        <AnimatedViewport />
      </div>
    </section>
  );
};

export default Hero;
