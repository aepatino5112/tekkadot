import { type ProductsProps } from "@/types/cards";
import ProductCard from "./ProductCard";

const ProductsList = ({ products }: ProductsProps) => {

    return (
        <div className="flex flex-col mt-2 gap-6">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-medium text-black-500 dark:text-white-500">Explore</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-20 lg:gap-x-26 gap-y-18">
                {products.map((product) => (
                    <ProductCard
                        key={`${product.id} - key`}
                        id={product.id}
                        name={product.name}
                        price={product.price}
                        trustIndex={product.trustIndex}
                        imageUrl={product.imageUrl}
                    />
                ))}
            </div>
        </div>
    );
};

export default ProductsList;