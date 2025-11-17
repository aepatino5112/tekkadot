import NFTCard from "./NFTCard";
import Link from "next/link";
import { type FeaturedNFTsProps } from "@/types/cards";
import { MoveUpRight } from 'lucide-react';

const FeaturedNFTs = ({ nfts }: FeaturedNFTsProps) => {
  return (
    <section className="flex flex-col justify-start mb-12 gap-8">
      <div className="flex justify-between">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-black-500 dark:text-white-500">
          Featured NFTs
        </h2>

        <Link href="/nfts" className="flex items-center gap-1.5">
            <p className="text-xl sm:text-2xl md:text-3xl font-medium text-lime-green-600 dark:text-lime-green-400 underline-hover">All NFTs</p>
            <MoveUpRight className="w-[1.4rem] h-[1.5rem] text-lime-green-600 dark:text-lime-green-400" />
        </Link>
      </div>
      
      {/* Responsive grid:
          - mobile: 1 column (big cards)
          - sm: 2 columns
          - md: 3 columns
          - lg: 4 columns
      */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 w-full">
        {nfts.map((nft) => (
          <NFTCard
            key={nft.id + "-nft"}
            {...nft}
          />
        ))}
      </div>
    </section>
  );
};

export default FeaturedNFTs;
