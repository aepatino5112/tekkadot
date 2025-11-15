"use client";

import { useRouter } from "next/navigation";
import { MoveLeft } from "lucide-react";
import SectionSelector from "@/components/SectionSelector";
import AssetItem from "@/components/AssetItem";
import Button from "@/components/Button";

type AssetItemType = {
  id: string;
  name: string;
  purchaseDate: string;
  imageUrl: string;
  type: "product" | "nft"; // Restrict type to "product" or "nft"
  onView: () => void;
};

const techProducts: AssetItemType[] = [
  {
    id: "1",
    name: "Samsung Galaxy S25",
    purchaseDate: "October 31, 2025",
    imageUrl: "/images/product1.jpg",
    type: "product", // Explicitly set to "product"
    onView: () => console.log("Viewing product 1"),
  },
  {
    id: "2",
    name: "Samsung Galaxy S25",
    purchaseDate: "October 31, 2025",
    imageUrl: "/images/product1.jpg",
    type: "product",
    onView: () => console.log("Viewing product 2"),
  },
  {
    id: "3",
    name: "Samsung Galaxy S25",
    purchaseDate: "October 31, 2025",
    imageUrl: "/images/product1.jpg",
    type: "product",
    onView: () => console.log("Viewing product 3"),
  },
];

const nfts: AssetItemType[] = [
  {
    id: "1",
    name: "Rare Crypto Art",
    purchaseDate: "November 1, 2025",
    imageUrl: "/images/nft1.jpg",
    type: "nft", // Explicitly set to "nft"
    onView: () => console.log("Viewing NFT 1"),
  },
  {
    id: "2",
    name: "Rare Crypto Art",
    purchaseDate: "November 1, 2025",
    imageUrl: "/images/nft1.jpg",
    type: "nft",
    onView: () => console.log("Viewing NFT 2"),
  },
  {
    id: "3",
    name: "Rare Crypto Art",
    purchaseDate: "November 1, 2025",
    imageUrl: "/images/nft1.jpg",
    type: "nft",
    onView: () => console.log("Viewing NFT 3"),
  },
  {
    id: "4",
    name: "Rare Crypto Art",
    purchaseDate: "November 1, 2025",
    imageUrl: "/images/nft1.jpg",
    type: "nft",
    onView: () => console.log("Viewing NFT 4"),
  },
  {
    id: "5",
    name: "Rare Crypto Art",
    purchaseDate: "November 1, 2025",
    imageUrl: "/images/nft1.jpg",
    type: "nft",
    onView: () => console.log("Viewing NFT 5"),
  },
  
];

const Profile = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col w-full px-6 sm:px-10 min-w-0 overflow-x-hidden">
      {/* Header */}
      <div className="max-w-312 w-full mx-auto pt-6 pb-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button
              aria-label="Go back"
              onClick={() => router.back()}
              className="back-link"
            >
              <MoveLeft className="w-5 h-5 sm:w-6 sm:h-6 text-vivid-pink-600 dark:text-vivid-pink-400" />
            </button>

            <div>
              <h1 className="font-bold text-[1.75rem] lg:text-[2.25rem] text-black-500 dark:text-white-500">
                Connected as 14x...abc
              </h1>
              <p className="text-lg text-black-300 dark:text-white-700">
                Wallet Identity
              </p>
            </div>
          </div>

          <Button
            variant="secondary"
            type="product"
            onClick={() => console.log("Disconnect Wallet")}
          >
            Disconnect
          </Button>
        </div>

        <div className="terms-divider my-6" />
      </div>

      {/* Section Selector */}
      <div className="max-w-312 w-full mx-auto">
        <SectionSelector
          sections={["Assets", "My Listings", "Messages"]}
          onSelect={(section) => console.log(`Selected section: ${section}`)}
        />
      </div>

      {/* Assets Section */}
      <div className="flex flex-col lg:flex-row gap-8 max-w-312 w-full mx-auto pt-6 pb-10">
        {/* Tech Products */}
        <div className="flex-1">
          <div className="p-6 rounded-lg border border-white-600 dark:border-black-400">
            <h4 className="font-medium text-black-500 dark:text-white-500 mb-4">
              Tech Products
            </h4>
            <p className="text-sm text-black-300 dark:text-white-700 mb-6">
              {techProducts.length} owned products
            </p>
            <div className="flex flex-col gap-4">
              {techProducts.map((product) => (
                <AssetItem key={product.id} {...product} />
              ))}
            </div>
          </div>
        </div>

        {/* NFTs */}
        <div className="flex-1">
          <div className="p-6 rounded-lg border border-white-600 dark:border-black-400">
            <h4 className="font-medium text-black-500 dark:text-white-500 mb-4">
              NFTs
            </h4>
            <p className="text-sm text-black-300 dark:text-white-700 mb-6">
              {nfts.length} owned NFTs
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {nfts.map((nft) => (
                <AssetItem key={nft.id} {...nft} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
