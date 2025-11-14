import GradientBanner from "@/components/GradientBanner";
import NFTsPageClient from "@/components/NFTsPageClient";
import { type NFTProps } from "@/types/cards";

const createNFTs = (count: number): NFTProps[] => {
    const imgs = ['/images/hazel-glasses.jpg','/images/hand.jpg','/images/melon.jpg','/images/free.jpg'];
    const cats = ['Fresh','Style','Tree','Speech'];
    const rares = ['Common','Rare','Epic','Legendary'];
    return Array.from({ length: count }).map((_, i) => {
        const id = i + 1;
        return {
            id,
            name: `NFT ${id} - Art ${String.fromCharCode(65 + (id % 26))}`,
            price: Math.round((5 + id * 1.7) * 100) / 100,
            rareness: rares[id % rares.length],
            category: cats[id % cats.length],
            imageUrl: imgs[id % imgs.length]
        } as NFTProps;
    });
};

const nfts = createNFTs(112);

const Page = () => {
    return (
        <div className="flex flex-col mx-10 min-w-0">
            <GradientBanner variant="nfts" />
            <NFTsPageClient nfts={nfts} />
        </div>
    );
};

export default Page;