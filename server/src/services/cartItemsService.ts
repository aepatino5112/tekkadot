// src/services/cartItemsService.ts
import { supabase } from '../config/supabase.js';
import type { CartItem, CreateCartItemInput, UpdateCartItemInput } from '../types/cartItems.js';

export async function listCartItemsByCart(cart_id: string): Promise<CartItem[]> {
    const { data, error } = await supabase.from('cart_items').select('*').eq('cart_id', cart_id);
    if (error) throw error;
    return data ?? [];
}

export async function getCartItemById(cart_item_id: string): Promise<CartItem | null> {
    const { data, error } = await supabase.from('cart_items').select('*').eq('cart_item_id', cart_item_id).single();
    if (error) throw error;
    return data ?? null;
}

export async function createCartItem(input: CreateCartItemInput): Promise<CartItem> {
    const { data, error } = await supabase
        .from('cart_items')
        .insert({
            cart_id: input.cart_id,
            quantity: input.quantity ?? 1,
            added_at: input.added_at,
            product_id: input.product_id ?? null,
            nft_id: input.nft_id ?? null,
        })
        .select('*')
        .single();
    if (error) throw error;
    return data as CartItem;
}

export async function updateCartItem(cart_item_id: string, input: UpdateCartItemInput): Promise<CartItem | null> {
    const payload = Object.fromEntries(Object.entries(input).filter(([, v]) => v !== undefined));
    const { data, error } = await supabase.from('cart_items').update(payload).eq('cart_item_id', cart_item_id).select('*').single();
    if (error) throw error;
    return data ?? null;
}

export async function deleteCartItem(cart_item_id: string): Promise<void> {
    const { error } = await supabase.from('cart_items').delete().eq('cart_item_id', cart_item_id);
    if (error) throw error;
}
