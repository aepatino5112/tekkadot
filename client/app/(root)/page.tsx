import ProductCard from "@/components/ProductCard";

const Home = () => {

  return (
    <div className="flex items-center justify-evenly">
      <ProductCard name="PlayStation 5" price={5} trustIndex={92} imageUrl="/images/playstation5.jpg" />
      <ProductCard name="PlayStation 5" price={5} trustIndex={92} imageUrl="/images/playstation5.jpg" />
      <ProductCard name="PlayStation 5" price={5} trustIndex={92} imageUrl="/images/playstation5.jpg" />
    </div>
  );
};

export default Home;