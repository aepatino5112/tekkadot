import { AuthService } from '../services/authService.js';
const COOKIE_NAME = 'session';
export class AuthController {
    static async nonce(req, res) {
        const { wallet_address, wallet_type } = req.body;
        if (!wallet_address || !wallet_type) {
            return res.status(400).json({ error: 'wallet_address and wallet_type required' });
        }
        const { nonce, expiresAt } = AuthService.issueNonce(wallet_address);
        return res.json({ nonce, expiresAt });
    }
    static async verify(req, res) {
        const { wallet_address, wallet_type, signature } = req.body;
        if (!wallet_address || !wallet_type || !signature) {
            return res.status(400).json({ error: 'Missing wallet_address, wallet_type, or signature' });
        }
        try {
            const { token, user_id, wallet_id } = await AuthService.verifyAndLogin(wallet_address, wallet_type, signature);
            res.cookie(COOKIE_NAME, token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                path: '/',
                maxAge: 15 * 60 * 1000
            });
            return res.json({ user_id, wallet_id });
        }
        catch (err) {
            const message = err instanceof Error ? err.message : String(err);
            const isAuthError = message.includes('Nonce') || message.includes('signature');
            return res.status(isAuthError ? 401 : 500).json({ error: message });
        }
    }
    static async session(req, res) {
        if (!req.user)
            return res.status(401).json({ error: 'Unauthorized' });
        return res.json(req.user);
    }
    static async logout(_, res) {
        res.clearCookie(COOKIE_NAME, { path: '/' });
        res.status(204).end();
    }
}
//# sourceMappingURL=authController.js.map