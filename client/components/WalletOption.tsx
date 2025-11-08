import { type WalletOptionProps } from "@/types/navbarProps";
import Image from "next/image";


const WalletOption = ({ name }: WalletOptionProps) => {

    return (
        <button 
            className="wallet-option cursor-pointer px-6 gap-6 hover:scale-[1.02] transition-transform duration-200"
        >
            <Image src={`/images/${name}.svg`} alt={`${name} wallet image`} width={105} height={105} />
            <h5 className="font-medium text-black-500 dark:text-white-500">{name}</h5>
        </button>
    );
};

export default WalletOption;