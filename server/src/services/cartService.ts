// src/services/cartsService.ts
import { supabase } from '../config/supabase.js';
import type { Cart, CreateCartInput, UpdateCartInput } from '../types/carts.js';
import type { CartItem } from '../types/cartItems.js';

export interface UserCartWithItems {
  cart: Cart | null;
  items: CartItem[];
}

export async function getUserCartWithItems(user_id: string): Promise<UserCartWithItems> {
    // obtenemos el carrito más reciente del usuario
    const { data: cart, error: cartError } = await supabase
        .from('carts')
        .select('*')
        .eq('user_id', user_id)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

    if (cartError) throw cartError;
    if (!cart) return { cart: null, items: [] };

    // obtenemos todos los items de ese carrito
    const { data: items, error: itemsError } = await supabase
        .from('cart_items')
        .select('*')
        .eq('cart_id', cart.cart_id);

    if (itemsError) throw itemsError;

    return { cart, items: items ?? [] };
}

export async function listCarts(): Promise<Cart[]> {
    const { data, error } = await supabase.from('carts').select('*');
    if (error) throw error;
    return data ?? [];
}

export async function getCartById(cart_id: string): Promise<Cart | null> {
    const { data, error } = await supabase.from('carts').select('*').eq('cart_id', cart_id).single();
    if (error) throw error;
    return data ?? null;
}

export async function createCart(input: CreateCartInput): Promise<Cart> {
    const { data, error } = await supabase.from('carts').insert({ user_id: input.user_id }).select('*').single();
    if (error) throw error;
    return data as Cart;
}

export async function updateCart(cart_id: string, input: UpdateCartInput): Promise<Cart | null> {
    const { data, error } = await supabase
        .from('carts')
        .update({ updated_at: input.updated_at ?? new Date().toISOString() })
        .eq('cart_id', cart_id)
        .select('*')
        .single();
    if (error) throw error;
    return data ?? null;
}



export async function getUserCart(user_id: string): Promise<Cart | null> {
    const { data, error } = await supabase
        .from('carts')
        .select('*')
        .eq('user_id', user_id)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

    if (error) throw error;
    return data ?? null;
}

export async function deleteCart(cart_id: string): Promise<void> {
    const { error } = await supabase.from('carts').delete().eq('cart_id', cart_id);
    if (error) throw error;
}
