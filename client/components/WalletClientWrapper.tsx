'use client';

import { WalletProvider } from '@/context/WalletContext';

export default function WalletClientWrapper({ children }: { children: React.ReactNode }) {
  return <WalletProvider>{children}</WalletProvider>;
}
