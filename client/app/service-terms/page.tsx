"use client";

import { useRouter } from "next/navigation";
import { MoveLeft } from "lucide-react";


const TermsOfService = () => {
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
              Terms of Service
            </h1>
            <p className="text-lg text-black-300 dark:text-white-700">
              Last updated November, 2025.
            </p>
          </div>
        </div>

        <div className="terms-divider my-6" />

        <div className="terms-box">
          <h4 className="font-semibold text-black-500 dark:text-white-500 mb-4">
            Agreement to Terms
          </h4>

          <p className="paragraph-lg text-black-500 dark:text-white-500 mb-4">
            Welcome to TekkaDot! This platform is a decentralized marketplace
            built on Polkadot. By using it, you agree to the following:
          </p>

          <div className="space-y-4">
            <div>
              <h6 className="font-medium text-black-500 dark:text-white-500">
                Non-custodial
              </h6>
              <p className="paragraph-md text-black-500 dark:text-white-500">
                We don't hold your funds, products, or private keys. You
                interact directly with your wallet.
              </p>
            </div>

            <div>
              <h6 className="font-medium text-black-500 dark:text-white-500">
                Eligibility
              </h6>
              <p className="paragraph-md text-black-500 dark:text-white-500">
                You must be 18+ and are responsible for following your local
                laws.
              </p>
            </div>

            <div>
              <h6 className="font-medium text-black-500 dark:text-white-500">
                Transactions
              </h6>
              <p className="paragraph-md text-black-500 dark:text-white-500">
                Payments are in DOT. Products may be represented as NFTs with
                proof-of-purchase tokens.
              </p>
            </div>

            <div>
              <h6 className="font-medium text-black-500 dark:text-white-500">
                Responsibilities
              </h6>
              <p className="paragraph-md text-black-500 dark:text-white-500">
                Sellers must provide accurate product information. Buyers must
                verify authenticity before purchase.
              </p>
            </div>

            <div>
              <h6 className="font-medium text-black-500 dark:text-white-500">
                AI & Verification
              </h6>
              <p className="paragraph-md text-black-500 dark:text-white-500">
                Our AI helps flag possible counterfeits, but it's assistive
                only. Community reviews complement this.
              </p>
            </div>

            <div>
              <h6 className="font-medium text-black-500 dark:text-white-500">
                Disputes
              </h6>
              <p className="paragraph-md text-black-500 dark:text-white-500">
                Blockchain transactions are final. We may add optional dispute
                tools, but responsibility lies with users.
              </p>
            </div>

            <div>
              <h6 className="font-medium text-black-500 dark:text-white-500">
                Liability
              </h6>
              <p className="paragraph-md text-black-500 dark:text-white-500">
                Use at your own risk. We're not liable for scams, failed
                deliveries, or market volatility.
              </p>
            </div>

            <div>
              <h6 className="font-medium text-black-500 dark:text-white-500">
                Updates
              </h6>
              <p className="paragraph-md text-black-500 dark:text-white-500">
                Terms may change during development. Continued use means you
                accept updates.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
