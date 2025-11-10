import NFTCard from "./NFTCard";
import { type FeaturedNFTsProps } from "@/types/cards";

const FeaturedNFTs = ({ nfts  }: FeaturedNFTsProps ) => {

    return (
      <section className="flex flex-col justify-start mb-42 gap-[3.5rem]">
        <h2 className="text-black-500 dark:text-white-500 font-semibold">
          Featured NFTs
        </h2>
        <div className="grid grid-cols-4 gap-[1.5rem] items-start w-full">
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