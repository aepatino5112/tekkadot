import jwt, { type SignOptions } from 'jsonwebtoken';

export type JwtPayload = {
  sub: string;       // wallet_address
  uid: string;       // user_id
  wid: string;       // wallet_id
  wt: 'talisman' | 'polkadotjs' | 'subwallet';
  jti?: string;
};

export function signJwt(payload: JwtPayload, opts?: SignOptions) {
    return jwt.sign(payload, process.env.JWT_SECRET as string, {
        expiresIn: opts?.expiresIn ?? '15m',
        ...opts
    });
}

export function verifyJwt(token: string) {
    return jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
}
