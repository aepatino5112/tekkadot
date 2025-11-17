// src/services/authService.ts
import { supabase } from '../config/supabase.js';
import { makeNonce, verifySignature } from '../utils/crypto.js';
import { signJwt } from '../utils/jwt.js';

type WalletType = 'talisman' | 'polkadotjs' | 'subwallet';

const nonces = new Map<string, { nonceHex: string; expiresAt: number }>();

export class AuthService {
    static issueNonce(wallet_address: string) {
        const nonceHex = makeNonce(32);
        const expiresAt = Date.now() + 2 * 60 * 1000; // 2 minutes
        nonces.set(wallet_address, { nonceHex, expiresAt });
        return { nonce: nonceHex, expiresAt };
    }

    static async verifyAndLogin(wallet_address: string, wallet_type: WalletType, signature: string) {
        const entry = nonces.get(wallet_address);
        if (!entry || entry.expiresAt < Date.now()) throw new Error('Nonce expired or missing');

        const isValid = verifySignature(entry.nonceHex, signature, wallet_address);
        if (!isValid) throw new Error('Invalid signature');

        nonces.delete(wallet_address);

        // Check if wallet already exists
        const { data: existingWallets, error: walletErr } = await supabase
            .from('wallets')
            .select('*')
            .eq('wallet_address', wallet_address)
            .limit(1);

        if (walletErr) throw walletErr;

        let user_id: string;
        let wallet_id: string;

        if (existingWallets && existingWallets.length > 0) {
            user_id = existingWallets[0].user_id;
            wallet_id = existingWallets[0].wallet_id;
        } else {
        // Create new user
            const { data: userData, error: userErr } = await supabase
                .from('users')
                .insert({})
                .select()
                .single();
            if (userErr || !userData) throw new Error('User insert failed');
            user_id = userData.user_id;

            // Link wallet to user
            const { data: walletData, error: walletInsertErr } = await supabase
                .from('wallets')
                .insert({ user_id, wallet_type, wallet_address })
                .select()
                .single();
            if (walletInsertErr || !walletData) throw new Error('Wallet insert failed');
            wallet_id = walletData.wallet_id;
        }

        const token = signJwt(
            { sub: wallet_address, uid: user_id, wid: wallet_id, wt: wallet_type },
            { expiresIn: '2h' } // ⏰ 2 hours
        );

        return { token, user_id, wallet_id };
    }

    static async linkWallet(current_user_id: string, wallet_address: string, wallet_type: WalletType, signature: string) {
        const entry = nonces.get(wallet_address);
        if (!entry || entry.expiresAt < Date.now()) throw new Error('Nonce expired or missing');

        const isValid = verifySignature(entry.nonceHex, signature, wallet_address);
        if (!isValid) throw new Error('Invalid signature');

        nonces.delete(wallet_address);

        const { data: existingWallets } = await supabase
            .from('wallets')
            .select('user_id, wallet_id')
            .eq('wallet_address', wallet_address)
            .limit(1);

        const wallet = existingWallets?.[0];
        if (wallet) {
            if (wallet.user_id !== current_user_id) {
                throw new Error('Wallet already linked to another user');
            }
            return { wallet_id: wallet.wallet_id };
        }


        const { data: walletData, error: walletInsertErr } = await supabase
            .from('wallets')
            .insert({ user_id: current_user_id, wallet_type, wallet_address })
            .select()
            .single();
        if (walletInsertErr || !walletData) throw new Error('Wallet insert failed');

        return { wallet_id: walletData.wallet_id };
    }
}
