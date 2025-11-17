'use client';

import { createContext, useContext, useState, useCallback } from 'react';
import type { ConnectedWallet, SessionUser, WalletType } from '@/types/wallet';
import { connectFirstAccount, signNonce } from '@/components/client/polkadot';
import { issueNonce, connectWallet, fetchSession } from '@/lib/api';
import { useEffect } from 'react';

type WalletContextType = {
  connected: ConnectedWallet | null;
  user: SessionUser | null;
  loading: boolean;
  error: string | null;
  connect: (walletType?: WalletType) => Promise<void>;
  disconnect: () => void;
};

const WalletContext = createContext<WalletContextType | null>(null);

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [connected, setConnected] = useState<ConnectedWallet | null>(null);
  const [user, setUser] = useState<SessionUser | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ✅ Hydrate session on mount
  useEffect(() => {
    (async () => {
      try {
        const { user } = await fetchSession();
        setUser({
          user_id: user.user_id,
          wallet_id: user.wallet_id,
          wallet_address: user.wallet_address,
          wallet_type: user.wallet_type as WalletType,
        });
        setConnected({
          address: user.wallet_address,
          walletType: user.wallet_type as WalletType,
          source: 'session',
        });
      } catch {
        // no valid session, leave user null
      }
    })();
  }, []);


  const connect = useCallback(async (preferred?: WalletType) => {
    setLoading(true);
    setError(null);
    try {
      const cw = await connectFirstAccount(preferred);
      setConnected(cw);

      // Send both wallet_address and wallet_type
      const { nonce } = await issueNonce(cw.address, cw.walletType);
      console.log("Issued nonce:", nonce);

      const signature = await signNonce(cw.address, nonce, cw.source);
      console.log("Signature:", signature);

      // ✅ STEP 3: Log the payload before calling verify
      console.log("Verifying with:", {
        wallet_address: cw.address,
        wallet_type: cw.walletType,
        signature
      });


      const { user_id, wallet_id } = await connectWallet(cw.address, cw.walletType, signature);

      setUser({
        user_id,
        wallet_id,
        wallet_address: cw.address,
        wallet_type: cw.walletType
      });

    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : 'Unknown error';
      setError(message);
      throw e; // allow modal to toast.error
    } finally {
      setLoading(false);
    }
  }, []);

  const disconnect = useCallback(() => {
    setConnected(null);
    setUser(null);
  }, []);

  return (
    <WalletContext.Provider value={{ connected, user, loading, error, connect, disconnect }}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWalletContext() {
  const ctx = useContext(WalletContext);
  if (!ctx) throw new Error('useWalletContext must be used inside WalletProvider');
  return ctx;
}
