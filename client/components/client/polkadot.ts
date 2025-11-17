import type { WalletType, ConnectedWallet } from '@/types/wallet';

function sourceToWalletType(source?: string): WalletType {
  const s = (source || '').toLowerCase();
  if (s.includes('talisman')) return 'talisman';
  if (s.includes('subwallet')) return 'subwallet';
  return 'polkadotjs';
}

export async function connectFirstAccount(walletType?: WalletType): Promise<ConnectedWallet> {
  const { web3Enable, web3Accounts } = await import('@polkadot/extension-dapp');
  await web3Enable('Tekka');

  const accounts = await web3Accounts();

  const filteredAccounts = walletType
    ? accounts.filter(acc => sourceToWalletType(acc.meta?.source) === walletType)
    : accounts;

  if (!filteredAccounts.length) {
    throw new Error(`No accounts found in ${walletType || 'any wallet'}. Please unlock or authorize Tekka.`);
  }

  const selected = filteredAccounts[0];
  const source = selected.meta?.source || 'polkadot-js';
  return {
    address: selected.address,
    walletType: sourceToWalletType(source),
    source
  };
}

export async function signNonce(address: string, nonce: string, source: string): Promise<string> {
    const { web3FromSource } = await import('@polkadot/extension-dapp');
    const injector = await web3FromSource(source);
    const signer = injector?.signer;

    if (!signer?.signRaw) {
        throw new Error('Wallet signer not available or does not support signRaw');
    }

    // Server returns a hex nonce (without 0x). Sign the raw hex bytes by ensuring "0x" prefix.
    const dataToSign = nonce.startsWith('0x') ? nonce : `0x${nonce}`;

    const signed = await signer.signRaw({
        address,
        data: dataToSign,
        type: 'bytes'
    });

    return signed.signature;
}


