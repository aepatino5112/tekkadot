// src/services/authService.ts
import { db } from '../drizzle/db.js';
import { UsersTable } from '../drizzle/tables/users.js';
import { WalletsTable } from '../drizzle/tables/wallets.js';
import { eq } from 'drizzle-orm';
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
        if (!entry || entry.expiresAt < Date.now()) {
            throw new Error('Nonce expired or missing');
        }

        const isValid = verifySignature(entry.nonceHex, signature, wallet_address);
        if (!isValid) throw new Error('Invalid signature');

        nonces.delete(wallet_address);

        // Upsert wallet and user
        const existing = await db.select()
            .from(WalletsTable)
            .where(eq(WalletsTable.wallet_address, wallet_address))
            .limit(1);

        let user_id: string;
        let wallet_id: string;

        if (existing.length && existing[0]) {
            user_id = existing[0].user_id!;
            wallet_id = existing[0].wallet_id!;
        } else {
            const [user] = await db.insert(UsersTable).values({}).returning();
            if (!user) throw new Error('User insert failed');

            user_id = user.user_id;

            const [wallet] = await db.insert(WalletsTable).values({
                user_id,
                wallet_type,
                wallet_address
            }).returning();

            if (!wallet) throw new Error('Wallet insert failed');

            wallet_id = wallet.wallet_id;
        }


        const token = signJwt({
            sub: wallet_address,
            uid: user_id,
            wid: wallet_id,
            wt: wallet_type
        }, { expiresIn: '15m' });

        return { token, user_id, wallet_id };
    }
}
