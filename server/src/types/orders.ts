// src/models/orders.ts
export interface Order {
  order_id: string;
  tx_hash: string;
  nft_receipt_hash: string;
  total: string;
  created_at: string;
  buyer_id: string;
  wallet_id: string;
  cart_id: string;
}

export interface CreateOrderInput {
  tx_hash: string;
  nft_receipt_hash: string;
  total: string;
  buyer_id: string;
  wallet_id: string;
  cart_id: string;
}

export interface UpdateOrderInput {
  tx_hash?: string;
  nft_receipt_hash?: string;
  total?: string;
}
