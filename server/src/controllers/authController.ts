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

    static async verify(req: Request, res: Response) {
        try {
            const { wallet_address, wallet_type, signature } = req.body;
            if (!wallet_address || !wallet_type || !signature) {
                return res.status(400).json({ error: 'wallet_address, wallet_type and signature required' });
            }
            const { token, user_id, wallet_id } = await AuthService.verifyAndLogin(wallet_address, wallet_type, signature);

            // Set httpOnly JWT cookie
            res.cookie(COOKIE_NAME, token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                path: '/',
                maxAge: 15 * 60 * 1000
            });

            return res.json({ user_id, wallet_id });
        } catch (e: unknown) {
            const message = e instanceof Error ? e.message : String(e);
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
