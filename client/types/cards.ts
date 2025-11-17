// Interface for Product Cards
export interface Product {
    id: number;
    name: string;
    price: number;
    trustIndex: number;
    imageUrl: string;
    createdAt: Date;
    updatedAt?: Date;
}

// Interface for NFTs Cards
export interface NFT {
    id: number;
    name: string;
    price: number;
    rareness: string;
    category: string;
    imageUrl: string;
    createdAt: Date;
    updatedAt?: Date;
}

// Type for props in Products Cards (updated to match API response)
export interface ProductProps {
  type: "product"; // Add type discriminator
  id: string; // Maps to product_id
  name: string; // Maps to title
  description: string; // New field
  collection: string;
  price: number;
  imageUrl: string; // Maps to ipfs_hash
  status: "listed" | "sold"; // New field
  created_at: string; // New field
  seller_id: string; // New field
}

// Type for props in NFTs Cards (updated to match API response)
export interface NFTProps {
  type: "nft"; // Add type discriminator
  id: string; // Maps to nft_id
  name: string; // Maps to title
  description: string; // New field
  category: string;
  rareness: "common" | "rare" | "epic" | "legendary";
  price: number;
  imageUrl: string; // Maps to ipfs_hash
  status: "listed" | "sold"; // New field
  created_at: string; // New field
  creator_id: string; // Changed from seller_id to match API
}

// Type for featured products props
export type FeaturedProductsProps = {
    products: ProductProps[]
}


// Type for featured NFTs props
export type FeaturedNFTsProps = {
    nfts: NFTProps[]
}

// Type for Collection Card Props
export type CollectionCardProps = {
    name: string
}

// Type for Products Props
export type ProductsProps = {
    products: ProductProps[]
}

// Type for NFTs Props
export type NFTsProps = {
    nfts: NFTProps[]
}