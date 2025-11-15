import Collections from "@/components/Collections";
import GradientBanner from "@/components/GradientBanner";
import ProductsPageClient from "@/components/ProductsPageClient";
import { type ProductProps } from "@/types/cards";

// ! generate a number of placeholder products for testing pagination
const createProducts = (count: number): ProductProps[] => {
    const imgs = ['/images/playstation5.jpg','/images/xbox.jpg','/images/switch.jpg','/images/iphone.jpg'];
    const collections = ['gaming','laptop','mobile','wearable'];
    return Array.from({ length: count }).map((_, i) => {
        const id = i + 1;
        const base = id % imgs.length;
        const price = Math.round((100 + id * 3.75) * 100) / 100;
        const trustIndex = 60 + (id * 7) % 39; // deterministic between 60-98
        const collection = collections[id % collections.length];
        return {
            id,
            name: `Product ${id} - Model ${String.fromCharCode(65 + (id % 26))}`,
            price,
            trustIndex,
            imageUrl: imgs[base],
            collection
        } as ProductProps;
    });
};

// ! create 112 products to make ~7 pages with page size 16
const products = createProducts(112);

const Products = () => {
    return (
        <div className="flex flex-col mx-10 min-w-0">
            <GradientBanner variant="products" />
            <Collections />

            <ProductsPageClient products={products} />
        </div>
    );
};

export default Products;