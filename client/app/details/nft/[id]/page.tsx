"use client";

import React, { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import Gallery from "@/components/Gallery";
import Button from "@/components/Button";
import NFTCard from "@/components/NFTCard";

// Simulated database call
const fetchNFTData = async (id: string) => {
  // Simulated NFT data
  const nft = {
    id,
    name: "Rare Crypto Art",
    price: 150.0,
    rareness: "Legendary",
    category: "Art",
    description:
      "This rare crypto art piece is a one-of-a-kind digital collectible, created by a renowned artist in the blockchain space.",
    images: ["/images/nft1.jpg", "/images/nft2.jpg", "/images/nft3.jpg"],
  };

  // Simulated similar NFTs data
  const similarNFTs = [
    {
      id: "2",
      name: "Epic Crypto Sculpture",
      price: 200.0,
      rareness: "Epic",
      category: "Sculpture",
      imageUrl: "/images/nft4.jpg",
    },
    {
      id: "3",
      name: "Rare Crypto Painting",
      price: 120.0,
      rareness: "Rare",
      category: "Painting",
      imageUrl: "/images/nft5.jpg",
    },
    {
      id: "4",
      name: "Unique Crypto Design",
      price: 300.0,
      rareness: "Unique",
      category: "Design",
      imageUrl: "/images/nft6.jpg",
    },
    {
      id: "5",
      name: "Unique Crypto Design",
      price: 300.0,
      rareness: "Unique",
      category: "Design",
      imageUrl: "/images/nft6.jpg",
    },
  ];

  return { nft, similarNFTs };
};

const NFTDetail = ({ params }: { params: Promise<{ id: string }> }) => {
  const [nft, setNFT] = useState<any>(null);
  const [similarNFTs, setSimilarNFTs] = useState<any[]>([]);
  const [id, setId] = useState<string | null>(null);

  useEffect(() => {
    const fetchParams = async () => {
      const resolvedParams = await params;
      setId(resolvedParams.id);
    };

    fetchParams();
  }, [params]);

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
          <Gallery images={nft.images} type="nft" />
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
