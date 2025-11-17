// src/controllers/authController.ts
import type { Request, Response } from 'express';
import { AuthService } from '../services/authService.js';
import { verifyToken } from '../utils/jwt.js';

const COOKIE_NAME = 'session';

export class AuthController {
    static async nonce(req: Request, res: Response) {
        const { wallet_address, wallet_type } = req.body;
        if (!wallet_address || !wallet_type) {
            return res.status(400).json({ error: 'wallet_address and wallet_type required' });
        }
        const { nonce, expiresAt } = AuthService.issueNonce(wallet_address);
        return res.json({ nonce, expiresAt });
    }

    static async connect(req: Request, res: Response) {
        const { wallet_address, wallet_type, signature } = req.body;
        if (!wallet_address || !wallet_type || !signature) {
            return res.status(400).json({ error: 'Missing wallet_address, wallet_type, or signature' });
        }

        try {
            let result;
            if (req.user) {
            // Already logged in → link wallet
                result = await AuthService.linkWallet(req.user.user_id, wallet_address, wallet_type, signature);
            } else {
            // No session → login
                result = await AuthService.verifyAndLogin(wallet_address, wallet_type, signature);

                res.cookie(COOKIE_NAME, result.token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'lax',
                    path: '/',
                    maxAge: 2 * 60 * 60 * 1000, // ⏰ 2 hours
                });
            }

            return res.json(result);
        } catch (err) {
            const message = err instanceof Error ? err.message : String(err);
            return res.status(401).json({ error: message });
        }
    }

    static async session(req: Request, res: Response) {
        if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
        return res.json(req.user);
    }

    static async logout(_: Request, res: Response) {
        res.clearCookie(COOKIE_NAME, { path: '/' });
        res.status(204).end();
    }

    static async connectWallet(req: Request, res: Response) {
        try {
            const { address, signature } = req.body;

            // Assume message is the nonce, but since the class uses signature for nonce, perhaps signature is for nonce.
            // Adjust based on client sending signature for nonce.

            // Check for existing JWT in cookies
            const token = req.cookies.authToken;
            let userId: string | null = null;

            if (token) {
                try {
                    const decoded = verifyToken(token);
                    userId = decoded.userId; // Assuming uid is user_id
                } catch (error) {
                    // Invalid token, proceed as new user
                }
            }

            if (userId) {
                // Link wallet to existing user
                const result = await AuthService.linkWallet(userId, address, 'polkadotjs', signature); // Assume wallet_type
                res.status(200).json({ message: 'Wallet linked successfully', wallet_id: result.wallet_id });
            } else {
                // Create new user
                const result = await AuthService.verifyAndLogin(address, 'polkadotjs', signature);
                res.cookie('authToken', result.token, { httpOnly: true, secure: true });
                res.status(200).json({ message: 'Wallet connected successfully', user_id: result.user_id, wallet_id: result.wallet_id });
            }
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }

    // New endpoint to get current user (for session check)
    static async getCurrentUser(req: Request, res: Response) {
        try {
            const token = req.cookies.authToken;
            if (!token) return res.status(401).json({ error: 'No token' });

            const decoded = verifyToken(token);
            const user = await AuthService.getUserById(decoded.userId); // Assuming uid is user_id
            res.status(200).json({ user });
        } catch (error) {
            res.status(401).json({ error: 'Invalid token' });
        }
    }
}

