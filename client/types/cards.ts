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

// Interface for tags in NFTs Cards
interface Tag {
    id: number;
    name: string;
}

// Interface for NFTs Cards
export interface NFT {
    id: number;
    name: string;
    price: number;
    tags?: Tag[];
    imageUrl: string;
    createdAt: Date;
    updatedAt?: Date;
}

// Type for props in Products Cards
export type ProductProps = {
    name: string,
    price: number,
    trustIndex: number,
    imageUrl: string;
}

// Type for props in NFTs Cards
export type NFTProps = {
    name: string,
    price: number,
    tags?: Tag[],
    imageUrl: string
}