type WalletType = 'talisman' | 'polkadotjs' | 'subwallet';
export declare class AuthService {
    static issueNonce(wallet_address: string): {
        nonce: string;
        expiresAt: number;
    };
    static verifyAndLogin(wallet_address: string, wallet_type: WalletType, signature: string): Promise<{
        token: string;
        user_id: string;
        wallet_id: string;
    }>;
}
export {};
//# sourceMappingURL=authService.d.ts.map