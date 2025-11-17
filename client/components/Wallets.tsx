import { useEffect } from "react";
import Link from "next/link";
import { Wallet, X } from "lucide-react";
import WalletOption from "./WalletOption";
import { useWalletContext } from "@/context/WalletContext";
import toast from "react-hot-toast";
import { WalletType } from "@/types/wallet";

interface WalletsProps {
  onClose: () => void;
}

const Wallets = ({ onClose }: WalletsProps) => {
  const { connectWallet: connect } = useWalletContext();

  const handleConnect = async (walletName: WalletType) => {
    try {
      await connect(walletName);
      onClose();
      toast.success(`${walletName} connected successfully!`);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      toast.error(message);
    }
  };

  return (
    <div
      className="wallet-modal-overlay"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="wallet-modal-container"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="wallet-connection">
          <div className="px-8 py-4 sm:px-6 sm:py-4">
            <div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <Wallet className="w-[2.125rem] h-[2.125rem] text-black-500 dark:text-white-500" />
                  <h3 className="font-bold text-black-500 dark:text-white-500">
                    Connect Wallet
                  </h3>
                </div>
                <button
                  onClick={onClose}
                  className="cursor-pointer"
                  aria-label="Close wallet modal"
                >
                  <X className="w-[2.125rem] h-[2.125rem] text-black-500 dark:text-white-500" />
                </button>
              </div>
              <div>
                <p className="font-normal text-200 leading-300 text-black-500 pt-4 pb-4 dark:text-white-500">
                  Choose your preferred wallet to connect to Tekka
                </p>
                <p className="text-sm font-medium text-vivid-pink-500 dark:text-vivid-pink-500 pb-8">
                  Note: You must have the corresponding browser extension
                  installed to connect.
                </p>
              </div>
            </div>
            <div className="flex flex-col justify-between items-center gap-6">
              <WalletOption
                name="Talisman"
                onClick={() => handleConnect("talisman")}
              />
              <WalletOption
                name="SubWallet"
                onClick={() => handleConnect("subwallet-js")}
              />
              <WalletOption
                name="Polkadot.Js"
                onClick={() => handleConnect("polkadot-js")}
              />
            </div>
            <div>
              <p className="text-200 text-black-500 leading-300 pt-12 dark:text-white-500">
                By connecting your wallet, you agree to our{" "}
                <Link href="/service-terms" className="wallet-terms">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy-policy" className="wallet-terms">
                  Privacy Policy
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wallets;
