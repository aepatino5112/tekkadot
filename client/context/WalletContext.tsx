"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { ApiPromise, WsProvider } from "@polkadot/api";
import {
  web3Accounts,
  web3Enable,
  web3FromAddress,
} from "@polkadot/extension-dapp";
import type {
  InjectedAccount,
  InjectedAccountWithMeta,
} from "@polkadot/extension-inject/types";
import { getCurrentUser } from "@/lib/api";
import { WalletType } from "@/types/wallet";

interface WalletContextType {
  api: ApiPromise | null;
  accounts: InjectedAccountWithMeta[];
  selectedAccount: InjectedAccountWithMeta | null;
  isConnected: boolean;
  connectWallet: (walletName: WalletType) => Promise<void>;
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

    // Function to automatically reconnect to the last used wallet
    const autoConnect = async () => {
      const lastConnectedWallet = localStorage.getItem(
        "lastConnectedWallet"
      ) as WalletType | null;
      if (lastConnectedWallet) {
        try {
          // We wrap this in a try-catch block to handle cases where the user
          // might have uninstalled the extension since their last visit.
          await connectWallet(lastConnectedWallet);
        } catch (error) {
          console.error("Auto-connect failed:", error);
          // If auto-connect fails, clear the stored preference
          localStorage.removeItem("lastConnectedWallet");
        }
      }
    };

    initApi();
    autoConnect(); // Attempt to auto-connect on page load

    // Check for existing server-side session on mount
    checkSession();
  }, []);

  const connectWallet = async (walletName: WalletType) => {
    if (typeof window !== "undefined") {
      console.log("Attempting to connect to:", walletName);
      const injectedExtensions = (window as any).injectedWeb3;

      // Log all available extensions to see if 'subwallet-js' is present
      console.log("Available extensions:", Object.keys(injectedExtensions));

      const wallet = injectedExtensions?.[walletName];

      if (!wallet) {
        console.error(`Extension with key '${walletName}' not found.`);
        throw new Error(
          `The ${walletName} extension is not installed. Please install it.`
        );
      }
      console.log("Wallet object found:", wallet);

      try {
        // This call will trigger the authorization popup if not already approved.
        // It returns an object with an `accounts` property.
        const injected = await wallet.enable("Tekkadot");
        console.log("Wallet enabled. 'injected' object:", injected);

        // Use get() for a one-time fetch of accounts. It's more reliable for an initial connection.
        const accs: InjectedAccount[] = await injected.accounts.get();
        console.log("Received accounts from get():", accs);

        if (!accs || accs.length === 0) {
          // This error will be thrown if the user rejects the connection,
          // closes the popup, or has no accounts in the wallet.
          throw new Error(
            `Authorization failed or no accounts found in ${walletName}. Please approve the connection and ensure you have at least one account.`
          );
        }

        console.log("Accounts found, proceeding with connection.");
        const accountsWithMeta = accs.map((a) => ({
          address: a.address,
          type: a.type,
          meta: {
            name: a.name,
            source: walletName,
            genesisHash: a.genesisHash,
          },
        }));

        setAccounts(accountsWithMeta);
        setSelectedAccount(accountsWithMeta[0]);
        setIsConnected(true);
        // On successful connection, save the wallet name to localStorage
        localStorage.setItem("lastConnectedWallet", walletName);
      } catch (error) {
        console.error("Wallet connection failed:", error);
        const message =
          error instanceof Error
            ? error.message
            : "Connection rejected or failed.";
        throw new Error(message);
      }
    } else {
      throw new Error("Cannot connect wallet in a server environment.");
    }
  };

  const disconnectWallet = () => {
    setAccounts([]);
    setSelectedAccount(null);
    setIsConnected(false);
    // On disconnect, remove the wallet preference from localStorage
    localStorage.removeItem("lastConnectedWallet");
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
