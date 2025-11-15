import React from "react";
import Image from "next/image";

type ListingCardProps = {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  onEdit: () => void;
  onRemove: () => void;
};

const ListingCard: React.FC<ListingCardProps> = ({
  id,
  name,
  price,
  imageUrl,
  onEdit,
  onRemove,
}) => {
  return (
    <div className="flex items-center gap-4 p-4 rounded-lg bg-white-400 dark:bg-black-800 border border-white-600 dark:border-black-400 w-full">
      {/* Image */}
      <div className="relative w-[5rem] h-[5rem] rounded-lg overflow-hidden">
        <Image src={imageUrl} alt={name} fill className="object-cover" />
      </div>

      {/* Info */}
      <div className="flex-1">
        {/* Name */}
        <h3 className="text-lg font-medium text-black-500 dark:text-white-500">
          {name}
        </h3>

        {/* Price */}
        <p className="text-sm text-black-300 dark:text-white-700">
          {price} DOT
        </p>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <button
          onClick={onEdit}
          className="cursor-pointer px-4 py-2 rounded-md border border-black-500 dark:border-white-500 text-black-500 dark:text-white-500 hover:bg-black-200 dark:hover:bg-black-700 transition-all"
        >
          Edit
        </button>
        <button
          onClick={onRemove}
          className="cursor-pointer px-4 py-2 rounded-md border border-black-500 dark:border-white-500 text-black-500 dark:text-white-500 hover:bg-black-200 dark:hover:bg-black-700 transition-all"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default ListingCard;