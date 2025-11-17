// src/models/cartItems.ts
export interface CartItem {
  cart_item_id: string;
  quantity: number;
  added_at: string;
  cart_id: string;
  product_id?: string | null;
  nft_id?: string | null;
}

export interface CreateCartItemInput {
  cart_id: string;
  quantity?: number;
  added_at: string;
  product_id?: string | null;
  nft_id?: string | null;
}

export interface UpdateCartItemInput {
  quantity?: number;
  added_at?: string;
  product_id?: string | null;
  nft_id?: string | null;
}
