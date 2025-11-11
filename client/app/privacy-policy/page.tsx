"use client";

import { useRouter } from "next/navigation";
import { MoveLeft } from "lucide-react";

const PrivacyPolicy = () => {
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
              Privacy Policy
            </h1>
            <p className="text-lg text-black-300 dark:text-white-700">
              Last updated November, 2025.
            </p>
          </div>
        </div>

        <div className="terms-divider my-6" />

        <div className="terms-box">
          <h4 className="font-semibold text-black-500 dark:text-white-500 mb-4">
            Privacy Policy
          </h4>

          <p className="paragraph-lg text-black-500 dark:text-white-500 mb-4">
            Welcome to TekkaDot. This policy explains how data and identity are
            handled on our decentralized, wallet-based marketplace.
          </p>

          <div className="space-y-6">
            <section>
              <h6 className="font-medium text-black-500 dark:text-white-500">
                Wallet-based login
              </h6>
              <p className="paragraph-md text-black-500 dark:text-white-500">
                We don't collect personal info like names or emails. Your wallet
                is your identity — authentication and signatures happen
                client-side.
              </p>
            </section>

            <section>
              <h6 className="font-medium text-black-500 dark:text-white-500">
                Data storage
              </h6>
              <p className="paragraph-md text-black-500 dark:text-white-500">
                Product images and metadata are stored off-chain (for example
                IPFS or Filecoin). Cryptographic hashes (content identifiers)
                are anchored on-chain to provide verifiable integrity.
              </p>
            </section>

            <section>
              <h6 className="font-medium text-black-500 dark:text-white-500">
                Messaging
              </h6>
              <p className="paragraph-md text-black-500 dark:text-white-500">
                Peer-to-peer messages are signed with your wallet. Messages are
                not stored centrally by TekkaDot unless you explicitly opt into
                a hosted feature.
              </p>
            </section>

            <section>
              <h6 className="font-medium text-black-500 dark:text-white-500">
                Notifications
              </h6>
              <p className="paragraph-md text-black-500 dark:text-white-500">
                You can opt-in to wallet-based updates (for example via Push
                Protocol). Opting in is explicit and controlled from your
                wallet.
              </p>
            </section>

            <section>
              <h6 className="font-medium text-black-500 dark:text-white-500">
                Transparency
              </h6>
              <p className="paragraph-md text-black-500 dark:text-white-500">
                Blockchain data is public by design. Transactions and on-chain
                events can be inspected on explorers such as Subscan or similar
                tools.
              </p>
            </section>

            <section>
              <h6 className="font-medium text-black-500 dark:text-white-500">
                Security
              </h6>
              <p className="paragraph-md text-black-500 dark:text-white-500">
                You are responsible for securing your wallet and private keys.
                TekkaDot cannot recover keys or act on behalf of a compromised
                wallet.
              </p>
            </section>

            <section>
              <h6 className="font-medium text-black-500 dark:text-white-500">
                Global use & limitations
              </h6>
              <p className="paragraph-md text-black-500 dark:text-white-500">
                We aim to respect international data principles, however
                blockchain immutability can limit certain rights (for example
                deletion). Off-chain metadata strategies (pinning, redaction, or
                layer-2 solutions) are used where appropriate.
              </p>
            </section>

            <section>
              <h6 className="font-medium text-black-500 dark:text-white-500">
                Changes
              </h6>
              <p className="paragraph-md text-black-500 dark:text-white-500">
                This policy may evolve as the project grows. Continued use of
                the platform after changes indicates acceptance of the updated
                policy.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
