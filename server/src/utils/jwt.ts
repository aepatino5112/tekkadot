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
        expiresIn: opts?.expiresIn ?? '120m',
        ...opts
    });
}

export function verifyJwt(token: string) {
    return jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
}

export const generateToken = (payload: { userId: string; wallets: string[] }) => {
  return jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: "7d" });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET!) as { userId: string; wallets: string[] };
};
