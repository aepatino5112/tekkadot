"use client";

import { useRouter } from "next/navigation";
import { MoveLeft } from "lucide-react";

const Disclaimer = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col w-full px-6 sm:px-10 min-w-0 overflow-x-hidden">
      <div className="max-w-312 w-full mx-auto pt-6 pb-10">
        <div className="flex items-center gap-6">
          <button
            aria-label="Go back"
            onClick={() => router.back()}
            className="back-link"
          >
            <MoveLeft className="w-5 h-5 sm:w-6 sm:h-6 text-vivid-pink-600 dark:text-vivid-pink-400" />
          </button>

          <div>
            <h1 className="font-bold text-[1.75rem] lg:text-[2.25rem] text-black-500 dark:text-white-500">
              Disclaimer
            </h1>
            <p className="text-lg text-black-300 dark:text-white-700">
              Last updated November, 2025.
            </p>
          </div>
        </div>

        <div className="terms-divider my-6" />

        <div className="terms-box">
          <h4 className="font-semibold text-black-500 dark:text-white-500 mb-4">
            Disclaimer
          </h4>

          <p className="paragraph-lg text-black-500 dark:text-white-500 mb-4">
            Please read carefully. By using TekkaDot you acknowledge and accept
            the experimental nature and risks described below.
          </p>

          <div className="space-y-6">
            <section>
              <h6 className="font-medium text-black-500 dark:text-white-500">
                Experimental project
              </h6>
              <p className="paragraph-md text-black-500 dark:text-white-500">
                This is an experimental hackathon project. Features, UX, and
                integrations may change rapidly and without prior notice.
              </p>
            </section>

            <section>
              <h6 className="font-medium text-black-500 dark:text-white-500">
                Irreversible transactions
              </h6>
              <p className="paragraph-md text-black-500 dark:text-white-500">
                Blockchain transactions are irreversible. TekkaDot cannot refund
                or reverse payments once finalized on‑chain.
              </p>
            </section>

            <section>
              <h6 className="font-medium text-black-500 dark:text-white-500">
                AI counterfeit detection
              </h6>
              <p className="paragraph-md text-black-500 dark:text-white-500">
                Any AI used to flag potential counterfeits is assistive only and
                does not guarantee authenticity.
              </p>
            </section>

            <section>
              <h6 className="font-medium text-black-500 dark:text-white-500">
                Buyer & seller responsibilities
              </h6>
              <p className="paragraph-md text-black-500 dark:text-white-500">
                Buyers and sellers are fully responsible for verifying products,
                coordinating deliveries, and resolving off‑chain logistics.
              </p>
            </section>

            <section>
              <h6 className="font-medium text-black-500 dark:text-white-500">
                Cryptocurrency & NFT risks
              </h6>
              <p className="paragraph-md text-black-500 dark:text-white-500">
                Using cryptocurrencies and NFTs involves risks including price
                volatility, fraud, and technical issues. Engage with caution.
              </p>
            </section>

            <section>
              <h6 className="font-medium text-black-500 dark:text-white-500">
                Acceptance of risk
              </h6>
              <p className="paragraph-md text-black-500 dark:text-white-500">
                By participating on TekkaDot you accept these risks and agree to
                use the platform responsibly.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Disclaimer;
