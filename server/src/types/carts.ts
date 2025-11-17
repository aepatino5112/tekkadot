// src/models/carts.ts
export interface Cart {
  cart_id: string;
  created_at: string;
  updated_at: string;
  user_id: string;
}

export interface CreateCartInput {
  user_id: string;
}

export interface UpdateCartInput {
  updated_at?: string;
}
