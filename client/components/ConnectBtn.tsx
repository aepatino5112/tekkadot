"use client";
import React from "react";
import { Wallet } from "lucide-react";
import { useWalletContext } from "@/context/WalletContext";

interface ConnectBtnProps {
  onClick: () => void;
}

const ConnectBtn: React.FC<ConnectBtnProps> = ({ onClick }) => {
  const { isConnected, connectWallet, disconnectWallet } = useWalletContext();

  return (
    <button
      onClick={onClick}
      className="connect-wallet-btn-gradient flex items-center gap-2 text-white-500 text-[1rem] font-medium p-2 rounded-lg"
    >
      <Wallet className="w-[1.125rem] h-[1.125rem]" />
      {isConnected ? "Disconnect Wallet" : "Connect Wallet"}
    </button>
  );
};

export default ConnectBtn;
