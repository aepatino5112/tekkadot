"use client";

import { useState, useEffect } from "react";
import Hero from "@/components/Hero";
import FeaturedProducts from "@/components/FeaturedProducts";
import FeaturedNFTs from "@/components/FeaturedNFTs";
import DiagonalSelector from "@/components/DiagonalSelector";
import Newsletter from "@/components/Newsletter";
import { type ProductProps, type NFTProps } from "@/types/cards";
import { searchProducts, searchNFTs } from "@/lib/api";

const Home = () => {
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [nfts, setNfts] = useState<NFTProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsResult = await searchProducts({ page: 1, sort: "newest" });
        console.log('Client received products:', productsResult);
        setProducts(productsResult.items.slice(0, 4)); // Take the first 4 for the featured section

        const nftsResult = await searchNFTs({ page: 1, sort: "newest" });
        console.log('Client received NFTs:', nftsResult);
        setNfts(nftsResult.items.slice(0, 4)); // Take the first 4 for the featured section
      } catch (error) {
        console.error("Failed to fetch featured data:", error);
        // Fallback to empty arrays on error
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col w-full px-10 min-w-0 overflow-x-hidden">
        <Hero />
        <div className="text-center py-8">Loading featured items...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full px-10 min-w-0 overflow-x-hidden">
      <Hero />
      <FeaturedProducts products={products} />
      <FeaturedNFTs nfts={nfts} />
      <DiagonalSelector />
      <Newsletter />
    </div>
  );
};

export default Home;
