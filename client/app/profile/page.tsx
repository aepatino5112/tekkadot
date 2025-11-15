"use client";

import { useRouter } from "next/navigation";
import { MoveLeft } from "lucide-react";
import SectionSelector from "@/components/SectionSelector";
import AssetItem from "@/components/AssetItem";
import Button from "@/components/Button";
import ListingCard from "@/components/ListingCard";
import CreateListingForm from "@/components/CreateListingForm";
import ConfirmationModal from "@/components/ConfirmationModal";
import React, { useEffect, useState } from "react";

type ListingType = {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  type: "product" | "nft";
  onEdit: () => void;
  onRemove: () => void;
};

type AssetItemType = {
  id: string;
  name: string;
  purchaseDate: string;
  imageUrl: string;
  type: "product" | "nft";
  onView: () => void;
};

const techProducts: AssetItemType[] = [
  {
    id: "1",
    name: "Samsung Galaxy S25",
    purchaseDate: "October 31, 2025",
    imageUrl: "/images/product1.jpg",
    type: "product",
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
    type: "nft",
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

const listings: ListingType[] = [
  {
    id: "1",
    name: "Samsung Galaxy S25",
    price: 0,
    imageUrl: "/images/product1.jpg",
    type: "product",
    onEdit: () => console.log("Editing listing 1"),
    onRemove: () => console.log("Removing listing 1"),
  },
  {
    id: "2",
    name: "Rare Crypto Art",
    price: 0,
    imageUrl: "/images/nft1.jpg",
    type: "nft",
    onEdit: () => console.log("Editing listing 2"),
    onRemove: () => console.log("Removing listing 2"),
  },
];

const initialListings: ListingType[] = [
  {
    id: "1",
    name: "Samsung Galaxy S25",
    price: 999,
    imageUrl: "/images/product1.jpg",
    type: "product",
    onEdit: () => console.log("Editing listing 1"),
    onRemove: () => console.log("Removing listing 1"),
  },
  {
    id: "2",
    name: "Apple MacBook Pro",
    price: 1999,
    imageUrl: "/images/product2.jpg",
    type: "product",
    onEdit: () => console.log("Editing listing 2"),
    onRemove: () => console.log("Removing listing 2"),
  },
];

const Profile = () => {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState("Assets");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false); // State for CreateListingForm modal
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false); // State for ConfirmationModal
  const [listings, setListings] = useState(initialListings);
  const [selectedListing, setSelectedListing] = useState<ListingType | null>(
    null
  );

  const handleCreateModalToggle = () => {
    setIsCreateModalOpen(!isCreateModalOpen);
  };

  const handleRemoveClick = (listing: ListingType) => {
    setSelectedListing(listing);
    setIsConfirmationModalOpen(true);
  };

  const handleConfirmRemove = () => {
    if (selectedListing) {
      setListings((prevListings) =>
        prevListings.filter((listing) => listing.id !== selectedListing.id)
      );
      setSelectedListing(null);
      setIsConfirmationModalOpen(false);
    }
  };

  useEffect(() => {
    if (isCreateModalOpen || isConfirmationModalOpen) {
      document.documentElement.classList.add("overflow-hidden");
    } else {
      document.documentElement.classList.remove("overflow-hidden");
    }
  }, [isCreateModalOpen, isConfirmationModalOpen]);

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
          onSelect={(section) => setActiveSection(section)}
        />
      </div>

      {/* Conditional Rendering Based on Active Section */}
      {activeSection === "Assets" && (
        <div className="flex flex-col lg:flex-row gap-8 max-w-312 w-full mx-auto pt-6 pb-10">
          {/* Tech Products */}
          <div className="flex-1">
            <div className="p-6 rounded-lg border bg-white-400 dark:bg-black-800 border-white-600 dark:border-black-400">
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
            <div className="p-6 rounded-lg border bg-white-400 dark:bg-black-800 border-white-600 dark:border-black-400">
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
      )}

      {activeSection === "My Listings" && (
        <div className="max-w-312 w-full mx-auto flex flex-col gap-4 pt-6 pb-10">
          <div className="p-6 rounded-lg border bg-white-400 dark:bg-black-800 border-white-600 dark:border-black-400">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-black-500 dark:text-white-500 mb-2">
                  Active Listings
                </h4>
                <p className="text-lg text-black-300 dark:text-white-700">
                  {listings.length} items currently listed
                </p>
              </div>

              <Button
                variant="primary"
                type="product"
                onClick={handleCreateModalToggle}
              >
                + New Listing
              </Button>
            </div>

            <div className="my-6" />

            <div className="flex flex-col gap-4">
              {listings.map((listing) => (
                <ListingCard
                  key={listing.id}
                  {...listing}
                  onRemove={() => handleRemoveClick(listing)}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Create Listing Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <CreateListingForm onClose={handleCreateModalToggle} />
        </div>
      )}

      {/* Confirmation Modal */}
      {isConfirmationModalOpen && (
        <ConfirmationModal
          isOpen={isConfirmationModalOpen}
          onClose={() => setIsConfirmationModalOpen(false)}
          onConfirm={handleConfirmRemove}
          type={selectedListing?.type || "product"}
        />
      )}
    </div>
  );
};

export default Profile;
