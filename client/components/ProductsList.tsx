import { type ProductProps } from "@/types/cards"; // Note the name change to ProductProps
import ProductCard from "./ProductCard";

// Define the props for this specific component
interface ProductsListProps {
  products: ProductProps[];
}

const ProductsList = ({ products }: ProductsListProps) => {
  return (
    <div className="flex flex-col mt-2 gap-6">
      <h2 className="text-xl md:text-2xl lg:text-3xl font-medium text-black-500 dark:text-white-500">
        Explore
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 lg:gap-x-11 gap-y-7">
        {products.map((product) => (
          <ProductCard
            key={`${product.id} - key`}
            {...product}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductsList;
