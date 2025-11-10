import Link from "next/link";
import ProductCard from "./ProductCard";
import { type FeaturedProductsProps } from "@/types/cards";
import { MoveUpRight } from 'lucide-react';

const FeaturedProducts = ({ products  }: FeaturedProductsProps ) => {

    return (
        <section className="flex flex-col justify-start mt-73 gap-[3.5rem]">
            <div className="flex justify-between">
                <h2 className="text-black-500 dark:text-white-500 font-semibold">Featured Products</h2>
                <Link href="/products" className="flex items-center gap-1.5">
                    <p className="text-[2rem] font-medium text-vivid-pink-600 dark:text-vivid-pink-400 underline-hover">All Products</p>
                    <MoveUpRight className="w-[1.896rem] h-[1.799rem] text-vivid-pink-600 dark:text-vivid-pink-400" />
                </Link>
            </div>
            <div className="flex justify-between items-center gap-[1.5rem]">
                {products.map((product) => (
                    <ProductCard 
                        key={product.id + "-product"}
                        id={product.id} 
                        name={product.name} 
                        price={product.price} 
                        trustIndex={product.trustIndex} 
                        imageUrl={product.imageUrl} 
                    />
                ))}
            </div>
        </section>
    );
};

export default FeaturedProducts;