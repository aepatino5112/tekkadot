"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { ApiPromise, WsProvider } from "@polkadot/api";
// web3FromAddress is no longer needed
import type {
  InjectedAccount,
  InjectedAccountWithMeta,
} from "@polkadot/extension-inject/types";
import {
  getCurrentUser,
  issueNonce,
  connectWallet as apiConnectWallet,
  logout as apiLogout,
} from "@/lib/api";
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
        try {
          const provider = new WsProvider("wss://polkadot-rpc.dwellir.com");
          const apiInstance = await ApiPromise.create({ provider });
          setApi(apiInstance);
        } catch (error) {
          console.error("Failed to initialize Polkadot API:", error);
          // Set api to null to indicate failure
          setApi(null);
        }
      }
    };

    // Function to automatically reconnect to the last used wallet
    const autoConnect = async () => {
      const lastConnectedWallet = localStorage.getItem(
        "lastConnectedWallet"
      ) as WalletType | null;
      // Also check for a session cookie
      const hasSessionCookie = document.cookie.includes("session=");

      if (lastConnectedWallet && !hasSessionCookie) {
        try {
          await connectWallet(lastConnectedWallet, true); // Pass true to indicate auto-connect
        } catch (error) {
          console.error("Auto-connect failed:", error);
          localStorage.removeItem("lastConnectedWallet");
        }
      } else if (hasSessionCookie) {
        // If there's a cookie, verify the session with the server
        await checkSession();
      }
    };

    initApi();
    autoConnect();
  }, []);

  const connectWallet = async (
    walletName: WalletType,
    isAutoConnect = false
  ) => {
    if (typeof window !== "undefined") {
      const injectedExtensions = (window as any).injectedWeb3;
      const wallet = injectedExtensions?.[walletName];

      if (!wallet) {
        throw new Error(`The ${walletName} extension is not installed.`);
      }

      try {
        const injected = await wallet.enable("Tekkadot");
        const accs: InjectedAccount[] = await injected.accounts.get({
          anyType: true,
        });

        if (!accs || accs.length === 0) {
          throw new Error(
            `Authorization failed or no accounts found in ${walletName}.`
          );
        }

        const accountToSign = accs[0]; // Use the first account for the auth flow

        // Server-side authentication flow
        // 1. Get nonce from server
        const { nonce } = await issueNonce(accountToSign.address, walletName);

        // 2. Get the signer directly from the 'injected' object.
        // This avoids the need for web3Enable and web3FromAddress.
        const injector = injected;
        if (!injector.signer.signRaw) {
          throw new Error(
            "The selected wallet does not support signing raw messages."
          );
        }

        // 3. Sign the nonce
        const { signature } = await injector.signer.signRaw({
          address: accountToSign.address,
          data: nonce,
          type: "bytes",
        });

        // 4. Send signature to server for verification and login
        // Map the wallet name to the exact ENUM value the database expects.
        let dbWalletType: "talisman" | "polkadotjs" | "subwallet";
        if (walletName === "subwallet-js") {
          dbWalletType = "subwallet";
        } else {
          dbWalletType = walletName.replace("-", "") as
            | "talisman"
            | "polkadotjs";
        }

        await apiConnectWallet(accountToSign.address, dbWalletType, signature);

        // If all successful, update UI state
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
        localStorage.setItem("lastConnectedWallet", walletName);
      } catch (error) {
        // If auto-connect fails silently, don't show an error toast to the user
        if (isAutoConnect) {
          throw error; // Just throw to be caught by the caller
        }
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

  const disconnectWallet = async () => {
    try {
      await apiLogout(); // Call server to clear the session cookie
    } catch (error) {
      console.error("Server logout failed:", error);
    } finally {
      // Always clear client-side state
      setAccounts([]);
      setSelectedAccount(null);
      setIsConnected(false);
      localStorage.removeItem("lastConnectedWallet");
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
