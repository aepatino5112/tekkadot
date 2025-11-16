import type { Request, Response, NextFunction } from 'express';
import { verifyJwt } from '../utils/jwt.js';

const COOKIE_NAME = 'session';

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies?.[COOKIE_NAME];
    if (!token) return res.status(401).json({ error: 'Missing session' });

    try {
        const payload = verifyJwt(token);
        req.user = {
            user_id: payload.uid,
            wallet_id: payload.wid,
            wallet_address: payload.sub,
            wallet_type: payload.wt
        };
        return next();
    } catch {
        res.status(401).json({ error: 'Invalid session' });
    }
}
