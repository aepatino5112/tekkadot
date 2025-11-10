import ProductCard from "./ProductCard";
import { type FeaturedProductsProps } from "@/types/cards";

const FeaturedProducts = ({ products  }: FeaturedProductsProps ) => {

    return (
        <section className="flex flex-col justify-start mt-73 mb-[4rem] gap-[3.5rem]">
            <h2 className="text-black-500 dark:text-white-500 font-semibold">Featured Products</h2>
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