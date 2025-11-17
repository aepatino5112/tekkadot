// src/services/authService.ts
import { supabase } from '../config/supabase.js';
import { makeNonce } from '../utils/crypto.js'; // verifySignature is no longer needed from here
import { signJwt } from '../utils/jwt.js';
import { signatureVerify } from "@polkadot/util-crypto";

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
        const verificationResult = this._verifySignatureAndNonce(wallet_address, signature);
        if (!verificationResult.isValid) {
            throw new Error(verificationResult.error || 'Invalid signature');
        }

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
        const verificationResult = this._verifySignatureAndNonce(wallet_address, signature);
        if (!verificationResult.isValid) {
            throw new Error(verificationResult.error || 'Invalid signature');
        }

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

    static async getUserById(userId: string) {
        const { data: user, error } = await supabase
            .from("users")
            .select(`
              user_id,
              wallets (wallet_address, wallet_type)
            `)
            .eq("user_id", userId)
            .single();
        if (error) throw new Error("User not found");
        return user;
    }

    // This method can be removed as its logic is now in _verifySignatureAndNonce
    /*
    static async verifyNonce(wallet_address: string, signature: string) { ... }
    */

    // This method can be removed as its logic is now in _verifySignatureAndNonce
    /*
    static async verifyLogin(wallet_address: string, signature: string) { ... }
    */

    // This method can be removed as its logic is now in _verifySignatureAndNonce
    /*
    static async findOrCreateUser(wallet_address: string, wallet_type: WalletType, signature: string) { ... }
    */

    /**
     * Private helper to encapsulate nonce retrieval and signature verification.
     * This is the single source of truth for verification.
     */
    private static _verifySignatureAndNonce(wallet_address: string, signature: string): { isValid: boolean, error?: string } {
        const nonceData = nonces.get(wallet_address);

        if (!nonceData || nonceData.expiresAt < Date.now()) {
            nonces.delete(wallet_address);
            return { isValid: false, error: "Nonce expired or not found" };
        }

        const { nonceHex } = nonceData;

        // Pass the hex string directly to signatureVerify.
        // The utility will handle the conversion from hex to bytes internally.
        const { isValid } = signatureVerify(nonceHex, signature, wallet_address);

        // Clean up the used nonce immediately after verification attempt.
        nonces.delete(wallet_address);

        if (!isValid) {
            return { isValid: false, error: "Invalid signature" };
        }

        return { isValid: true };
    }
}
