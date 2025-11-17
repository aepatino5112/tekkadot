// src/controllers/authController.ts
import type { Request, Response } from 'express';
import { AuthService } from '../services/authService.js';

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
}

