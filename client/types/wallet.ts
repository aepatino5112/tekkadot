export type WalletType = 'talisman' | 'subwallet' | 'polkadotjs';

export interface ConnectedWallet {
  address: string;
  walletType: WalletType;
}

export interface SessionUser {
  user_id: string;
  wallet_id: string;
  wallet_address: string;
  wallet_type: WalletType;
}
