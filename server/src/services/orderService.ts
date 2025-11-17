// src/services/ordersService.ts
import { supabase } from '../config/supabase.js';
import type { Order, CreateOrderInput, UpdateOrderInput } from '../types/orders.js';

export async function listOrders(): Promise<Order[]> {
    const { data, error } = await supabase.from('orders').select('*');
    if (error) throw error;
    return data ?? [];
}

export async function listOrdersByBuyer(buyer_id: string): Promise<Order[]> {
    const { data, error } = await supabase.from('orders').select('*').eq('buyer_id', buyer_id);
    if (error) throw error;
    return data ?? [];
}

export async function getUserOrders(user_id: string): Promise<Order[]> {
    // todas las órdenes de un usuario
    const { data, error } = await supabase
        .from('orders')
        .select(`
        *,
        carts(*),
        cart_items(*),
        wallets(*)
        `)
        .eq('buyer_id', user_id);

    if (error) throw error;
    return data ?? [];
}

export async function getOrderById(order_id: string): Promise<Order | null> {
    const { data, error } = await supabase.from('orders').select('*').eq('order_id', order_id).single();
    if (error) throw error;
    return data ?? null;
}

export async function createOrder(input: CreateOrderInput): Promise<Order> {
    const { data, error } = await supabase
        .from('orders')
        .insert({
            tx_hash: input.tx_hash,
            nft_receipt_hash: input.nft_receipt_hash,
            total: input.total,
            buyer_id: input.buyer_id,
            wallet_id: input.wallet_id,
            cart_id: input.cart_id,
        })
        .select('*')
        .single();
    if (error) throw error;
    return data as Order;
}

export async function updateOrder(order_id: string, input: UpdateOrderInput): Promise<Order | null> {
    const payload = Object.fromEntries(Object.entries(input).filter(([, v]) => v !== undefined));
    const { data, error } = await supabase.from('orders').update(payload).eq('order_id', order_id).select('*').single();
    if (error) throw error;
    return data ?? null;
}

export async function deleteOrder(order_id: string): Promise<void> {
    const { error } = await supabase.from('orders').delete().eq('order_id', order_id);
    if (error) throw error;
}
