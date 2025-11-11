import GlassButton from "./GlassButton";

const Newsletter = () => {
  return (
    <section
      className="
        relative w-full
        min-h-[40vh] sm:min-h-[48vh] md:min-h-[56vh] lg:min-h-[64vh]
        flex items-center justify-center rounded-2xl
        overflow-hidden
      "
      aria-labelledby="newsletter-title"
    >
      {/* Background Image */}
      <div className="absolute inset-0 bg-[url('/images/newsletter.jpg')] bg-cover bg-center" />

      {/* Content Container */}
      <div className="relative z-10 text-center px-4 sm:px-6 md:px-8 w-full max-w-6xl mx-auto">
        {/* Title */}
        <h2
          id="newsletter-title"
          className="
            text-white font-semibold leading-tight
            text-2xl sm:text-3xl md:text-4xl lg:text-[4.5rem]
            mb-4 sm:mb-6 md:mb-8
          "
        >
          Stay Updated on Latest
          <br className="hidden sm:block" />
          Product Releases
        </h2>

        {/* Description */}
        <p className="text-white-200 font-medium text-base sm:text-lg md:text-xl max-w-3xl mx-auto mb-6 sm:mb-8">
          Subscribe with your wallet to stay updated on our latest product
          releases.
        </p>

        {/* Button */}
        <div className="mt-4 sm:mt-6 flex justify-center px-4">
          <div className="w-full sm:w-auto max-w-md">
            <GlassButton content="Join the Club — Subscribe with your Wallet" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
