// src/services/walletService.ts
import { supabase } from '../config/supabase.js';
import { HttpError } from '../utils/error.js';

export async function resolveUserId(params: { walletAddress?: string; walletId?: string }) {
    if (!params.walletAddress && !params.walletId) {
        throw new HttpError(400, 'walletAddress o walletId es requerido');
    }
    if (params.walletId) {
        const { data, error } = await supabase
            .from('wallets')
            .select('user_id')
            .eq('wallet_id', params.walletId)
            .single();
        if (error || !data) throw new HttpError(404, 'Wallet no encontrada');
        return data.user_id as string;
    }
    const { data, error } = await supabase
        .from('wallets')
        .select('user_id')
        .eq('wallet_address', params.walletAddress!)
        .single();
    if (error || !data) throw new HttpError(404, 'Wallet no encontrada');
    return data.user_id as string;
}
