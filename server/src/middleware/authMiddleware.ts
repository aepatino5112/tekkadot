// src/middleware/authMiddleware.ts
import type { Request, Response, NextFunction } from 'express';
import { verifyJwt } from '../utils/jwt.js';

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies?.session;
    if (!token) return res.status(401).json({ error: 'Missing session' });

    try {
        const payload = verifyJwt(token);
        req.user = {
            user_id: payload.uid,
            wallet_id: payload.wid,
            wallet_address: payload.sub,
            wallet_type: payload.wt,
        };
        next();
        return;
    } catch (err) {
        console.log(err);
        return res.status(401).json({ error: 'Invalid session' });
    }
}
