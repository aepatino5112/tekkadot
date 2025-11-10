import Hero from "@/components/Hero";
import FeaturedProducts from "@/components/FeaturedProducts";
import FeaturedNFTs from "@/components/FeaturedNFTs";
import { type ProductProps, NFTProps } from "@/types/cards";


// ! Placeholder data to show up and test the UI
const products: ProductProps[] = [
  { id: 1, name: "PlayStation 5", price: 202.5, trustIndex: 92, imageUrl: "/images/playstation5.jpg" },
  { id: 2, name: "Xbox Series X", price: 250.2, trustIndex: 85, imageUrl: "/images/xbox.jpg" },
  { id: 3, name: "Nintendo S...", price: 300.8, trustIndex: 78, imageUrl: "/images/switch.jpg" },
  { id: 4, name: "iPhone 17", price: 632.50, trustIndex: 82, imageUrl: "/images/iphone.jpg" }
];

const nfts: NFTProps[] = [
  { id: 1, name: "Hazel-G", price: 12, rareness: "Rare", category: "Fresh", imageUrl: "/images/hazel-glasses.jpg" },
  { id: 2, name: "Gold Hand", price: 42.5, rareness: "Epic", category: "Style", imageUrl: "/images/hand.jpg" },
  { id: 3, name: "Cyber Tree", price: 430, rareness: "Legendary", category: "Tree", imageUrl: "/images/melon.jpg" },
  { id: 4, name: "Freedom", price: 5, rareness: "Common", category: "Speech", imageUrl: "/images/free.jpg" }
];


const Home = () => {

  return (
    <div className="flex flex-col mx-10">
      <Hero />
      <FeaturedProducts products={products}/>
      <FeaturedNFTs nfts={nfts}/>
    </div>
  );
};

export default Home;