import Link from "next/link";
import ProductCard from "./ProductCard";
import { type FeaturedProductsProps } from "@/types/cards";
import { MoveUpRight } from 'lucide-react';

const FeaturedProducts = ({ products }: FeaturedProductsProps) => {
  return (
    <section className="flex flex-col justify-start mt-24 mb-16 gap-6">
      <div className="flex justify-between">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-black-500 dark:text-white-500">
          Featured Products
        </h2>
        <Link href="/products" className="flex items-center gap-1.5">
            <p className="text-xl sm:text-2xl md:text-3xl font-medium text-vivid-pink-600 dark:text-vivid-pink-400 underline-hover">All Products</p>
            <MoveUpRight className="w-[1.4rem] h-[1.5rem] text-vivid-pink-600 dark:text-vivid-pink-400" />
        </Link>
      </div>
      
      {/* Responsive grid:
          - mobile: 1 column
          - sm: 2 columns
          - md: 3 columns
          - lg: 4 columns
      */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
        {products.map((product) => (
          <ProductCard
            key={product.id + "-product"}
            {...product}
          />
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
