"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Gallery from "@/components/Gallery";
import Button from "@/components/Button";
import NFTCard from "@/components/NFTCard";
import { getNFT, searchNFTs } from "@/lib/api";
import { NFTProps } from "@/types/cards";

// Fetch NFT data from API
const fetchNFTData = async (id: string) => {
  const nft = await getNFT(id);
  // Fetch similar NFTs (first page, no specific sort for now)
  const similarNFTsResponse = await searchNFTs({ page: 1 });
  const similarNFTs = similarNFTsResponse.items.slice(0, 4); // Take first 4 as similar

  return { nft, similarNFTs };
};

const NFTDetail = () => {
  const params = useParams();
  const [nft, setNFT] = useState<NFTProps | null>(null);
  const [similarNFTs, setSimilarNFTs] = useState<NFTProps[]>([]);
  const id = (params as { id: string }).id;

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      const { nft, similarNFTs } = await fetchNFTData(id);
      setNFT(nft);
      setSimilarNFTs(similarNFTs);
    };

    fetchData();
  }, [id]);

  if (!nft) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col w-full px-6 md:px-10 lg:px-16 py-8 min-w-0 overflow-x-hidden">
      {/* Back Arrow */}
      <button
        className="flex items-center gap-2 text-lime-green-500 hover:opacity-80 transition-all"
        onClick={() => window.history.back()}
      >
        <ArrowLeft className="w-6 h-6" />
      </button>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-8 mt-6">
        {/* NFT Gallery */}
        <div className="flex-1">
          <Gallery images={[nft.imageUrl]} type="nft" />
        </div>

        {/* NFT Details */}
        <div className="flex-1 flex flex-col gap-4">
          {/* NFT Name */}
          <h2 className="font-medium text-black-500 dark:text-white-500">
            {nft.name}
          </h2>

          {/* Price */}
          <h3 className="font-regular text-lime-green-500">{nft.price} DOT</h3>

          {/* Rareness */}
          <h5 className="font-regular text-lime-green-600 dark:text-lime-green-400">
            Rareness: {nft.rareness}
          </h5>

          {/* Category */}
          <h5 className="font-regular text-black-300 dark:text-white-700">
            Category: {nft.category}
          </h5>

          {/* Description */}
          <p className="text-lg text-black-500 dark:text-white-500">
            {nft.description}
          </p>

          {/* Buttons */}
          <div className="flex gap-4 mt-6">
            {/* Add to Cart Button */}
            <Button
              variant="secondary"
              type="nft"
              onClick={() => console.log("Add to Cart clicked")}
            >
              Add to Cart
            </Button>

            {/* Buy Now Button */}
            <Button
              variant="primary"
              type="nft"
              onClick={() => console.log("Buy Now clicked")}
            >
              Buy Now
            </Button>
          </div>
        </div>
      </div>

      {/* Similar NFTs Section */}
      <div className="mt-12">
        <h4 className="font-regular mb-4 text-white-500 dark:text-white-500">
          Other NFTs
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 w-full">
          {similarNFTs.map((nft) => (
            <NFTCard key={nft.id} {...nft} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NFTDetail;
