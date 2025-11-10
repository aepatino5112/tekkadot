import Link from "next/link";
import Image from "next/image";

const FooterProducts = () => {
  return (
    <footer className="footer w-full max-w-screen-2xl mx-auto px-6 md:px-10 lg:px-20 py-12 grid grid-cols-1 md:grid-cols-6 gap-8 md:gap-12 items-start">
      {/* left: logo + description */}
      <div className="relative flex flex-col items-start space-y-4 md:col-span-3 min-w-0">
        <div className="w-44 md:w-56 lg:w-64">
          <Image
            src="/logos/tekka-red.svg"
            alt="TekkaDot products light logo"
            width={278}
            height={75.14}
            className="block w-full h-auto pb-4 dark:hidden"
          />
          <Image
            src="/logos/tekka-red-dark.svg"
            alt="TekkaDot products dark logo"
            width={278}
            height={75.14}
            className="hidden w-full h-auto pb-4 dark:block"
          />
        </div>
        <p className="text-base md:text-lg leading-7 text-black-500 dark:text-white-500 max-w-xl">
          We are a tech shop dedicated to offer you the best tech for the best
          prices in the market.
        </p>
        <p className="paragraph-lg font-light text-black-500 dark:text-white-500">
          © 2025 TekkaDot. All rights reserved.
        </p>
      </div>

      {/* right: columns — stack on small, columns on md+ */}
      <div className="footer-item min-w-0">
        <h5 className="text-vivid-pink-500 font-bold text-lg md:text-xl">
          MARKETPLACE
        </h5>
        <nav className="mt-4 flex flex-col gap-3 text-base md:text-lg">
          <Link href="products">
            <span className="text-black-500 dark:text-white-500">Products</span>
          </Link>
          <Link href="nfts">
            <span className="text-black-500 dark:text-white-500">NFTs</span>
          </Link>
          <Link href="/tutorial">
            <span className="text-black-500 dark:text-white-500">
              How It Works
            </span>
          </Link>
        </nav>
      </div>

      <div className="footer-item min-w-0">
        <h5 className="text-vivid-pink-500 font-bold text-lg md:text-xl">
          ABOUT US
        </h5>
        <nav className="mt-4 flex flex-col gap-3 text-base md:text-lg">
          <Link href="about-us">
            <span className="text-black-500 dark:text-white-500">
              Who are we
            </span>
          </Link>
          <Link href="/mission">
            <span className="text-black-500 dark:text-white-500">
              Our mission
            </span>
          </Link>
          <Link href="/vission">
            <span className="text-black-500 dark:text-white-500">
              Our vission
            </span>
          </Link>
          <Link href="/allies">
            <span className="text-black-500 dark:text-white-500">
              Our allies
            </span>
          </Link>
        </nav>
      </div>

      <div className="footer-item min-w-0">
        <h5 className="text-vivid-pink-500 font-bold text-lg md:text-xl">
          LEGAL
        </h5>
        <nav className="mt-4 flex flex-col gap-3 text-base md:text-lg">
          <Link href="/service-terms">
            <span className="text-black-500 dark:text-white-500">
              Terms of Service
            </span>
          </Link>
          <Link href="/privacy-policy">
            <span className="text-black-500 dark:text-white-500">
              Privacy Policy
            </span>
          </Link>
          <Link href="/disclaimer">
            <span className="text-black-500 dark:text-white-500">
              Disclaimer
            </span>
          </Link>
        </nav>
      </div>
    </footer>
  );
};

export default FooterProducts;
