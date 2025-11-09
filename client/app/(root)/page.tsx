import ProductCard from "@/components/ProductCard";
import NFTCard from "@/components/NFTCard";

const Home = () => {

  return (
    <div className="flex items-center justify-evenly">
      <ProductCard name="PlayStation 5" price={5} trustIndex={92} imageUrl="/images/playstation5.jpg" />
      <NFTCard name="Hazel Glasses" price={10} rareness="Common" category="Fresh" imageUrl="/images/hazel-glasses.jpg" />
      <ProductCard name="PlayStation 5" price={5} trustIndex={92} imageUrl="/images/playstation5.jpg" />
    </div>
  );
};

export default Home;