'use client';

import { createContext, useContext, useState, useCallback } from 'react';
import type { ConnectedWallet, SessionUser, WalletType } from '@/types/wallet';
import { connectFirstAccount, signNonce } from '@/components/client/polkadot';
import { issueNonce, verifySignature, fetchSession } from '@/lib/api';

type WalletContextType = {
  connected: ConnectedWallet | null;
  user: SessionUser | null;
  loading: boolean;
  error: string | null;
  connect: () => Promise<void>;
  disconnect: () => void;
};

const WalletContext = createContext<WalletContextType | null>(null);

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [connected, setConnected] = useState<ConnectedWallet | null>(null);
  const [user, setUser] = useState<SessionUser | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const connect = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const cw = await connectFirstAccount();
      setConnected(cw);

      const { nonce } = await issueNonce(cw.address);
      const signature = await signNonce(cw.address, nonce);
      await verifySignature(cw.address, cw.walletType, signature);

      const { user } = await fetchSession();
      setUser({
        user_id: user.user_id,
        wallet_id: user.wallet_id,
        wallet_address: user.wallet_address,
        wallet_type: user.wallet_type as WalletType
      });
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : 'Unknown error';
      setError(message);
      throw e;
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
