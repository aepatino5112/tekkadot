// src/services/nftService.ts
import { supabase } from '../config/supabase.js';
import { HttpError } from '../utils/error.js';
import { PAGE_SIZE, getPagination, getOrderForSort } from '../utils/pagination.js';
import type { NFTCreate, NFTUpdate, SortKey } from '../types/enums.js';

export async function createNFT(userId: string, payload: NFTCreate) {
    const { data, error } = await supabase
        .from('nfts')
        .insert([{ ...payload, creator_id: userId }])
        .select()
        .single();
    if (error) throw new HttpError(400, error.message);
    return data;
}

export async function updateNFT(nftId: string, userId: string, payload: NFTUpdate) {
    const { data, error } = await supabase
        .from('nfts')
        .update(payload)
        .eq('nft_id', nftId)
        .eq('creator_id', userId)
        .select()
        .single();
    if (error) throw new HttpError(400, error.message);
    if (!data) throw new HttpError(404, 'NFT no encontrado o no autorizado');
    return data;
}

export async function deleteNFT(nftId: string, userId: string) {
    const { error, count } = await supabase
        .from('nfts')
        .delete({ count: 'exact' })
        .eq('nft_id', nftId)
        .eq('creator_id', userId);
    if (error) throw new HttpError(400, error.message);
    if (!count) throw new HttpError(404, 'NFT no encontrado o no autorizado');
    return { success: true };
}

export async function getNFTsByUser(userId: string) {
    const { data, error } = await supabase
        .from('nfts')
        .select('*')
        .eq('creator_id', userId)
        .order('created_at', { ascending: false });
    if (error) throw new HttpError(400, error.message);
    return data;
}

export async function searchNFTs(params: { page: number; sort?: SortKey }) {
    const { limit, offset, page } = getPagination(params.page);
    const order = getOrderForSort(params.sort);
    const { data, error, count } = await supabase
        .from('nfts')
        .select('*', { count: 'exact' })
        .eq('status', 'listed')
        .order(order.column, { ascending: order.ascending })
        .limit(limit)
        .range(offset, offset + PAGE_SIZE - 1);
    if (error) throw new HttpError(400, error.message);
    return {
        items: data ?? [],
        meta: {
            page,
            pageSize: PAGE_SIZE,
            total: count ?? 0,
            totalPages: Math.ceil((count ?? 0) / PAGE_SIZE),
            sort: params.sort ?? 'newest',
        },
    };
}
