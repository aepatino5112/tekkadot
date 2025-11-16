import React, { useState } from "react";
import CustomInput from "@/components/CustomInput";
import CustomDropdown from "@/components/CustomDropdown";
import FileUpload from "../components/FileUpload"; // Adjust the path as needed
import Button from "@/components/Button";

interface CreateListingFormProps {
  onClose: () => void; // Add the onClose prop
}

const CreateListingForm: React.FC<CreateListingFormProps> = ({ onClose }) => {
  const [listingType, setListingType] = useState("Tech Product");
  const [itemName, setItemName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState("New - Sealed");
  const [images, setImages] = useState<FileList | null>(null);

  const handleSubmit = () => {
    console.log({
      listingType,
      itemName,
      price,
      description,
      category,
      condition,
      images,
    });
  };

  return (
    <div className="relative max-w-[40rem] w-full mx-auto p-8 rounded-lg bg-white-300 dark:bg-black-800 border border-white-600 dark:border-black-400 overflow-y-auto max-h-[90vh] scrollbar-thin scrollbar-thumb-black-300 dark:scrollbar-thumb-black-700">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute cursor-pointer top-4 right-4 text-black-500 dark:text-white-500 hover:text-vivid-pink-500 transition-all"
        aria-label="Close Modal"
      >
        ✕
      </button>

      <h1 className="font-bold text-[1.75rem] lg:text-[2.25rem] text-black-500 dark:text-white-500 mb-4">
        Create New Listing
      </h1>
      <p className="text-sm text-black-300 dark:text-white-700 mb-6">
        List your tech product or NFT on the Tekka marketplace
      </p>

      <div className="flex flex-col gap-6">
        <CustomDropdown
          label="Listing Type"
          options={["Tech Product", "NFT"]}
          value={listingType}
          onChange={setListingType}
        />
        <CustomInput
          label="Item Name"
          placeholder="e.g. MacBook Pro M3"
          required
          value={itemName}
          onChange={setItemName}
        />
        <CustomInput
          label="Price (DOT)"
          placeholder="0.00"
          required
          type="number"
          value={price}
          onChange={setPrice}
        />
        <CustomInput
          label="Description"
          placeholder="Describe your item, its condition, and any important details..."
          required
          value={description}
          onChange={setDescription}
        />
        <CustomDropdown
          label="Category"
          options={["Electronics", "Art", "Collectibles"]}
          value={category}
          onChange={setCategory}
        />
        <CustomDropdown
          label="Condition"
          options={["New - Sealed", "Used - Like New", "Used - Good"]}
          value={condition}
          onChange={setCondition}
        />
        <FileUpload label="Images" required onUpload={setImages} />
      </div>

      <div className="flex justify-between mt-6">
        {/* Cancel Button */}
        <Button variant="secondary" type="product" onClick={onClose}>
          Cancel
        </Button>
        {/* Submit Button */}
        <Button
          variant="primary"
          type={listingType === "NFT" ? "nft" : "product"}
          onClick={handleSubmit}
        >
          Create Listing
        </Button>
      </div>
    </div>
  );
};

export default CreateListingForm;
