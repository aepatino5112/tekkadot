import React from "react";
import Image from "next/image";

type AssetItemProps = {
  id: string;
  name: string;
  purchaseDate: string;
  imageUrl: string;
  type: "product" | "nft"; // Add type to differentiate between products and NFTs
  onView: () => void;
};

const AssetItem: React.FC<AssetItemProps> = ({
  id,
  name,
  purchaseDate,
  imageUrl,
  type,
  onView,
}) => {
  const isNFT = type === "nft";

  return (
    <div
      onClick={onView} // Trigger the onView function when clicked
      className={`cursor-pointer ${
        isNFT
          ? "w-[11rem] h-[11rem] rounded-xl overflow-hidden" // Rounded but not circular
          : "flex items-center gap-4 p-4 rounded-lg"
      } ${
        isNFT
          ? "bg-black-500 dark:bg-black-700"
          : "bg-white-400 dark:bg-black-800"
      } border border-white-600 dark:border-black-400`}
    >
      {/* Image */}
      <div
        className={`relative ${
          isNFT ? "w-full h-full rounded-xl" : "w-[5rem] h-[5rem] rounded-lg"
        } overflow-hidden`}
      >
        <Image src={imageUrl} alt={name} fill className="object-cover" />
      </div>

      {/* Info (only for products) */}
      {!isNFT && (
        <div className="flex-1">
          {/* Name */}
          <h3 className="text-lg font-medium text-black-500 dark:text-white-500">
            {name}
          </h3>

          {/* Purchase Date */}
          <p className="text-sm text-black-300 dark:text-white-700">
            Purchased in {purchaseDate}
          </p>
        </div>
      )}

      {/* View Button (only for products) */}
      {!isNFT && (
        <button
          onClick={(e) => {
            e.stopPropagation(); // Prevent triggering the parent click event
            onView();
          }}
          className="cursor-pointer text-lg font-medium text-vivid-pink-500 hover:underline transition-all"
        >
          View
        </button>
      )}
    </div>
  );
};

export default AssetItem;
