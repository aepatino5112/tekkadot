// src/services/productService.ts
import { supabase } from '../config/supabase.js';
import { HttpError } from '../utils/error.js';
import { PAGE_SIZE, getPagination, getOrderForSort } from '../utils/pagination.js';
import type { Collection, ProductCreate, ProductUpdate, SortKey } from '../types/enums.js';

export async function createProduct(userId: string, payload: ProductCreate) {
    const { data, error } = await supabase
        .from('products')
        .insert([{ ...payload, seller_id: userId }])
        .select()
        .single();
    if (error) throw new HttpError(400, error.message);
    return data;
}

export async function updateProduct(productId: string, userId: string, payload: ProductUpdate) {
    const { data, error } = await supabase
        .from('products')
        .update(payload)
        .eq('product_id', productId)
        .eq('seller_id', userId)
        .select()
        .single();
    if (error) throw new HttpError(400, error.message);
    if (!data) throw new HttpError(404, 'Producto no encontrado o no autorizado');
    return data;
}

export async function deleteProduct(productId: string, userId: string) {
    const { error, count } = await supabase
        .from('products')
        .delete({ count: 'exact' })
        .eq('product_id', productId)
        .eq('seller_id', userId);
    if (error) throw new HttpError(400, error.message);
    if (!count) throw new HttpError(404, 'Producto no encontrado o no autorizado');
    return { success: true };
}

export async function getProductsByUser(userId: string) {
    const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('seller_id', userId)
        .order('created_at', { ascending: false });
    if (error) throw new HttpError(400, error.message);
    return data;
}

export async function searchProducts(params: { page: number; sort?: SortKey; collection?: Collection }) {
    const { limit, offset, page } = getPagination(params.page);
    const order = getOrderForSort(params.sort);
    let query = supabase
        .from('products')
        .select('*', { count: 'exact' })
        .eq('status', 'listed')
        .order(order.column, { ascending: order.ascending })
        .limit(limit)
        .range(offset, offset + PAGE_SIZE - 1);
    if (params.collection) query = query.eq('collection', params.collection);
    const { data, error, count } = await query;
    if (error) throw new HttpError(400, error.message);
    return {
        items: data ?? [],
        meta: {
            page,
            pageSize: PAGE_SIZE,
            total: count ?? 0,
            totalPages: Math.ceil((count ?? 0) / PAGE_SIZE),
            sort: params.sort ?? 'newest',
            collection: params.collection ?? null,
        },
    };
}
