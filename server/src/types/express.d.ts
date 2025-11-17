declare global {
  namespace Express {
    interface Request {
      user?: {
        user_id: string;
        wallet_id: string;
        wallet_address: string;
        wallet_type: 'talisman' | 'polkadotjs' | 'subwallet';
      };
      tokenId?: string;
      file?: Express.Multer.File;
    }
  }
}

export {};