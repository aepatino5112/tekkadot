import { type SignOptions } from 'jsonwebtoken';
export type JwtPayload = {
    sub: string;
    uid: string;
    wid: string;
    wt: 'talisman' | 'polkadotjs' | 'subwallet';
    jti?: string;
};
export declare function signJwt(payload: JwtPayload, opts?: SignOptions): string;
export declare function verifyJwt(token: string): JwtPayload;
//# sourceMappingURL=jwt.d.ts.map