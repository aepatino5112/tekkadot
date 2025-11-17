import { db } from '../drizzle/db.js';
import { sql } from 'drizzle-orm';
import { makeNonce, verifySignature } from '../utils/crypto.js';
import { signJwt } from '../utils/jwt.js';
const nonces = new Map();
export class AuthService {
    static issueNonce(wallet_address) {
        const nonceHex = makeNonce(32);
        const expiresAt = Date.now() + 2 * 60 * 1000; // 2 minutes
        nonces.set(wallet_address, { nonceHex, expiresAt });
        return { nonce: nonceHex, expiresAt };
    }
    static async verifyAndLogin(wallet_address, wallet_type, signature) {
        // Step 1: Validate nonce
        const entry = nonces.get(wallet_address);
        if (!entry || entry.expiresAt < Date.now()) {
            throw new Error('Nonce expired or missing');
        }
        // Step 2: Verify signature
        const isValid = verifySignature(entry.nonceHex, signature, wallet_address);
        if (!isValid)
            throw new Error('Invalid signature');
        // Step 3: Clear nonce
        nonces.delete(wallet_address);
        // Step 4: Always insert a new user
        const userInsert = await db.execute(sql `INSERT INTO users DEFAULT VALUES RETURNING user_id`);
        const userRow = userInsert.rows[0];
        if (!userRow)
            throw new Error('User insert failed');
        const user_id = userRow.user_id;
        // Step 5: Insert wallet, overwrite if exists
        const walletInsert = await db.execute(sql `INSERT INTO wallets (user_id, wallet_type, wallet_address)
                VALUES (${user_id}, ${wallet_type}, ${wallet_address})
                ON CONFLICT (wallet_address)
                DO UPDATE SET 
                user_id = EXCLUDED.user_id,
                wallet_type = EXCLUDED.wallet_type,
                updated_at = NOW()
                RETURNING wallet_id`);
        const walletRow = walletInsert.rows[0];
        if (!walletRow)
            throw new Error('Wallet insert/update failed');
        const wallet_id = walletRow.wallet_id;
        // Step 6: Issue JWT
        const token = signJwt({ sub: wallet_address, uid: user_id, wid: wallet_id, wt: wallet_type }, { expiresIn: '15m' });
        return { token, user_id, wallet_id };
    }
}
//# sourceMappingURL=authService.js.map