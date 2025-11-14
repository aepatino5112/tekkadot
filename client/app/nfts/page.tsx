import GradientBanner from "@/components/GradientBanner";
import FilterButton from "@/components/FilterButton";
import NFTsList from "@/components/NFTsList";
import { type NFTProps } from "@/types/cards";

// ! Placeholder data to show up and test the UI
const nfts: NFTProps[] = [
  { id: 1, name: "Hazel-G", price: 12, rareness: "Rare", category: "Fresh", imageUrl: "/images/hazel-glasses.jpg" },
  { id: 2, name: "Gold Hand", price: 42.5, rareness: "Epic", category: "Style", imageUrl: "/images/hand.jpg" },
  { id: 3, name: "Cyber Tree", price: 430, rareness: "Legendary", category: "Tree", imageUrl: "/images/melon.jpg" },
  { id: 4, name: "Freedom", price: 5, rareness: "Common", category: "Speech", imageUrl: "/images/free.jpg" },
  { id: 5, name: "Hazel-G", price: 12, rareness: "Rare", category: "Fresh", imageUrl: "/images/hazel-glasses.jpg" },
  { id: 6, name: "Gold Hand", price: 42.5, rareness: "Epic", category: "Style", imageUrl: "/images/hand.jpg" },
  { id: 7, name: "Cyber Tree", price: 430, rareness: "Legendary", category: "Tree", imageUrl: "/images/melon.jpg" },
  { id: 8, name: "Freedom", price: 5, rareness: "Common", category: "Speech", imageUrl: "/images/free.jpg" },
  { id: 9, name: "Hazel-G", price: 12, rareness: "Rare", category: "Fresh", imageUrl: "/images/hazel-glasses.jpg" },
  { id: 10, name: "Gold Hand", price: 42.5, rareness: "Epic", category: "Style", imageUrl: "/images/hand.jpg" },
  { id: 11, name: "Cyber Tree", price: 430, rareness: "Legendary", category: "Tree", imageUrl: "/images/melon.jpg" },
  { id: 12, name: "Freedom", price: 5, rareness: "Common", category: "Speech", imageUrl: "/images/free.jpg" },
  { id: 13, name: "Hazel-G", price: 12, rareness: "Rare", category: "Fresh", imageUrl: "/images/hazel-glasses.jpg" },
  { id: 14, name: "Gold Hand", price: 42.5, rareness: "Epic", category: "Style", imageUrl: "/images/hand.jpg" },
  { id: 15, name: "Cyber Tree", price: 430, rareness: "Legendary", category: "Tree", imageUrl: "/images/melon.jpg" }
];

const Products = () => {

    return (
        <div className="flex flex-col mx-10 min-w-0">
            <GradientBanner variant="nfts" />
            <div className="flex justify-start items-center gap-3 mt-4">
                <p className="text-[0.8rem] lg:text-[1.1rem] font-medium text-black-300 dark:text-white-300">Filter by</p>
                <FilterButton />
            </div>
            <NFTsList nfts={nfts} />
        </div>
    );
};

export default Products;