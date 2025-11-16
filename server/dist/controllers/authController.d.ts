import type { Request, Response } from 'express';
export declare class AuthController {
    static nonce(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static verify(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static session(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static logout(_: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=authController.d.ts.map