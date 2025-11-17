export type WalletType = 'talisman' | 'subwallet' | 'polkadotjs';

export type ConnectedWallet = {
  address: string;
  walletType: WalletType;
  source: string;
};

export interface SessionUser {
  user_id: string;
  wallet_id: string;
  wallet_address: string;
  wallet_type: WalletType;
}
