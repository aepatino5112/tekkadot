import Link from "next/link";
import { Wallet, X } from 'lucide-react';
import WalletOption from "./WalletOption";

interface WalletsProps {
    onClose: () => void;
}

const Wallets = ({ onClose }: WalletsProps) => {

    return (
        <div className="wallet-connection">
            <div className="px-8 py-4">
                <div>
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-4">
                            <Wallet className="w-[34px] h-[34px] text-black-500 dark:text-white-500" />
                            <h3 className="font-bold text-black-500 dark:text-white-500">Connect Wallet</h3>
                        </div>
                        <button
                            onClick={onClose}
                            className="cursor-pointer"
                            aria-label="Close wallet modal"
                        >
                            <X className="w-[34px] h-[34px] text-black-500 dark:text-white-500"/>
                        </button>
                    </div>
                    <div>
                        <p className="font-normal text-200 leading-300 text-black-500 pt-4 pb-12 dark:text-white-500">Choose your preferred wallet to connect to Tekka</p>
                    </div>
                </div>
                <div className="flex flex-col justify-between items-center gap-6">
                    <WalletOption name="Talisman" />
                    <WalletOption name="SubWallet" />
                    <WalletOption name="Polkadot.Js" />  
                </div>
                <div>
                    <p className="text-200 text-black-500 leading-300 pt-12 dark:text-white-500">By connecting your wallet, you agree to our <Link href="terms" className="wallet-terms">Terms of Service</Link> and <Link href="/privacy-policy" className="wallet-terms">Privacy Policy</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Wallets;