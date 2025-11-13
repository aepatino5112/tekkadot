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

// Type for props in Products Cards
export type ProductProps = {
    id: number,
    name: string,
    price: number,
    trustIndex: number,
    imageUrl: string;
}

// Type for props in NFTs Cards
export type NFTProps = {
    id: number,
    name: string,
    price: number,
    rareness: string,
    category: string,
    imageUrl: string
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