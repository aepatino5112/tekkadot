import NFTCard from "./NFTCard";
import { type FeaturedNFTsProps } from "@/types/cards";

const FeaturedNFTs = ({ nfts }: FeaturedNFTsProps) => {
  return (
    <section className="flex flex-col justify-start mb-12 gap-8">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-black-500 dark:text-white-500">
        Featured NFTs
      </h2>

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
            id={nft.id}
            name={nft.name}
            price={nft.price}
            rareness={nft.rareness}
            category={nft.category}
            imageUrl={nft.imageUrl}
          />
        ))}
      </div>
    </section>
  );
};

export default FeaturedNFTs;
