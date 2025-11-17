// src/services/productService.ts
import { supabase } from '../config/supabase.js';
import { HttpError } from '../utils/error.js';
import { PAGE_SIZE, getPagination, getOrderForSort } from '../utils/pagination.js';
import { ipfsGatewayUrl } from './ipfsService.js';
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

export async function getProductById(productId: string) {
    const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('product_id', productId)
        .eq('status', 'listed')
        .single();
    if (error) throw new HttpError(400, error.message);
    if (!data) throw new HttpError(404, 'Producto no encontrado');
    return {
        type: 'product' as const,
        id: data.product_id,
        name: data.title || 'Unnamed Product',
        description: data.description || '',
        collection: data.collection,
        price: data.price,
        imageUrl: data.ipfs_hash ? ipfsGatewayUrl(data.ipfs_hash) : '',
        status: data.status,
        created_at: data.created_at,
        seller_id: data.seller_id,
    };
}

export async function getProductsByUser(userId: string) {
    const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('seller_id', userId)
        .order('created_at', { ascending: false });
    if (error) throw new HttpError(400, error.message);
    return (data ?? []).map(item => ({
        type: 'product' as const,
        id: item.product_id,
        name: item.title || 'Unnamed Product',
        description: item.description || '',
        collection: item.collection,
        price: item.price,
        imageUrl: item.ipfs_hash ? ipfsGatewayUrl(item.ipfs_hash) : '',
        status: item.status,
        created_at: item.created_at,
        seller_id: item.seller_id,
    }));
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
    const transformedData = (data ?? []).map(item => {
        console.log('Product item from DB:', item);
        const transformed = {
            type: 'product' as const,
            id: item.product_id,
            name: item.title || 'Unnamed Product',
            description: item.description || '',
            collection: item.collection,
            price: item.price,
            imageUrl: item.ipfs_hash ? ipfsGatewayUrl(item.ipfs_hash) : '',
            status: item.status,
            created_at: item.created_at,
            seller_id: item.seller_id,
        };
        console.log('Transformed product:', transformed);
        return transformed;
    });
    return {
        items: transformedData,
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
