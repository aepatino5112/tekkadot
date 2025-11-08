"use client";
import { Wallet } from "lucide-react";

interface ConnectBtnProps {
    onClick?: () => void;
}

const ConnectBtn = ({ onClick }: ConnectBtnProps) => {

    return (
        <button 
            onClick={onClick}
            className="connect-wallet-btn-gradient flex items-center gap-2 text-white-500 text-[16px] font-medium p-2 rounded-lg"
        >
            <Wallet className="w-[18px] h-[18px]" />
            Connect Wallet
        </button>
    );
};

export default ConnectBtn;