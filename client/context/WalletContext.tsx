"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { ApiPromise, WsProvider } from "@polkadot/api";
import {
  web3Accounts,
  web3Enable,
  web3FromAddress,
} from "@polkadot/extension-dapp";
import { InjectedAccountWithMeta } from "@polkadot/extension-inject/types";
import { getCurrentUser } from "@/lib/api";

interface WalletContextType {
  api: ApiPromise | null;
  accounts: InjectedAccountWithMeta[];
  selectedAccount: InjectedAccountWithMeta | null;
  isConnected: boolean;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  selectAccount: (account: InjectedAccountWithMeta) => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [api, setApi] = useState<ApiPromise | null>(null);
  const [accounts, setAccounts] = useState<InjectedAccountWithMeta[]>([]);
  const [selectedAccount, setSelectedAccount] =
    useState<InjectedAccountWithMeta | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  // Function to check for JWT cookie and persist session
  const checkSession = async () => {
    if (typeof window !== "undefined") {
      const cookies = document.cookie
        .split("; ")
        .find((row) => row.startsWith("authToken="));
      if (cookies) {
        try {
          // Fetch user data from server to confirm session
          const response = await getCurrentUser();
          if (response.user) {
            setIsConnected(true);
            // Optionally set selectedAccount if the server returns wallet info
            // setSelectedAccount(response.user.wallets[0]); // Adjust based on your user model
          }
        } catch (error) {
          console.error("Session check failed:", error);
          // If invalid, clear state
          setIsConnected(false);
        }
      }
    }
  };

  useEffect(() => {
    // Initialize Polkadot API
    const initApi = async () => {
      if (typeof window !== "undefined") {
        const provider = new WsProvider("wss://rpc.polkadot.io"); // Or your endpoint
        const apiInstance = await ApiPromise.create({ provider });
        setApi(apiInstance);
      }
    };
    initApi();

    // Check for existing session on mount
    checkSession();
  }, []);

  const connectWallet = async () => {
    if (typeof window !== "undefined") {
      try {
        const extensions = await web3Enable("Tekkadot");
        if (extensions.length === 0) {
          alert("No Polkadot extension found!");
          return;
        }
        const allAccounts = await web3Accounts();
        setAccounts(allAccounts);
        setIsConnected(true);
        // Proceed with auth flow (see server-side changes below)
      } catch (error) {
        console.error("Wallet connection failed:", error);
      }
    } else {
      console.error("Cannot connect wallet: window is not defined");
    }
  };

  const disconnectWallet = () => {
    setAccounts([]);
    setSelectedAccount(null);
    setIsConnected(false);
    // Optionally call server to invalidate session
    if (typeof window !== "undefined") {
      document.cookie =
        "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }
  };

  const selectAccount = (account: InjectedAccountWithMeta) => {
    setSelectedAccount(account);
  };

  return (
    <WalletContext.Provider
      value={{
        api,
        accounts,
        selectedAccount,
        isConnected,
        connectWallet,
        disconnectWallet,
        selectAccount,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWalletContext = (): WalletContextType => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useWalletContext must be used within a WalletProvider");
  }
  return context;
};
