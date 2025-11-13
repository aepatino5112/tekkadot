import { type NFTsProps } from "@/types/cards";
import NFTCard from "./NFTCard";


const NFTsList = ({ nfts }: NFTsProps) => {

    return (
        <div className="flex flex-col mt-2 gap-6">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-medium text-black-500 dark:text-white-500">Explore</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-20 lg:gap-x-26 gap-y-18">
                {nfts.map((nft) => (
                    <NFTCard
                        key={`${nft.id} - key`}
                        id={nft.id}
                        name={nft.name}
                        price={nft.price}
                        category={nft.category}
                        rareness={nft.rareness}
                        imageUrl={nft.imageUrl}
                    />
                ))}
            </div>
        </div>
    );
};

export default NFTsList;