import GradientBanner from "@/components/GradientBanner";
import NFTsPageClient from "@/components/NFTsPageClient";
import { searchNFTs } from "@/lib/api";
import { type NFTProps } from "@/types/cards";

const Page = async () => {
  let nfts: NFTProps[] = [];
  try {
    const result = await searchNFTs({ page: 1, sort: "newest" });
    nfts = result.items;
  } catch (error) {
    console.error("Failed to fetch NFTs:", error);
  }

  return (
    <div className="flex flex-col mx-10 min-w-0">
      <GradientBanner variant="nfts" />
      <NFTsPageClient nfts={nfts} />
    </div>
  );
};

export default Page;
