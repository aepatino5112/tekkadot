import NFTCard from "./NFTCard";
import Link from "next/link";
import { type FeaturedNFTsProps } from "@/types/cards";
import { MoveUpRight } from 'lucide-react';

const FeaturedNFTs = ({ nfts  }: FeaturedNFTsProps ) => {

    return (
        <section className="flex flex-col justify-start mt-32 mb-42 gap-[3.5rem]">
            <div className="flex justify-between">
                <h2 className="text-black-500 dark:text-white-500 font-semibold">Featured NFTs</h2>
                <Link href="/nfts" className="flex items-center gap-1.5">
                    <p className="text-[2rem] font-medium text-lime-green-600 dark:text-lime-green-400 underline-hover">All NFTs</p>
                    <MoveUpRight className="w-[1.896rem] h-[1.799rem] text-lime-green-600 dark:text-lime-green-400" />
                </Link>
            </div>
            <div className="flex justify-between items-center gap-[1.5rem]">
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