import ProductCard from "./ProductCard";
import { type FeaturedProductsProps } from "@/types/cards";

const FeaturedProducts = ({ products }: FeaturedProductsProps) => {
  return (
    <section className="flex flex-col justify-start mt-24 mb-16 gap-6">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-black-500 dark:text-white-500">
        Featured Products
      </h2>

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
