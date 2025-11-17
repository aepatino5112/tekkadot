export type SortKey = 'h-price' | 'l-price' | 'newest' | 'oldest';

export type Status = 'listed' | 'sold';

export type Collection = 'gaming' | 'laptop' | 'mobile' | 'wearable';

export type Category = 'art' | 'collectible' | 'music' | 'fresh' | 'cyberpunk';
export type Rareness = 'common' | 'rare' | 'epic' | 'legendary';

export interface ProductCreate {
  title: string;
  description: string;
  collection: Collection;
  price: number;
  ipfs_hash: string;
  status?: Status;
}

export type ProductUpdate = Partial<ProductCreate>;

export interface NFTCreate {
  title: string;
  description: string;
  category: Category;
  rareness: Rareness;
  price: number;
  ipfs_hash: string;
  status?: Status;
}

export type NFTUpdate = Partial<NFTCreate>;
