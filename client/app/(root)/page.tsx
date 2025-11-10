import Hero from "@/components/Hero";
import FeaturedProducts from "@/components/FeaturedProducts";
import { ProductProps } from "@/types/cards";


const products: ProductProps[] = [
  { id: 1, name: "PlayStation 5", price: 202.5, trustIndex: 92, imageUrl: "/images/playstation5.jpg" },
  { id: 2, name: "Xbox Series X", price: 250.2, trustIndex: 85, imageUrl: "/images/xbox.jpg" },
  { id: 3, name: "Nintendo S...", price: 300.8, trustIndex: 78, imageUrl: "/images/switch.jpg" },
  { id: 4, name: "iPhone 17", price: 632.50, trustIndex: 82, imageUrl: "/images/iphone.jpg" }
];


const Home = () => {

  return (
    <div className="flex flex-col mx-10">
      <Hero />
      <FeaturedProducts products={products}/>
    </div>
  );
};

export default Home;