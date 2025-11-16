import type { WalletType, ConnectedWallet } from '@/types/wallet';

function sourceToWalletType(source?: string): WalletType {
  const s = (source || '').toLowerCase();
  if (s.includes('talisman')) return 'talisman';
  if (s.includes('subwallet')) return 'subwallet';
  return 'polkadotjs';
}

export async function enableExtensions(appName = 'Tekka') {
  const { web3Enable } = await import('@polkadot/extension-dapp');
  const injected = await web3Enable(appName);
  if (!injected.length) throw new Error('No wallet extensions found');
}

export async function connectFirstAccount(): Promise<ConnectedWallet> {
  const { web3Enable, web3Accounts } = await import('@polkadot/extension-dapp');
  await web3Enable('Tekka');
  const accounts = await web3Accounts();
  if (!accounts.length) throw new Error('No accounts available. Please unlock your wallet or authorize Tekka.');
  const selected = accounts[0];
  return {
    address: selected.address,
    walletType: sourceToWalletType(selected.meta?.source)
  };
}

export async function signNonce(address: string, nonce: string): Promise<string> {
  const { web3FromAddress } = await import('@polkadot/extension-dapp');
  const injector = await web3FromAddress(address);
  const signer = injector?.signer;

  if (!signer?.signRaw) {
    throw new Error('Wallet signer not available or does not support signRaw');
  }

  const signed = await signer.signRaw({
    address,
    data: stringToHex(nonce),
    type: 'bytes'
  });

  return signed.signature;
}

function stringToHex(str: string): `0x${string}` {
  const buf = new TextEncoder().encode(str);
  return ('0x' + Array.from(buf).map(b => b.toString(16).padStart(2, '0')).join('')) as `0x${string}`;
}

