import jwt, {} from 'jsonwebtoken';
export function signJwt(payload, opts) {
    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: opts?.expiresIn ?? '15m',
        ...opts
    });
}
export function verifyJwt(token) {
    return jwt.verify(token, process.env.JWT_SECRET);
}
//# sourceMappingURL=jwt.js.map