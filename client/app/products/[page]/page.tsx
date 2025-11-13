import Collections from "@/components/Collections";
import GradientBanner from "@/components/GradientBanner";
import FilterButton from "@/components/FilterButton";
import ProductsList from "@/components/ProductsList";
import { type ProductProps } from "@/types/cards";

// ! Placeholder data to show up and test the UI
const products: ProductProps[] = [
  { id: 1, name: "PlayStation 5", price: 202.5, trustIndex: 92, imageUrl: "/images/playstation5.jpg" },
  { id: 2, name: "Xbox Series X", price: 250.2, trustIndex: 85, imageUrl: "/images/xbox.jpg" },
  { id: 3, name: "Nintendo S...", price: 300.8, trustIndex: 78, imageUrl: "/images/switch.jpg" },
  { id: 4, name: "iPhone 17", price: 632.50, trustIndex: 82, imageUrl: "/images/iphone.jpg" },
  { id: 5, name: "PlayStation 5", price: 202.5, trustIndex: 92, imageUrl: "/images/playstation5.jpg" },
  { id: 6, name: "Xbox Series X", price: 250.2, trustIndex: 85, imageUrl: "/images/xbox.jpg" },
  { id: 7, name: "Nintendo S...", price: 300.8, trustIndex: 78, imageUrl: "/images/switch.jpg" },
  { id: 8, name: "iPhone 17", price: 632.50, trustIndex: 82, imageUrl: "/images/iphone.jpg" },
  { id: 9, name: "PlayStation 5", price: 202.5, trustIndex: 92, imageUrl: "/images/playstation5.jpg" },
  { id: 10, name: "Xbox Series X", price: 250.2, trustIndex: 85, imageUrl: "/images/xbox.jpg" },
  { id: 11, name: "Nintendo S...", price: 300.8, trustIndex: 78, imageUrl: "/images/switch.jpg" },
  { id: 12, name: "iPhone 17", price: 632.50, trustIndex: 82, imageUrl: "/images/iphone.jpg" },
  { id: 13, name: "PlayStation 5", price: 202.5, trustIndex: 92, imageUrl: "/images/playstation5.jpg" },
  { id: 14, name: "Xbox Series X", price: 250.2, trustIndex: 85, imageUrl: "/images/xbox.jpg" },
  { id: 15, name: "Nintendo S...", price: 300.8, trustIndex: 78, imageUrl: "/images/switch.jpg" }
];

const Products = () => {

    return (
        <div className="flex flex-col mx-10 min-w-0">
            <GradientBanner variant="products" />
            <Collections />
            <div className="flex justify-start items-center gap-3 mt-4">
                <p className="text-[0.8rem] lg:text-[1.1rem] font-medium text-black-300 dark:text-white-300">Filter by</p>
                <FilterButton />
            </div>
            <ProductsList products={products} />
        </div>
    );
};

export default Products;