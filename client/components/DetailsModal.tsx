import React, { useEffect } from "react";
import Button from "@/components/Button";
import Image from "next/image";

type DetailsModalProps = {
  isOpen: boolean;
  onClose: () => void;
  asset: {
    id: string;
    name: string;
    price: number | string;
    purchaseDate: string;
    imageUrl: string;
    type: "product" | "nft";
    details: {
      category: string;
      rarity?: string; // Optional for NFTs
      originalSeller: string;
    };
  };
};

const DetailsModal: React.FC<DetailsModalProps> = ({
  isOpen,
  onClose,
  asset,
}) => {
  const isNFT = asset.type === "nft";
  const accentColor = isNFT ? "lime-green-500" : "vivid-pink-500";

  // Prevent scrolling on the background when the modal is open
  useEffect(() => {
    if (isOpen) {
      document.documentElement.classList.add("overflow-hidden");
    } else {
      document.documentElement.classList.remove("overflow-hidden");
    }

    // Cleanup when the component unmounts
    return () => {
      document.documentElement.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="relative max-w-[60rem] w-full mx-auto p-6 sm:p-8 rounded-lg bg-white-300 dark:bg-black-800 border border-white-600 dark:border-black-400 overflow-y-auto max-h-[90vh] flex flex-col sm:flex-row gap-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute cursor-pointer top-4 right-4 text-black-500 dark:text-white-500 hover:text-vivid-pink-500 transition-all"
          aria-label="Close Modal"
        >
          ✕
        </button>

        {/* Gallery Section */}
        <div className="flex-1">
          <Image
            src={asset.imageUrl}
            alt={asset.name}
            width={500}
            height={500}
          />
        </div>

        {/* Content Section */}
        <div className="flex-1 flex flex-col">
          {/* Asset Name and Price */}
          <h1 className="font-bold text-[1.75rem] lg:text-[2.25rem] text-black-500 dark:text-white-500 mb-2">
            {asset.name}
          </h1>
          <h3
            className={`font-regular mb-4 ${
              isNFT ? "text-lime-green-500" : "text-vivid-pink-500"
            }`}
          >
            {asset.price} DOT
          </h3>
          <p className="text-sm text-black-300 dark:text-white-700 mb-6">
            Purchased on {asset.purchaseDate}
          </p>

          {/* Divider */}
          <div className="border-t border-white-600 dark:border-black-400 my-4" />

          {/* Ownership Actions */}
          <div className="flex flex-col gap-4">
            <h4 className="font-medium text-black-500 dark:text-white-500 mb-2">
              Ownership Actions
            </h4>
            <div className="mb-6">
              <Button
                variant="primary"
                type={asset.type}
                onClick={() => console.log("Relist for Sale")}
              >
                Relist for Sale
              </Button>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-white-600 dark:border-black-400 my-4" />

          {/* Asset Details */}
          <div className="flex flex-col gap-4">
            <h4 className="font-medium text-black-500 dark:text-white-500 mb-2">
              Asset Details
            </h4>
            <div className="flex justify-between">
              <span className="text-sm text-black-300 dark:text-white-700">
                Category
              </span>
              <span className="text-sm text-black-500 dark:text-white-500">
                {asset.details.category}
              </span>
            </div>
            {isNFT && (
              <div className="flex justify-between">
                <span className="text-sm text-black-300 dark:text-white-700">
                  Rarity
                </span>
                <span className="text-sm text-black-500 dark:text-white-500">
                  {asset.details.rarity}
                </span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-sm text-black-300 dark:text-white-700">
                Original Seller
              </span>
              <span className="text-sm text-black-500 dark:text-white-500">
                {asset.details.originalSeller}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsModal;
